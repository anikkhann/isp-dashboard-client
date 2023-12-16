export interface SubZoneTagData {
  createdOn: number;
  id: string;
  pricingPlanId: string;
  pricingPlan: SubZoneTagDataPricingPlan;
  type: string;
  serialFrom: string;
  serialTo: string;
  quantity: number;
  clientId: string;
  client: SubZoneTagDataClient;
  zoneManagerId: string;
  zoneManager: SubZoneTagDataZoneManager;
  subZoneManagerId: string;
  subZoneManager: SubZoneTagDataSubZoneManager;
}
export interface SubZoneTagDataPricingPlan {
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
export interface SubZoneTagDataClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataClientDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataClientInsertedBy {
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
export interface SubZoneTagDataClientEditedBy {
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
export interface SubZoneTagDataClient {
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
  division: SubZoneTagDataClientDivision;
  districtId: string;
  district: SubZoneTagDataClientDistrict;
  credits: number;
  radiusIp: SubZoneTagDataClientRadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: SubZoneTagDataClientInsertedBy;
  editedBy: SubZoneTagDataClientEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataZoneManagerParent {
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
  division: SubZoneTagDataZoneManagerParentDivision;
  district: SubZoneTagDataZoneManagerParentDistrict;
  credits: number;
  radiusIp: SubZoneTagDataZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataZoneManagerClient {
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
  division: SubZoneTagDataZoneManagerClientDivision;
  district: SubZoneTagDataZoneManagerClientDistrict;
  credits: number;
  radiusIp: SubZoneTagDataZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerInsertedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerInsertedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerInsertedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerInsertedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerInsertedByPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataZoneManagerInsertedByPartner {
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
  division: SubZoneTagDataZoneManagerInsertedByPartnerDivision;
  district: SubZoneTagDataZoneManagerInsertedByPartnerDistrict;
  credits: number;
  radiusIp: SubZoneTagDataZoneManagerInsertedByPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerInsertedBy {
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
  partner: SubZoneTagDataZoneManagerInsertedByPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerEditedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerEditedByPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerParent {
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
  division: SubZoneTagDataZoneManagerEditedByPartnerParentDivision;
  district: SubZoneTagDataZoneManagerEditedByPartnerParentDistrict;
  credits: number;
  radiusIp: SubZoneTagDataZoneManagerEditedByPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerEditedByPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataZoneManagerEditedByPartnerClient {
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
  division: SubZoneTagDataZoneManagerEditedByPartnerClientDivision;
  district: SubZoneTagDataZoneManagerEditedByPartnerClientDistrict;
  credits: number;
  radiusIp: SubZoneTagDataZoneManagerEditedByPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerEditedByPartner {
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
  division: SubZoneTagDataZoneManagerEditedByPartnerDivision;
  district: SubZoneTagDataZoneManagerEditedByPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: SubZoneTagDataZoneManagerEditedByPartnerParent;
  client: SubZoneTagDataZoneManagerEditedByPartnerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerEditedByParentPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByParentPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByParentPartnerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataZoneManagerEditedByParentPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataZoneManagerEditedByParentPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataZoneManagerEditedByParentPartner {
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
  division: SubZoneTagDataZoneManagerEditedByParentPartnerDivision;
  district: SubZoneTagDataZoneManagerEditedByParentPartnerDistrict;
  credits: number;
  radiusIp: SubZoneTagDataZoneManagerEditedByParentPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataZoneManagerEditedBy {
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
  partner: SubZoneTagDataZoneManagerEditedByPartner;
  parentPartnerId: string;
  parentPartner: SubZoneTagDataZoneManagerEditedByParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface SubZoneTagDataZoneManager {
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
  division: SubZoneTagDataZoneManagerDivision;
  districtId: string;
  district: SubZoneTagDataZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: SubZoneTagDataZoneManagerParent;
  clientId: string;
  client: SubZoneTagDataZoneManagerClient;
  isActive: boolean;
  insertedBy: SubZoneTagDataZoneManagerInsertedBy;
  editedBy: SubZoneTagDataZoneManagerEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentParentDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerParentParent {
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
  division: SubZoneTagDataSubZoneManagerParentParentDivision;
  district: SubZoneTagDataSubZoneManagerParentParentDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentClientDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerParentClient {
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
  division: SubZoneTagDataSubZoneManagerParentClientDivision;
  district: SubZoneTagDataSubZoneManagerParentClientDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerParent {
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
  division: SubZoneTagDataSubZoneManagerParentDivision;
  district: SubZoneTagDataSubZoneManagerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: SubZoneTagDataSubZoneManagerParentParent;
  client: SubZoneTagDataSubZoneManagerParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerClient {
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
  division: SubZoneTagDataSubZoneManagerClientDivision;
  district: SubZoneTagDataSubZoneManagerClientDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerParent {
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
  division: SubZoneTagDataSubZoneManagerZoneManagerParentDivision;
  district: SubZoneTagDataSubZoneManagerZoneManagerParentDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerZoneManagerClient {
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
  division: SubZoneTagDataSubZoneManagerZoneManagerClientDivision;
  district: SubZoneTagDataSubZoneManagerZoneManagerClientDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerZoneManager {
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
  division: SubZoneTagDataSubZoneManagerZoneManagerDivision;
  district: SubZoneTagDataSubZoneManagerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: SubZoneTagDataSubZoneManagerZoneManagerParent;
  client: SubZoneTagDataSubZoneManagerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerInsertedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerInsertedByPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerParent {
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
  division: SubZoneTagDataSubZoneManagerInsertedByPartnerParentDivision;
  district: SubZoneTagDataSubZoneManagerInsertedByPartnerParentDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerInsertedByPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerInsertedByPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartnerClient {
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
  division: SubZoneTagDataSubZoneManagerInsertedByPartnerClientDivision;
  district: SubZoneTagDataSubZoneManagerInsertedByPartnerClientDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerInsertedByPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerInsertedByPartner {
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
  division: SubZoneTagDataSubZoneManagerInsertedByPartnerDivision;
  district: SubZoneTagDataSubZoneManagerInsertedByPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: SubZoneTagDataSubZoneManagerInsertedByPartnerParent;
  client: SubZoneTagDataSubZoneManagerInsertedByPartnerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerInsertedByParentPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByParentPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByParentPartnerDistrict {
  createdOn: number;
  id: string;
  division: SubZoneTagDataSubZoneManagerInsertedByParentPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SubZoneTagDataSubZoneManagerInsertedByParentPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SubZoneTagDataSubZoneManagerInsertedByParentPartner {
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
  division: SubZoneTagDataSubZoneManagerInsertedByParentPartnerDivision;
  district: SubZoneTagDataSubZoneManagerInsertedByParentPartnerDistrict;
  credits: number;
  radiusIp: SubZoneTagDataSubZoneManagerInsertedByParentPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SubZoneTagDataSubZoneManagerInsertedBy {
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
  partner: SubZoneTagDataSubZoneManagerInsertedByPartner;
  parentPartnerId: string;
  parentPartner: SubZoneTagDataSubZoneManagerInsertedByParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface SubZoneTagDataSubZoneManager {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  divisionId: string;
  division: SubZoneTagDataSubZoneManagerDivision;
  districtId: string;
  district: SubZoneTagDataSubZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: SubZoneTagDataSubZoneManagerParent;
  clientId: string;
  client: SubZoneTagDataSubZoneManagerClient;
  zoneManagerId: string;
  zoneManager: SubZoneTagDataSubZoneManagerZoneManager;
  isActive: boolean;
  insertedBy: SubZoneTagDataSubZoneManagerInsertedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
