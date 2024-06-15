export interface CustomerWiseSummaryData {
  id: number;
  username: string;
  total_customer: number;
  active_customer: number;
  registered_customer: number;
  expired_customer: number;
  expired_ratio?: number;
}
