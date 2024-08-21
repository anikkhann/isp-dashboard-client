export interface DailyIncomeExpenseListData {
  createdOn: number;
  id: number;
  date: number;
  type: string;
  accountHeadId: number;
  remarks: string;
  amount: number;
  paymentChannel: string;
  serialNo: number;
  partner: Partner;
  partnerId: number;
  clientId: number;
  client: Client;
  updatedOn?: number;
}

export interface Partner {
  id: number;
  name: string;
  username: string;
}

export interface Client {
  id: number;
  name: string;
  username: string;
}
