// export interface ActivityLogData {
//   id: string;
//   subject: string;
//   remarks: string;
//   changedData: string;
//   insertedBy: InsertedBy;
//   createdOn: number;
// }
export interface ActivityLogData {
  createdOn: number;
  id: number;
  customer: Customer;
  customerId: number;
  subject: string;
  action: string;
  remarks: string;
  changedData: string;
  clientId: number;
  subZoneManagerId?: number;
  insertedBy: InsertedBy;
}

export interface Customer {
  id: number;
  name: string;
  username: string;
}

export interface InsertedBy {
  id: number;
  name: string;
  username: string;
}
