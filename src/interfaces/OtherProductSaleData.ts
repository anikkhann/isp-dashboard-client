export interface OtherProductSaleData {
  createdOn: number;

  insertedBy: InsertedBy;
  editedBy: EditedBy;
  updatedOn: number;
  id: string;
  otherProduct: OtherProduct;
  otherProductId: string;
  unit: string;
  quantity: number;
  customerName: string;
  customerNumber: string;
  address: string;
  tsoComment: string;
  rejectComment: string;
  tso: Tso;
  tsoId: string;
  areaManager: AreaManager2;
  areaManagerId: string;
  status: string;
  statusChangedById: string;
  statusChangedBy: StatusChangedBy;
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
export interface OtherProduct {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  unit: string;
  description: string;
  isSystemCalculated: boolean;
  isActive: boolean;
}

export interface Tso {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
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

export interface AreaManager2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
  salesManager: SalesManager3;
  salesManagerId: string;
}

export interface SalesManager3 {
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

export interface StatusChangedBy {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
}
