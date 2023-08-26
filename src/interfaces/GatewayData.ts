import { InsertedBy } from "./AgentTopUpData";

export interface GatewayData {
  id: string;
  name: string;
  baseUrl: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  createdOn: number;
}
