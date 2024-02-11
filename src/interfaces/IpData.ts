// import { EditedBy } from "./RoleData";

export interface IpData {
  createdOn: number;
  updatedOn: number;
  id: string;
  ipSubnet: IpSubnet;
  ipSubnetId: string;
  ip: string;
  assignedType: string;
  customer: Customer;
  customerId: string;
  isUsed: boolean;
  assignedTo: string;
  assignedBy: AssignedBy;
  assignedById: string;
  assignedTime: number;
  insertedBy: InsertedBy;
  editedBy: InsertedBy;
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
  partner: Partner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
interface AssignedBy {
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
  partner: Partner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
interface Customer {
  createdOn: number;
  id: string;
  customerId: string;
  name: string;
  username: string;
  password: string;
  panelPassword: string;
  customerType: CustomerType;
  mobileNo: string;
  email: string;
  contactPerson: string;
  contactNumber: string;
  connectionAddress: string;
  houseNo: string;
  area: string;
  identityType: string;
  identityNo: string;
  customerPackage: CustomerPackage;
  distributionZone: DistributionZone;
  distributionPop: DistributionPop;
  isMacBound: boolean;
  simultaneousUser: number;
  ipMode: string;
  expirationTime: number;
  credits: number;
  autoRenew: boolean;
  discount: number;
  smsAlert: boolean;
  emailAlert: boolean;
  partner: Partner;
  subZoneManager: SubZoneManager;
  zoneManager: ZoneManager;
  client: Partner;
  isActive: boolean;
  isSafOtpSend: boolean;
  isSafVerified: boolean;
  isSafOtpVerified: boolean;
  adjustmentDay: number;
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
  parent: Partner;
  client: Partner;
  isActive: boolean;
  wsdCommission: number;
}
interface SubZoneManager {
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
  parent: Partner;
  client: Partner;
  isActive: boolean;
  wsdCommission: number;
}
interface DistributionPop {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  zone: DistributionZone;
  name: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
}
interface DistributionZone {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  name: string;
  isActive: boolean;
}
interface CustomerPackage {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  displayName: string;
  uploadLimit: number;
  uploadLimitUnit: string;
  downloadLimit: number;
  downloadLimitUnit: string;
  ipPoolName: string;
  validityUnit: string;
  validity: number;
  vat: number;
  totalPrice: number;
  unitPrice: number;
  autoRenew: boolean;
  isAssignedToZone: boolean;
  isAssignedToSubZone: boolean;
  partner: Partner;
  isActive: boolean;
}
interface CustomerType {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  title: string;
  isActive: boolean;
}
interface IpSubnet {
  createdOn: number;
  id: string;
  networkName: string;
  networkAddress: string;
  subnetMask: string;
  partner: Partner;
  isActive: boolean;
}
interface Partner {
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
