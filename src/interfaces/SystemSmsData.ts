import { InsertedBy } from "./AgentTopUpData";

export interface SystemSmsData {
  id: string;
  subject: string;
  key: string;
  template: string;
  placeholder: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  createdOn: number;
}
