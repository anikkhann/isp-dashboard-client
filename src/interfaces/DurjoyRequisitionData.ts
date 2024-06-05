export interface DurjoyRequisitionData {
  createdOn: number;
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
  expireDate: number;
  paymentType: string;
  deliveryType: string;
  clientId: number;
  client: Partner;
  subZoneManagerId: number;
  subZoneManager: SubZoneManager;
  attachment: string;
  insertedBy: StatusChangedBy;
  tagVoucher: string;
  clientNote: string;
  deliveryName: string;
  deliveryContact: string;
  deliveryAddress: string;
  contactNumber: string;
  // username: string
}
interface SubZoneManager {
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
  district: Division;
  upazillaId: number;
  upazilla: Division;
  salesDistributionCommission: number;
  credits: number;
  nidNo: string;
  parentId: number;
  parent: Parent;
  clientId: number;
  isActive: boolean;
  insertedBy: StatusChangedBy;
  editedBy: StatusChangedBy;
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
}
interface Parent {
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
  licenseType: LicenseType;
  btrcLicenseNo: string;
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
interface StatusChangedBy {
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
interface Line {
  createdOn: number;
  id: number;
  clientCardRequisitionId: number;
  clientCardRequisition: ClientCardRequisition;
  partnerId: number;
  partner: Partner;
  pricingPlanId: number;
  pricingPlan: PricingPlan;
  quantity: number;
  isProcessed: boolean;
  dataRate: number;
  dataRateUnit: string;
  validity: number;
  price: number;
  validityUnit: string;
  payableAmount: number;
}
interface PricingPlan {
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
  updatedOn?: number;
}
interface Partner {
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
  divisionId: number;
  division: Division;
  districtId: number;
  district: Division;
  upazillaId: number;
  upazilla: Division;
  unionId: number;
  union: Division;
  licenseTypeId: number;
  licenseType: LicenseType;
  btrcLicenseNo: string;
  licenseExpireDate: number;
  salesDistributionCommission: number;
  credits: number;
  radiusIp: RadiusIp;
  radiusIpId: number;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: InsertedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
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
interface InsertedBy {
  createdOn: number;
  updatedOn: number;
  id: number;
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
interface RadiusIp {
  createdOn: number;
  updatedOn: number;
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
interface Division {
  name: string;
}
interface ClientCardRequisition {
  createdOn: number;
  id: number;
  requisitionNo: string;
  date: number;
  totalAmount: number;
  payableAmount: number;
  paymentStatus: string;
  status: string;
  statusChangedById: number;
  statusChangedDate: number;
  expireDate: number;
  paymentType: string;
  deliveryType: string;
  clientId: number;
  subZoneManagerId: number;
  attachment: string;
}
