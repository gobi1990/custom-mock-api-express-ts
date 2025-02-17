export interface PromotionResponse {
  status: string
  data: PromotionList
}
  
export interface PromotionList {
  promotions: Promotion[]
}
  
export interface Promotion {
  id: string
  title: string
  description: string
  discount: string
  start_time: string
  end_time: string
  valid_until: string
  image_url: string
}
  