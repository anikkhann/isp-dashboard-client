/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
}

export interface RadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
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

export interface Partner {
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
  latitude: string;
  longitude: string;
  divisionId: string;
  division: Division;
  districtId: string;
  district: District;
  licenseTypeId: string;
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
}

export interface RadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
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

export interface Client {
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
  latitude: string;
  longitude: string;
  divisionId: string;
  division: Division;
  districtId: string;
  district: District;
  licenseTypeId: string;
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface CustomerType {
  createdOn: number;
  id: string;
  partner: Partner;
  title: string;
  isActive: boolean;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Upazilla {
  createdOn: number;
  id: string;
  district: District;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface CustomerPackage {
  createdOn: number;
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

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface DistributionZone {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  name: string;
  isActive: boolean;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
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
  id: string;
  partner: Partner;
  zone: Zone;
  name: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface ReferrerUser {
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
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
}

export interface RadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client {
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
  latitude: string;
  longitude: string;
  division: Division;
  district: District;
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
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

export interface Customer {
  createdOn: number;
  id: string;
  customerId: string;
  name: string;
  username: string;
  password: string;
  customerType: CustomerType;
  customerTypeId: string;
  mobileNo: string;
  altMobileNo: string;
  email: string;
  contactPerson: string;
  contactNumber: string;
  connectionAddress: string;
  flatNo: string;
  houseNo: string;
  roadNo: string;
  area: string;
  identityType: string;
  identityNo: string;
  divisionId: string;
  division: Division;
  districtId: string;
  district: District;
  upazillaId: string;
  upazilla: Upazilla;
  unionId: string;
  union: Union;
  customerPackage: CustomerPackage;
  customerPackageId: string;
  distributionZone: DistributionZone;
  distributionZoneId: string;
  distributionPop: DistributionPop;
  distributionPopId: string;
  isMacBound: boolean;
  mac: string;
  simultaneousUser: number;
  ipMode: string;
  staticIp: string;
  remarks: string;
  referenceType: string;
  referrerUser: ReferrerUser;
  referrerUserId: string;
  connectionType: string;
  fiberOpticDeviceType: string;
  cableId: string;
  colorCode: string;
  splitter: string;
  expirationTime: number;
  credits: number;
  autoRenew: boolean;
  discount: number;
  smsAlert: boolean;
  emailAlert: boolean;
  partner: Partner;
  partnerId: string;
  client: Client;
  clientId: string;
  isActive: boolean;
  isSafOtpSend: boolean;
  isSafVerified: boolean;
  isSafOtpVerified: boolean;
  adjustmentDay: number;
  insertedBy: InsertedBy;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

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

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
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
  licenseType: LicenseType;
  licenseExpireDate: number;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  serviceType: string;
  dnsName: string;
  packageType: string;
  wsdCommission: string;
  bankName: string;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
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

export interface CustomerPackage {
  createdOn: number;
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
  partnerId: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  zones: any[];
}

export interface InvoiceData {
  createdOn: number;
  id: string;
  invoiceId: string;
  customerSystemId: string;
  username: string;
  contactNumber: string;
  email: string;
  connectionAddress: string;
  clientName: string;
  clientAddress: string;
  credits: string;
  discount: string;
  displayName: string;
  totalPrice: string;
  vat: string;
  vatAmount: string;
  unitPrice: string;
  validityUnit: string;
  dueDate: string;
  billingPeriod: string;
  isSend: boolean;
  invoiceYear: string;
  invoiceMonth: string;
  partner: Partner;
  partnerId: string;
  client: Client;
  clientId: string;
  customer: Customer;
  customerId: string;
  customerPackage: CustomerPackage;
  customerPackageId: string;
}
