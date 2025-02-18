import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { data: existingUser, error: userError } = await supabase
            .from(process.env.ADMIN_USERS_TABLE || 'adminUsers')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from(process.env.ADMIN_USERS_TABLE || 'adminUsers')
            .insert([{ name, email, password: hashedPassword, role }])
            .select('id, name, email, role');

            if (error) return res.status(400).json({ error: error.message });

            const user = data[0];
    
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
                expiresIn: '100h',
            });

            // Update the token in the database
            await supabase
            .from('adminusers')
            .update({ token })
            .eq('id', user.id);

        res.status(201).json({ message: 'Admin User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Fetch user from Supabase
        const { data, error } = await supabase
            .from(process.env.ADMIN_USERS_TABLE || 'adminUsers')
            .select('id, email, password, role')
            .eq('email', email)
            .single();

        if (!data) return res.status(401).json({ error: 'Invalid email or password' });

        const user = data;

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });

        // Update token in Supabase
        await supabase
            .from(process.env.ADMIN_USERS_TABLE || 'adminUsers')
            .update({ token })
            .eq('id', user.id);

        res.json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role }, token });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
