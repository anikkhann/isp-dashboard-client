import { InsertedBy } from "./AgentTopUpData";

export interface ClientSmsData {
  id: string;
  subject: string;
  template: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  createdOn: number;
}
