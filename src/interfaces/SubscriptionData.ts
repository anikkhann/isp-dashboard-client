export interface SubscriptionData {
  id: string;
  name: string;
  packageType: string;
  slabStart: number;
  slabEnd: number;
  chargeAmount: number;
  isActive: boolean;
  insertedBy: InsertedBy;
}

export interface InsertedBy {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  userType: string;
}
