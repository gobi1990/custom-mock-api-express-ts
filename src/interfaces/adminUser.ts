interface AdminUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: AdminUserRoles;
  }

  enum AdminUserRoles {
    SUPERADMIN = 'superadmin',
    MANAGER = 'manager',
    ADMIN = 'admin',
    DEVELOPER = 'developer',
  }