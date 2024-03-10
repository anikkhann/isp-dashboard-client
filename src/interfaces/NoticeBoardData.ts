export interface NoticeBoardData {
  createdOn: number;
  id: number;
  noticeType: string;
  message: string;
  customerId: string;
  client: Client;
  clientId: number;
  zoneManager: ZoneManager;
  zoneManagerId: number;
  subZoneManager: SubZoneManager;
  subZoneManagerId: number;
  retailer: Retailer;
  retailerId: number;
  customerPackage: CustomerPackage;
  customerPackageId: number;
  startDate: number;
  endDate: number;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  updatedOn: number;
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
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

interface EditedBy {
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
interface CustomerPackage {
  createdOn: number;
  id: number;
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
  partner: Client;
  isActive: boolean;
}
interface Retailer {
  createdOn: number;
  id: number;
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
  upazilla: Upazilla;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  parent: SubZoneManager;
  client: Client;
  zoneManager: ZoneManager;
  subZoneManager: SubZoneManager;
  isActive: boolean;
  wsdCommission: number;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
  bankAccountNumber: string;
  nagadNumber: string;
}
interface SubZoneManager {
  createdOn: number;
  id: number;
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
  upazilla: Upazilla;
  union: Union;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  parent: ZoneManager;
  client: Client;
  zoneManager: ZoneManager;
  isActive: boolean;
  wsdCommission: number;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
  bankAccountNumber: string;
  nagadNumber: string;
}
interface ZoneManager {
  createdOn: number;
  updatedOn: number;
  id: number;
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
  upazilla: Upazilla;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  parent: Client;
  client: Client;
  isActive: boolean;
  wsdCommission: number;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
  bankAccountNumber: string;
  nagadNumber: string;
}
interface Client {
  createdOn: number;
  updatedOn: number;
  id: number;
  partnerType: string;
  clientLevel: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  latitude: string;
  longitude: string;
  division: Division;
  district: District;
  upazilla: Upazilla;
  union: Union;
  licenseType: LicenseType;
  licenseExpireDate: number;
  salesDistributionCommission: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: number;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
  bankAccountNumber: string;
  nagadNumber: string;
}
interface RadiusIp {
  createdOn: number;
  id: number;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
interface LicenseType {
  createdOn: number;
  id: number;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
}
interface Master {
  createdOn: number;
  id: number;
  name: string;
  key: string;
  isActive: boolean;
}
interface Union {
  createdOn: number;
  id: number;
  upazilla: Upazilla;
  name: string;
  bnName: string;
  url: string;
}
interface Upazilla {
  createdOn: number;
  id: number;
  district: District;
  name: string;
  bnName: string;
  url: string;
}
interface District {
  createdOn: number;
  id: number;
  division: Division;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
interface Division {
  createdOn: number;
  id: number;
  name: string;
  bnName: string;
  url: string;
}
