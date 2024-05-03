export interface HotspotPackage {
  createdOn: number;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  id: string;
  name: string;
  price: number;
  dataRate: number;
  dataRateUnit: string;
  validity: number;
  validityUnit: string;
  otpLimit: number;
  packageCategory: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  updatedOn: number;
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
  isMasterUser: boolean;
  partnerId: string;
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
  isMasterUser: boolean;
  partnerId: string;

  parentPartnerId: string;

  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
