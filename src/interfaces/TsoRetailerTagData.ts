export interface TsoRetailerTagData {
  createdOn: number;
  updatedOn: number;
  id: string;
  tsoId: string;
  tso: TsoRetailerTagTso;
  clientId: string;
  client: TsoRetailerTagClient;
  zoneManagerId: string;
  zoneManager: TsoRetailerTagZoneManager;
  subZoneManagerId: string;
  subZoneManager: TsoRetailerTagSubZoneManager;
  retailerId: string;
  retailer: TsoRetailerTagRetailer;
  areaManagerTag: TsoRetailerTagAreaManagerTag;
}
export interface TsoRetailerTagTsoSalesManager {
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
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
}
export interface TsoRetailerTagTsoAreaManagerSalesManager {
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
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
}
export interface TsoRetailerTagTsoAreaManager {
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
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
  salesManager: TsoRetailerTagTsoAreaManagerSalesManager;
}
export interface TsoRetailerTagTso {
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
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
  salesManager: TsoRetailerTagTsoSalesManager;
  areaManager: TsoRetailerTagTsoAreaManager;
}
export interface TsoRetailerTagClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagClient {
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
  division: TsoRetailerTagClientDivision;
  district: TsoRetailerTagClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagZoneManagerParent {
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
  division: TsoRetailerTagZoneManagerParentDivision;
  district: TsoRetailerTagZoneManagerParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagZoneManagerClient {
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
  division: TsoRetailerTagZoneManagerClientDivision;
  district: TsoRetailerTagZoneManagerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagZoneManager {
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
  division: TsoRetailerTagZoneManagerDivision;
  district: TsoRetailerTagZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagZoneManagerParent;
  client: TsoRetailerTagZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagSubZoneManagerParentParent {
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
  division: TsoRetailerTagSubZoneManagerParentParentDivision;
  district: TsoRetailerTagSubZoneManagerParentParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagSubZoneManagerParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManagerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagSubZoneManagerParentClient {
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
  division: TsoRetailerTagSubZoneManagerParentClientDivision;
  district: TsoRetailerTagSubZoneManagerParentClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagSubZoneManagerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManagerParent {
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
  division: TsoRetailerTagSubZoneManagerParentDivision;
  district: TsoRetailerTagSubZoneManagerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagSubZoneManagerParentParent;
  client: TsoRetailerTagSubZoneManagerParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagSubZoneManagerClient {
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
  division: TsoRetailerTagSubZoneManagerClientDivision;
  district: TsoRetailerTagSubZoneManagerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagSubZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerParent {
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
  division: TsoRetailerTagSubZoneManagerZoneManagerParentDivision;
  district: TsoRetailerTagSubZoneManagerZoneManagerParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagSubZoneManagerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagSubZoneManagerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagSubZoneManagerZoneManagerClient {
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
  division: TsoRetailerTagSubZoneManagerZoneManagerClientDivision;
  district: TsoRetailerTagSubZoneManagerZoneManagerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagSubZoneManagerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManagerZoneManager {
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
  division: TsoRetailerTagSubZoneManagerZoneManagerDivision;
  district: TsoRetailerTagSubZoneManagerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagSubZoneManagerZoneManagerParent;
  client: TsoRetailerTagSubZoneManagerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagSubZoneManager {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: TsoRetailerTagSubZoneManagerDivision;
  district: TsoRetailerTagSubZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagSubZoneManagerParent;
  client: TsoRetailerTagSubZoneManagerClient;
  zoneManager: TsoRetailerTagSubZoneManagerZoneManager;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerParentParentParent {
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
  division: TsoRetailerTagRetailerParentParentParentDivision;
  district: TsoRetailerTagRetailerParentParentParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerParentParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerParentParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerParentParentClient {
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
  division: TsoRetailerTagRetailerParentParentClientDivision;
  district: TsoRetailerTagRetailerParentParentClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerParentParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerParentParent {
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
  division: TsoRetailerTagRetailerParentParentDivision;
  district: TsoRetailerTagRetailerParentParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerParentParentParent;
  client: TsoRetailerTagRetailerParentParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerParentClient {
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
  division: TsoRetailerTagRetailerParentClientDivision;
  district: TsoRetailerTagRetailerParentClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerParentZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerParentZoneManagerParent {
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
  division: TsoRetailerTagRetailerParentZoneManagerParentDivision;
  district: TsoRetailerTagRetailerParentZoneManagerParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerParentZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerParentZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerParentZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerParentZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerParentZoneManagerClient {
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
  division: TsoRetailerTagRetailerParentZoneManagerClientDivision;
  district: TsoRetailerTagRetailerParentZoneManagerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerParentZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerParentZoneManager {
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
  division: TsoRetailerTagRetailerParentZoneManagerDivision;
  district: TsoRetailerTagRetailerParentZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerParentZoneManagerParent;
  client: TsoRetailerTagRetailerParentZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerParent {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: TsoRetailerTagRetailerParentDivision;
  district: TsoRetailerTagRetailerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerParentParent;
  client: TsoRetailerTagRetailerParentClient;
  zoneManager: TsoRetailerTagRetailerParentZoneManager;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerClient {
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
  division: TsoRetailerTagRetailerClientDivision;
  district: TsoRetailerTagRetailerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerZoneManagerParent {
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
  division: TsoRetailerTagRetailerZoneManagerParentDivision;
  district: TsoRetailerTagRetailerZoneManagerParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerZoneManagerClient {
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
  division: TsoRetailerTagRetailerZoneManagerClientDivision;
  district: TsoRetailerTagRetailerZoneManagerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerZoneManager {
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
  division: TsoRetailerTagRetailerZoneManagerDivision;
  district: TsoRetailerTagRetailerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerZoneManagerParent;
  client: TsoRetailerTagRetailerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerParentParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentParent {
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
  division: TsoRetailerTagRetailerSubZoneManagerParentParentDivision;
  district: TsoRetailerTagRetailerSubZoneManagerParentParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerSubZoneManagerParentParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerParentClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerSubZoneManagerParentClient {
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
  division: TsoRetailerTagRetailerSubZoneManagerParentClientDivision;
  district: TsoRetailerTagRetailerSubZoneManagerParentClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerSubZoneManagerParentClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManagerParent {
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
  division: TsoRetailerTagRetailerSubZoneManagerParentDivision;
  district: TsoRetailerTagRetailerSubZoneManagerParentDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerSubZoneManagerParentParent;
  client: TsoRetailerTagRetailerSubZoneManagerParentClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerSubZoneManagerClient {
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
  division: TsoRetailerTagRetailerSubZoneManagerClientDivision;
  district: TsoRetailerTagRetailerSubZoneManagerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerSubZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerParent {
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
  division: TsoRetailerTagRetailerSubZoneManagerZoneManagerParentDivision;
  district: TsoRetailerTagRetailerSubZoneManagerZoneManagerParentDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerSubZoneManagerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagRetailerSubZoneManagerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManagerClient {
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
  division: TsoRetailerTagRetailerSubZoneManagerZoneManagerClientDivision;
  district: TsoRetailerTagRetailerSubZoneManagerZoneManagerClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagRetailerSubZoneManagerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManagerZoneManager {
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
  division: TsoRetailerTagRetailerSubZoneManagerZoneManagerDivision;
  district: TsoRetailerTagRetailerSubZoneManagerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerSubZoneManagerZoneManagerParent;
  client: TsoRetailerTagRetailerSubZoneManagerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailerSubZoneManager {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: TsoRetailerTagRetailerSubZoneManagerDivision;
  district: TsoRetailerTagRetailerSubZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerSubZoneManagerParent;
  client: TsoRetailerTagRetailerSubZoneManagerClient;
  zoneManager: TsoRetailerTagRetailerSubZoneManagerZoneManager;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagRetailer {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: TsoRetailerTagRetailerDivision;
  district: TsoRetailerTagRetailerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: TsoRetailerTagRetailerParent;
  client: TsoRetailerTagRetailerClient;
  zoneManager: TsoRetailerTagRetailerZoneManager;
  subZoneManager: TsoRetailerTagRetailerSubZoneManager;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagAreaManagerTagAreaManagerSalesManager {
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
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
}
export interface TsoRetailerTagAreaManagerTagAreaManager {
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
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
  salesManager: TsoRetailerTagAreaManagerTagAreaManagerSalesManager;
}
export interface TsoRetailerTagAreaManagerTagClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagAreaManagerTagClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface TsoRetailerTagAreaManagerTagClientDistrict {
  createdOn: number;
  id: string;
  division: TsoRetailerTagAreaManagerTagClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface TsoRetailerTagAreaManagerTagClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface TsoRetailerTagAreaManagerTagClient {
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
  division: TsoRetailerTagAreaManagerTagClientDivision;
  district: TsoRetailerTagAreaManagerTagClientDistrict;
  credits: number;
  radiusIp: TsoRetailerTagAreaManagerTagClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface TsoRetailerTagAreaManagerTag {
  createdOn: number;
  id: string;
  areaManager: TsoRetailerTagAreaManagerTagAreaManager;
  client: TsoRetailerTagAreaManagerTagClient;
  isAssignedAllZone: boolean;
  displayName: string;
}
