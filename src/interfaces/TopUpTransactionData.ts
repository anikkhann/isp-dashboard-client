export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District {
  createdOn: number;
  id: string;
  division: Division;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface RadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Partner {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  wsdCommission: string;
}

export interface CustomerType {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  title: string;
  isActive: boolean;
}

export interface Upazilla {
  createdOn: number;
  id: string;
  district: District;
  name: string;
  bnName: string;
  url: string;
}

export interface Union {
  createdOn: number;
  id: string;
  upazilla: Upazilla;
  name: string;
  bnName: string;
  url: string;
}

export interface Partner {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  wsdCommission: string;
}

export interface CustomerPackage {
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

export interface DistributionZone {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  name: string;
  isActive: boolean;
}

export interface Zone {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  name: string;
  isActive: boolean;
}

export interface DistributionPop {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  zone: Zone;
  name: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
}

export interface Parent {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  wsdCommission: string;
}

export interface Client {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  wsdCommission: string;
}

export interface ZoneManager {
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
  parent: Parent;
  client: Client;
  isActive: boolean;
  wsdCommission: string;
}

export interface Customer {
  createdOn: number;
  updatedOn: number;
  id: string;
  customerId: string;
  name: string;
  username: string;
  password: string;
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
  division: Division;
  district: District;
  upazilla: Upazilla;
  union: Union;
  customerPackage: CustomerPackage;
  distributionZone: DistributionZone;
  distributionPop: DistributionPop;
  isMacBound: boolean;
  mac: string;
  simultaneousUser: number;
  ipMode: string;
  staticIp: string;
  remarks: string;
  expirationTime: number;
  credits: number;
  autoRenew: boolean;
  discount: number;
  smsAlert: boolean;
  emailAlert: boolean;
  partner: Partner;
  zoneManager: ZoneManager;
  client: Client;
  isActive: boolean;
  isSafOtpSend: boolean;
  isSafVerified: boolean;
  isSafOtpVerified: boolean;
  adjustmentDay: number;
}

export interface RechargedBy {
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

export interface CustomerTopUp {
  createdOn: number;
  id: string;
  customer: Customer;
  serialNo: number;
  amount: number;
  remarks: string;
  type: string;
  rechargedBy: RechargedBy;
  rechargedDate: number;
  partner: Partner;
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
  partner: Partner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface TopUpTransactionData {
  createdOn: number;
  id: string;
  transactionId: string;
  userType: string;
  userId: string;
  trxFor: string;
  trxType: string;
  trxMode: string;
  amount: number;
  balance: number;
  trxBy: string;
  customerTopUp: CustomerTopUp;
  customerTopUpId: string;
  trxDate: number;
  remarks: string;
  partner: Partner;
  partnerId: string;
  zoneCommission: number;
  insertedBy: InsertedBy;
}
