export interface ZoneTopUpData {
  createdOn: number;
  id: string;
  zoneManager: ZoneManager;
  zoneManagerId: string;
  serialNo: number;
  amount: number;
  remarks: string;
  type: string;
  rechargedBy: RechargedBy;
  rechargedById: string;
  rechargedDate: number;
  partner: Parent;
  partnerId: string;
  insertedBy: InsertedBy;
}
interface InsertedBy {
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
  partner: Parent;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
interface RechargedBy {
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
  partner: Parent;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
interface ZoneManager {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division;
  district: District;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  parent: Parent;
  client: Parent;
  isActive: boolean;
  wsdCommission: number;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}
interface Parent {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  clientLevel: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division;
  district: District;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
interface RadiusIp {
  createdOn: number;
  updatedOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
interface District {
  createdOn: number;
  id: string;
  division: Division;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
