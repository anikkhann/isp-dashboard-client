/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserData {
  createdOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  userRoles: any[];
  userType: string;
  insertedBy: InsertedBy;
}

export interface InsertedBy {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  userType: string;
}
