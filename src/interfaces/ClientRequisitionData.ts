export interface ClientRequisitionData {
  createdOn: number;
  updatedOn: number;
  id: number;
  requisitionNo: string;
  date: number;
  totalAmount: number;
  payableAmount: number;
  paymentStatus: string;
  lines: Line[];
  status: string;
  statusChangedById: number;
  statusChangedBy: StatusChangedBy;
  statusChangedDate: number;
  paymentType: string;
  clientId: number;
  partnerId: number;
  partner: Partner2;
  attachment: string;
  insertedBy: InsertedBy3;
  editedBy: EditedBy3;
  clientNote: string;
  zoneNote: string;
}

export interface Line {
  createdOn: number;
  id: number;
  zoneCardRequisitionId: number;
  zoneCardRequisition: ZoneCardRequisition;
  partnerId: number;
  partner: Partner;
  pricingPlanId: number;
  pricingPlan: PricingPlan;
  quantity: number;
  dataRate: number;
  dataRateUnit: string;
  validity: number;
  price: number;
  validityUnit: string;
  payableAmount: number;
}

export interface ZoneCardRequisition {
  createdOn: number;
  updatedOn: number;
  id: number;
  requisitionNo: string;
  date: number;
  totalAmount: number;
  payableAmount: number;
  paymentStatus: string;
  status: string;
  statusChangedById: number;
  statusChangedDate: number;
  paymentType: string;
  clientId: number;
  partnerId: number;
  attachment: string;
}

export interface Partner {
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
  divisionId: number;
  division: Division;
  districtId: number;
  district: District;
  upazillaId: number;
  upazilla: Upazilla;
  unionId: number;
  union: Union;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  parentId: number;
  parent: Parent;
  clientId: number;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
  bankAccountNumber: string;
  nagadNumber: string;
  bkashNumber: string;
}

export interface Division {
  name: string;
}

export interface District {
  name: string;
}

export interface Upazilla {
  name: string;
}

export interface Union {
  name: string;
}

export interface Parent {
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
  licenseType: LicenseType;
  btrcLicenseNo: string;
  licenseExpireDate: number;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
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
  bkashNumber: string;
}

export interface LicenseType {
  createdOn: number;
  id: number;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master {
  createdOn: number;
  id: number;
  name: string;
  key: string;
  isActive: boolean;
}

export interface RadiusIp {
  createdOn: number;
  updatedOn: number;
  id: number;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface InsertedBy {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  partnerId: number;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface EditedBy {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  partnerId: number;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface PricingPlan {
  createdOn: number;
  id: number;
  name: string;
  price: number;
  dataRate: number;
  dataRateUnit: string;
  validity: number;
  validityUnit: string;
  otpLimit: number;
  packageCategory: string;
  isActive: boolean;
}

export interface StatusChangedBy {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  partnerId: number;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner2 {
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
  divisionId: number;
  division: Division2;
  districtId: number;
  district: District2;
  upazillaId: number;
  upazilla: Upazilla2;
  unionId: number;
  union: Union2;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  parentId: number;
  parent: Parent2;
  clientId: number;
  isActive: boolean;
  insertedBy: InsertedBy2;
  editedBy: EditedBy2;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
  bankAccountNumber: string;
  nagadNumber: string;
  bkashNumber: string;
}

export interface Division2 {
  name: string;
}

export interface District2 {
  name: string;
}

export interface Upazilla2 {
  name: string;
}

export interface Union2 {
  name: string;
}

export interface Parent2 {
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
  licenseType: LicenseType2;
  btrcLicenseNo: string;
  licenseExpireDate: number;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  radiusIp: RadiusIp2;
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
  bkashNumber: string;
}

export interface LicenseType2 {
  createdOn: number;
  id: number;
  name: string;
  master: Master2;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master2 {
  createdOn: number;
  id: number;
  name: string;
  key: string;
  isActive: boolean;
}

export interface RadiusIp2 {
  createdOn: number;
  updatedOn: number;
  id: number;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface InsertedBy2 {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  partnerId: number;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface EditedBy2 {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  partnerId: number;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface InsertedBy3 {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  partnerId: number;
  parentPartnerId: number;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface EditedBy3 {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  partnerId: number;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
