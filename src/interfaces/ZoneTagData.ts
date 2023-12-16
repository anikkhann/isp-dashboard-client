export interface ZoneTagData {
  createdOn: number;
  id: string;
  pricingPlanId: string;
  pricingPlan: ZoneTagDataPricingPlan;
  type: string;
  serialFrom: string;
  serialTo: string;
  quantity: number;
  clientId: string;
  client: ZoneTagDataClient;
  zoneManagerId: string;
  zoneManager: ZoneTagDataZoneManager;
}
export interface ZoneTagDataPricingPlan {
  createdOn: number;
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
}
export interface ZoneTagDataClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataClientDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface ZoneTagDataClientInsertedBy {
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
export interface ZoneTagDataClientEditedBy {
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
export interface ZoneTagDataClient {
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
  divisionId: string;
  division: ZoneTagDataClientDivision;
  districtId: string;
  district: ZoneTagDataClientDistrict;
  credits: number;
  radiusIp: ZoneTagDataClientRadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: ZoneTagDataClientInsertedBy;
  editedBy: ZoneTagDataClientEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface ZoneTagDataZoneManagerParent {
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
  division: ZoneTagDataZoneManagerParentDivision;
  district: ZoneTagDataZoneManagerParentDistrict;
  credits: number;
  radiusIp: ZoneTagDataZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface ZoneTagDataZoneManagerClient {
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
  division: ZoneTagDataZoneManagerClientDivision;
  district: ZoneTagDataZoneManagerClientDistrict;
  credits: number;
  radiusIp: ZoneTagDataZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerInsertedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerInsertedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerInsertedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerInsertedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerInsertedByPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface ZoneTagDataZoneManagerInsertedByPartner {
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
  division: ZoneTagDataZoneManagerInsertedByPartnerDivision;
  district: ZoneTagDataZoneManagerInsertedByPartnerDistrict;
  credits: number;
  radiusIp: ZoneTagDataZoneManagerInsertedByPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerInsertedBy {
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
  partner: ZoneTagDataZoneManagerInsertedByPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerEditedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerEditedByPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface ZoneTagDataZoneManagerEditedByPartnerParent {
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
  division: ZoneTagDataZoneManagerEditedByPartnerParentDivision;
  district: ZoneTagDataZoneManagerEditedByPartnerParentDistrict;
  credits: number;
  radiusIp: ZoneTagDataZoneManagerEditedByPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerEditedByPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerEditedByPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface ZoneTagDataZoneManagerEditedByPartnerClient {
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
  division: ZoneTagDataZoneManagerEditedByPartnerClientDivision;
  district: ZoneTagDataZoneManagerEditedByPartnerClientDistrict;
  credits: number;
  radiusIp: ZoneTagDataZoneManagerEditedByPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerEditedByPartner {
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
  division: ZoneTagDataZoneManagerEditedByPartnerDivision;
  district: ZoneTagDataZoneManagerEditedByPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: ZoneTagDataZoneManagerEditedByPartnerParent;
  client: ZoneTagDataZoneManagerEditedByPartnerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerEditedByParentPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByParentPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByParentPartnerDistrict {
  createdOn: number;
  id: string;
  division: ZoneTagDataZoneManagerEditedByParentPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface ZoneTagDataZoneManagerEditedByParentPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface ZoneTagDataZoneManagerEditedByParentPartner {
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
  division: ZoneTagDataZoneManagerEditedByParentPartnerDivision;
  district: ZoneTagDataZoneManagerEditedByParentPartnerDistrict;
  credits: number;
  radiusIp: ZoneTagDataZoneManagerEditedByParentPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface ZoneTagDataZoneManagerEditedBy {
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
  partner: ZoneTagDataZoneManagerEditedByPartner;
  parentPartnerId: string;
  parentPartner: ZoneTagDataZoneManagerEditedByParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface ZoneTagDataZoneManager {
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
  divisionId: string;
  division: ZoneTagDataZoneManagerDivision;
  districtId: string;
  district: ZoneTagDataZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: ZoneTagDataZoneManagerParent;
  clientId: string;
  client: ZoneTagDataZoneManagerClient;
  isActive: boolean;
  insertedBy: ZoneTagDataZoneManagerInsertedBy;
  editedBy: ZoneTagDataZoneManagerEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
