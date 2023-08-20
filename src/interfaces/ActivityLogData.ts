import { InsertedBy } from "./AgentTopUpData";

export interface ActivityLogData {
  id: string;
  subject: string;
  remarks: string;
  changedData: string;
  insertedBy: InsertedBy;
  createdOn: number;
}
