import type { PromotionSummary } from "@shared/types/PromotionSummary";  
  
export type Order = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  total_washer: number;
  total_dryer: number;
  store_id: string;
  total_amount: string;
  sub_total: string;
  discount_amount: string;
  promotion_summary: PromotionSummary | null;
}
