export interface IncomeExpenseReportData {
  id: number;
  trx_date: number;
  action_by: string;
  account_head: string;
  income_amount: number;
  expense_amount: number;
  remarks: string;
  account_head_type: string;
}
