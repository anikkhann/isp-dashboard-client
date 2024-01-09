export interface MonthlyTargetData {
  createdOn: number;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  updatedOn: number;
  username: string;
  id: string;
  tso: Tso;
  tsoId: string;
  areaManagerId: string;
  year: number;
  month: number;
  status: string;
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
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface EditedBy {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface Tso {
  createdOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  userCategory: string;
  salesManager: SalesManager;
  salesManagerId: string;
  areaManager: AreaManager;
  areaManagerId: string;
}

export interface SalesManager {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
}

export interface AreaManager {
  createdOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  userCategory: string;
  salesManager: SalesManager2;
}

export interface SalesManager2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
}
