export interface RetailerTagData {
  createdOn: number;
  username: string;
  insertedBy: string;
  editedBy: string;
  updatedOn: number;
  id: string;
  pricingPlanId: string;
  pricingPlan: RetailerTagDataPricingPlan;
  type: string;
  serialFrom: string;
  serialTo: string;
  quantity: number;
  retailerId: string;
  retailer: RetailerTagDataRetailer;
  clientId: string;
  client: RetailerTagDataClient;
  zoneManagerId: string;
  zoneManager: RetailerTagDataZoneManager;
  subZoneManagerId: string;
  subZoneManager: RetailerTagDataSubZoneManager;
  partnerId: string;
  partner: RetailerTagDataPartner;
}
// export interface InsertedBy {
//   createdOn: number;
//   updatedOn: number;
//   id: string;
//   name: string;
//   username: string;
//   phone: string;
//   email: string;
//   isActive: boolean;
//   isMasterUser: boolean;
//   partnerId: string;
//   partner: Partner;
//   parentPartnerId: string;
//   parentPartner: ParentPartner;
//   userType: string;
//   credits: number;
//   lastLoginTime: number;
//   ipAddress: string;
// }
// export interface RetailerTagDataEditedBy {
//   createdOn: number;
//   updatedOn: number;
//   id: string;
//   name: string;
//   username: string;
//   phone: string;
//   email: string;
//   isActive: boolean;
//   userType: string;
//   credits: number;
//   lastLoginTime: number;
//   ipAddress: string;
// }
export interface RetailerTagDataPricingPlan {
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
export interface RetailerTagDataRetailerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerParentParentParent {
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
  division: RetailerTagDataRetailerParentParentParentDivision;
  district: RetailerTagDataRetailerParentParentParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerParentParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerParentParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerParentParentClient {
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
  division: RetailerTagDataRetailerParentParentClientDivision;
  district: RetailerTagDataRetailerParentParentClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerParentParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerParentParent {
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
  division: RetailerTagDataRetailerParentParentDivision;
  district: RetailerTagDataRetailerParentParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerParentParentParent;
  client: RetailerTagDataRetailerParentParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerParentClient {
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
  division: RetailerTagDataRetailerParentClientDivision;
  district: RetailerTagDataRetailerParentClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerParentZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerParentZoneManagerParent {
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
  division: RetailerTagDataRetailerParentZoneManagerParentDivision;
  district: RetailerTagDataRetailerParentZoneManagerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerParentZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerParentZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerParentZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerParentZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerParentZoneManagerClient {
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
  division: RetailerTagDataRetailerParentZoneManagerClientDivision;
  district: RetailerTagDataRetailerParentZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerParentZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerParentZoneManager {
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
  division: RetailerTagDataRetailerParentZoneManagerDivision;
  district: RetailerTagDataRetailerParentZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerParentZoneManagerParent;
  client: RetailerTagDataRetailerParentZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerParent {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: RetailerTagDataRetailerParentDivision;
  district: RetailerTagDataRetailerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerParentParent;
  client: RetailerTagDataRetailerParentClient;
  zoneManager: RetailerTagDataRetailerParentZoneManager;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerClient {
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
  division: RetailerTagDataRetailerClientDivision;
  district: RetailerTagDataRetailerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerZoneManagerParent {
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
  division: RetailerTagDataRetailerZoneManagerParentDivision;
  district: RetailerTagDataRetailerZoneManagerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerZoneManagerClient {
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
  division: RetailerTagDataRetailerZoneManagerClientDivision;
  district: RetailerTagDataRetailerZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerZoneManager {
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
  division: RetailerTagDataRetailerZoneManagerDivision;
  district: RetailerTagDataRetailerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerZoneManagerParent;
  client: RetailerTagDataRetailerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerSubZoneManagerParentParent {
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
  division: RetailerTagDataRetailerSubZoneManagerParentParentDivision;
  district: RetailerTagDataRetailerSubZoneManagerParentParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerSubZoneManagerParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManagerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerSubZoneManagerParentClient {
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
  division: RetailerTagDataRetailerSubZoneManagerParentClientDivision;
  district: RetailerTagDataRetailerSubZoneManagerParentClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerSubZoneManagerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManagerParent {
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
  division: RetailerTagDataRetailerSubZoneManagerParentDivision;
  district: RetailerTagDataRetailerSubZoneManagerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerSubZoneManagerParentParent;
  client: RetailerTagDataRetailerSubZoneManagerParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerSubZoneManagerClient {
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
  division: RetailerTagDataRetailerSubZoneManagerClientDivision;
  district: RetailerTagDataRetailerSubZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerSubZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerParent {
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
  division: RetailerTagDataRetailerSubZoneManagerZoneManagerParentDivision;
  district: RetailerTagDataRetailerSubZoneManagerZoneManagerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerSubZoneManagerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerSubZoneManagerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManagerClient {
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
  division: RetailerTagDataRetailerSubZoneManagerZoneManagerClientDivision;
  district: RetailerTagDataRetailerSubZoneManagerZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerSubZoneManagerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManagerZoneManager {
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
  division: RetailerTagDataRetailerSubZoneManagerZoneManagerDivision;
  district: RetailerTagDataRetailerSubZoneManagerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerSubZoneManagerZoneManagerParent;
  client: RetailerTagDataRetailerSubZoneManagerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerSubZoneManager {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: RetailerTagDataRetailerSubZoneManagerDivision;
  district: RetailerTagDataRetailerSubZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerSubZoneManagerParent;
  client: RetailerTagDataRetailerSubZoneManagerClient;
  zoneManager: RetailerTagDataRetailerSubZoneManagerZoneManager;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentParent {
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
  division: RetailerTagDataRetailerInsertedByPartnerParentParentDivision;
  district: RetailerTagDataRetailerInsertedByPartnerParentParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerInsertedByPartnerParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerInsertedByPartnerParentClient {
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
  division: RetailerTagDataRetailerInsertedByPartnerParentClientDivision;
  district: RetailerTagDataRetailerInsertedByPartnerParentClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerInsertedByPartnerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartnerParent {
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
  division: RetailerTagDataRetailerInsertedByPartnerParentDivision;
  district: RetailerTagDataRetailerInsertedByPartnerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerInsertedByPartnerParentParent;
  client: RetailerTagDataRetailerInsertedByPartnerParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerInsertedByPartnerClient {
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
  division: RetailerTagDataRetailerInsertedByPartnerClientDivision;
  district: RetailerTagDataRetailerInsertedByPartnerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerInsertedByPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerParent {
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
  division: RetailerTagDataRetailerInsertedByPartnerZoneManagerParentDivision;
  district: RetailerTagDataRetailerInsertedByPartnerZoneManagerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerInsertedByPartnerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByPartnerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManagerClient {
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
  division: RetailerTagDataRetailerInsertedByPartnerZoneManagerClientDivision;
  district: RetailerTagDataRetailerInsertedByPartnerZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerInsertedByPartnerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartnerZoneManager {
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
  division: RetailerTagDataRetailerInsertedByPartnerZoneManagerDivision;
  district: RetailerTagDataRetailerInsertedByPartnerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerInsertedByPartnerZoneManagerParent;
  client: RetailerTagDataRetailerInsertedByPartnerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByPartner {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: RetailerTagDataRetailerInsertedByPartnerDivision;
  district: RetailerTagDataRetailerInsertedByPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerInsertedByPartnerParent;
  client: RetailerTagDataRetailerInsertedByPartnerClient;
  zoneManager: RetailerTagDataRetailerInsertedByPartnerZoneManager;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByParentPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByParentPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerParent {
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
  division: RetailerTagDataRetailerInsertedByParentPartnerParentDivision;
  district: RetailerTagDataRetailerInsertedByParentPartnerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerInsertedByParentPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataRetailerInsertedByParentPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataRetailerInsertedByParentPartnerClient {
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
  division: RetailerTagDataRetailerInsertedByParentPartnerClientDivision;
  district: RetailerTagDataRetailerInsertedByParentPartnerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataRetailerInsertedByParentPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedByParentPartner {
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
  division: RetailerTagDataRetailerInsertedByParentPartnerDivision;
  district: RetailerTagDataRetailerInsertedByParentPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataRetailerInsertedByParentPartnerParent;
  client: RetailerTagDataRetailerInsertedByParentPartnerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataRetailerInsertedBy {
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
  partner: RetailerTagDataRetailerInsertedByPartner;
  parentPartnerId: string;
  parentPartner: RetailerTagDataRetailerInsertedByParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface RetailerTagDataRetailer {
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
  division: RetailerTagDataRetailerDivision;
  districtId: string;
  district: RetailerTagDataRetailerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: RetailerTagDataRetailerParent;
  clientId: string;
  client: RetailerTagDataRetailerClient;
  zoneManagerId: string;
  zoneManager: RetailerTagDataRetailerZoneManager;
  subZoneManagerId: string;
  subZoneManager: RetailerTagDataRetailerSubZoneManager;
  isActive: boolean;
  insertedBy: RetailerTagDataRetailerInsertedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
export interface RetailerTagDataClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataClientInsertedBy {
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
export interface RetailerTagDataClientEditedBy {
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
export interface RetailerTagDataClient {
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
  division: RetailerTagDataClientDivision;
  districtId: string;
  district: RetailerTagDataClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataClientRadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: RetailerTagDataClientInsertedBy;
  editedBy: RetailerTagDataClientEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataZoneManagerParent {
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
  division: RetailerTagDataZoneManagerParentDivision;
  district: RetailerTagDataZoneManagerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataZoneManagerClient {
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
  division: RetailerTagDataZoneManagerClientDivision;
  district: RetailerTagDataZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerInsertedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerInsertedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerInsertedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerInsertedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerInsertedByPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataZoneManagerInsertedByPartner {
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
  division: RetailerTagDataZoneManagerInsertedByPartnerDivision;
  district: RetailerTagDataZoneManagerInsertedByPartnerDistrict;
  credits: number;
  radiusIp: RetailerTagDataZoneManagerInsertedByPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerInsertedBy {
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
  partner: RetailerTagDataZoneManagerInsertedByPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerEditedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerEditedByPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataZoneManagerEditedByPartnerParent {
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
  division: RetailerTagDataZoneManagerEditedByPartnerParentDivision;
  district: RetailerTagDataZoneManagerEditedByPartnerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataZoneManagerEditedByPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerEditedByPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerEditedByPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataZoneManagerEditedByPartnerClient {
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
  division: RetailerTagDataZoneManagerEditedByPartnerClientDivision;
  district: RetailerTagDataZoneManagerEditedByPartnerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataZoneManagerEditedByPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerEditedByPartner {
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
  division: RetailerTagDataZoneManagerEditedByPartnerDivision;
  district: RetailerTagDataZoneManagerEditedByPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataZoneManagerEditedByPartnerParent;
  client: RetailerTagDataZoneManagerEditedByPartnerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerEditedByParentPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByParentPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByParentPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataZoneManagerEditedByParentPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataZoneManagerEditedByParentPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataZoneManagerEditedByParentPartner {
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
  division: RetailerTagDataZoneManagerEditedByParentPartnerDivision;
  district: RetailerTagDataZoneManagerEditedByParentPartnerDistrict;
  credits: number;
  radiusIp: RetailerTagDataZoneManagerEditedByParentPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataZoneManagerEditedBy {
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
  partner: RetailerTagDataZoneManagerEditedByPartner;
  parentPartnerId: string;
  parentPartner: RetailerTagDataZoneManagerEditedByParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface RetailerTagDataZoneManager {
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
  division: RetailerTagDataZoneManagerDivision;
  districtId: string;
  district: RetailerTagDataZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: RetailerTagDataZoneManagerParent;
  clientId: string;
  client: RetailerTagDataZoneManagerClient;
  isActive: boolean;
  insertedBy: RetailerTagDataZoneManagerInsertedBy;
  editedBy: RetailerTagDataZoneManagerEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerParentParent {
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
  division: RetailerTagDataSubZoneManagerParentParentDivision;
  district: RetailerTagDataSubZoneManagerParentParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerParentClient {
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
  division: RetailerTagDataSubZoneManagerParentClientDivision;
  district: RetailerTagDataSubZoneManagerParentClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerParent {
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
  division: RetailerTagDataSubZoneManagerParentDivision;
  district: RetailerTagDataSubZoneManagerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataSubZoneManagerParentParent;
  client: RetailerTagDataSubZoneManagerParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerClient {
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
  division: RetailerTagDataSubZoneManagerClientDivision;
  district: RetailerTagDataSubZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerZoneManagerParent {
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
  division: RetailerTagDataSubZoneManagerZoneManagerParentDivision;
  district: RetailerTagDataSubZoneManagerZoneManagerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerZoneManagerClient {
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
  division: RetailerTagDataSubZoneManagerZoneManagerClientDivision;
  district: RetailerTagDataSubZoneManagerZoneManagerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerZoneManager {
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
  division: RetailerTagDataSubZoneManagerZoneManagerDivision;
  district: RetailerTagDataSubZoneManagerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataSubZoneManagerZoneManagerParent;
  client: RetailerTagDataSubZoneManagerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerInsertedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerInsertedByPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerParent {
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
  division: RetailerTagDataSubZoneManagerInsertedByPartnerParentDivision;
  district: RetailerTagDataSubZoneManagerInsertedByPartnerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerInsertedByPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerInsertedByPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartnerClient {
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
  division: RetailerTagDataSubZoneManagerInsertedByPartnerClientDivision;
  district: RetailerTagDataSubZoneManagerInsertedByPartnerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerInsertedByPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerInsertedByPartner {
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
  division: RetailerTagDataSubZoneManagerInsertedByPartnerDivision;
  district: RetailerTagDataSubZoneManagerInsertedByPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataSubZoneManagerInsertedByPartnerParent;
  client: RetailerTagDataSubZoneManagerInsertedByPartnerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerInsertedByParentPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByParentPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByParentPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataSubZoneManagerInsertedByParentPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataSubZoneManagerInsertedByParentPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataSubZoneManagerInsertedByParentPartner {
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
  division: RetailerTagDataSubZoneManagerInsertedByParentPartnerDivision;
  district: RetailerTagDataSubZoneManagerInsertedByParentPartnerDistrict;
  credits: number;
  radiusIp: RetailerTagDataSubZoneManagerInsertedByParentPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataSubZoneManagerInsertedBy {
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
  partner: RetailerTagDataSubZoneManagerInsertedByPartner;
  parentPartnerId: string;
  parentPartner: RetailerTagDataSubZoneManagerInsertedByParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface RetailerTagDataSubZoneManager {
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
  division: RetailerTagDataSubZoneManagerDivision;
  districtId: string;
  district: RetailerTagDataSubZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: RetailerTagDataSubZoneManagerParent;
  clientId: string;
  client: RetailerTagDataSubZoneManagerClient;
  zoneManagerId: string;
  zoneManager: RetailerTagDataSubZoneManagerZoneManager;
  isActive: boolean;
  insertedBy: RetailerTagDataSubZoneManagerInsertedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataPartnerParent {
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
  division: RetailerTagDataPartnerParentDivision;
  district: RetailerTagDataPartnerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataPartnerClient {
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
  division: RetailerTagDataPartnerClientDivision;
  district: RetailerTagDataPartnerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerInsertedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerInsertedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerInsertedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerInsertedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerInsertedByPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataPartnerInsertedByPartner {
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
  division: RetailerTagDataPartnerInsertedByPartnerDivision;
  district: RetailerTagDataPartnerInsertedByPartnerDistrict;
  credits: number;
  radiusIp: RetailerTagDataPartnerInsertedByPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerInsertedBy {
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
  partner: RetailerTagDataPartnerInsertedByPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface RetailerTagDataPartnerEditedByPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerEditedByPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerParentDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerEditedByPartnerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataPartnerEditedByPartnerParent {
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
  division: RetailerTagDataPartnerEditedByPartnerParentDivision;
  district: RetailerTagDataPartnerEditedByPartnerParentDistrict;
  credits: number;
  radiusIp: RetailerTagDataPartnerEditedByPartnerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerEditedByPartnerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerClientDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerEditedByPartnerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByPartnerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataPartnerEditedByPartnerClient {
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
  division: RetailerTagDataPartnerEditedByPartnerClientDivision;
  district: RetailerTagDataPartnerEditedByPartnerClientDistrict;
  credits: number;
  radiusIp: RetailerTagDataPartnerEditedByPartnerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerEditedByPartner {
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
  division: RetailerTagDataPartnerEditedByPartnerDivision;
  district: RetailerTagDataPartnerEditedByPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: RetailerTagDataPartnerEditedByPartnerParent;
  client: RetailerTagDataPartnerEditedByPartnerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerEditedByParentPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByParentPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByParentPartnerDistrict {
  createdOn: number;
  id: string;
  division: RetailerTagDataPartnerEditedByParentPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface RetailerTagDataPartnerEditedByParentPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface RetailerTagDataPartnerEditedByParentPartner {
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
  division: RetailerTagDataPartnerEditedByParentPartnerDivision;
  district: RetailerTagDataPartnerEditedByParentPartnerDistrict;
  credits: number;
  radiusIp: RetailerTagDataPartnerEditedByParentPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface RetailerTagDataPartnerEditedBy {
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
  partner: RetailerTagDataPartnerEditedByPartner;
  parentPartnerId: string;
  parentPartner: RetailerTagDataPartnerEditedByParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
export interface RetailerTagDataPartner {
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
  division: RetailerTagDataPartnerDivision;
  districtId: string;
  district: RetailerTagDataPartnerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: RetailerTagDataPartnerParent;
  clientId: string;
  client: RetailerTagDataPartnerClient;
  isActive: boolean;
  insertedBy: RetailerTagDataPartnerInsertedBy;
  editedBy: RetailerTagDataPartnerEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
