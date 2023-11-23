export interface SurveyReportData {
  createdOn: number;
  id: string;
  question: string;
  answer: string;
  customer: SurveyReportDataCustomer;
  customerId: string;
  partner: SurveyReportDataPartner;
  partnerId: string;
}
export interface SurveyReportDataCustomerCustomerTypePartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerCustomerTypePartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerCustomerTypePartnerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerCustomerTypePartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerCustomerTypePartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerCustomerTypePartner {
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
  division: SurveyReportDataCustomerCustomerTypePartnerDivision;
  district: SurveyReportDataCustomerCustomerTypePartnerDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerCustomerTypePartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerCustomerType {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: SurveyReportDataCustomerCustomerTypePartner;
  title: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerUpazillaDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerUpazillaDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerUpazillaDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerUpazilla {
  createdOn: number;
  id: string;
  district: SurveyReportDataCustomerUpazillaDistrict;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerUnionUpazillaDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerUnionUpazillaDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerUnionUpazillaDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerUnionUpazilla {
  createdOn: number;
  id: string;
  district: SurveyReportDataCustomerUnionUpazillaDistrict;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerUnion {
  createdOn: number;
  id: string;
  upazilla: SurveyReportDataCustomerUnionUpazilla;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerCustomerPackagePartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerCustomerPackagePartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerCustomerPackagePartnerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerCustomerPackagePartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerCustomerPackagePartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerCustomerPackagePartner {
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
  division: SurveyReportDataCustomerCustomerPackagePartnerDivision;
  district: SurveyReportDataCustomerCustomerPackagePartnerDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerCustomerPackagePartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerCustomerPackage {
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
  partner: SurveyReportDataCustomerCustomerPackagePartner;
  isActive: boolean;
}
export interface SurveyReportDataCustomerDistributionZonePartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionZonePartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionZonePartnerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerDistributionZonePartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionZonePartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerDistributionZonePartner {
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
  division: SurveyReportDataCustomerDistributionZonePartnerDivision;
  district: SurveyReportDataCustomerDistributionZonePartnerDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerDistributionZonePartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerDistributionZone {
  createdOn: number;
  id: string;
  partner: SurveyReportDataCustomerDistributionZonePartner;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerDistributionPopPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionPopPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionPopPartnerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerDistributionPopPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionPopPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerDistributionPopPartner {
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
  division: SurveyReportDataCustomerDistributionPopPartnerDivision;
  district: SurveyReportDataCustomerDistributionPopPartnerDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerDistributionPopPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerDistributionPopZonePartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionPopZonePartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionPopZonePartnerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerDistributionPopZonePartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerDistributionPopZonePartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerDistributionPopZonePartner {
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
  division: SurveyReportDataCustomerDistributionPopZonePartnerDivision;
  district: SurveyReportDataCustomerDistributionPopZonePartnerDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerDistributionPopZonePartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerDistributionPopZone {
  createdOn: number;
  id: string;
  partner: SurveyReportDataCustomerDistributionPopZonePartner;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerDistributionPop {
  createdOn: number;
  id: string;
  partner: SurveyReportDataCustomerDistributionPopPartner;
  zone: SurveyReportDataCustomerDistributionPopZone;
  name: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerPartnerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerPartner {
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
  division: SurveyReportDataCustomerPartnerDivision;
  district: SurveyReportDataCustomerPartnerDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerZoneManagerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerZoneManagerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerParentDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerParentDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerParentDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerZoneManagerParentDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerParentRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerZoneManagerParent {
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
  division: SurveyReportDataCustomerZoneManagerParentDivision;
  district: SurveyReportDataCustomerZoneManagerParentDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerZoneManagerParentRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerZoneManagerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerClientDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerZoneManagerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerZoneManagerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerZoneManagerClient {
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
  division: SurveyReportDataCustomerZoneManagerClientDivision;
  district: SurveyReportDataCustomerZoneManagerClientDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerZoneManagerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerZoneManager {
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
  division: SurveyReportDataCustomerZoneManagerDivision;
  district: SurveyReportDataCustomerZoneManagerDistrict;
  salesDistributionCommission: number;
  credits: number;
  parent: SurveyReportDataCustomerZoneManagerParent;
  client: SurveyReportDataCustomerZoneManagerClient;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomerClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataCustomerClientDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataCustomerClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataCustomerClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataCustomerClient {
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
  division: SurveyReportDataCustomerClientDivision;
  district: SurveyReportDataCustomerClientDistrict;
  credits: number;
  radiusIp: SurveyReportDataCustomerClientRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
export interface SurveyReportDataCustomer {
  createdOn: number;
  updatedOn: number;
  id: string;
  customerId: string;
  name: string;
  username: string;
  password: string;
  panelPassword: string;
  customerType: SurveyReportDataCustomerCustomerType;
  mobileNo: string;
  email: string;
  contactPerson: string;
  contactNumber: string;
  connectionAddress: string;
  houseNo: string;
  roadNo: string;
  area: string;
  identityType: string;
  identityNo: string;
  division: SurveyReportDataCustomerDivision;
  district: SurveyReportDataCustomerDistrict;
  upazilla: SurveyReportDataCustomerUpazilla;
  union: SurveyReportDataCustomerUnion;
  customerPackage: SurveyReportDataCustomerCustomerPackage;
  distributionZone: SurveyReportDataCustomerDistributionZone;
  distributionPop: SurveyReportDataCustomerDistributionPop;
  isMacBound: boolean;
  mac: string;
  simultaneousUser: number;
  ipMode: string;
  expirationTime: number;
  credits: number;
  autoRenew: boolean;
  discount: number;
  smsAlert: boolean;
  emailAlert: boolean;
  partner: SurveyReportDataCustomerPartner;
  zoneManager: SurveyReportDataCustomerZoneManager;
  client: SurveyReportDataCustomerClient;
  isActive: boolean;
  isSafOtpSend: boolean;
  isSafVerified: boolean;
  isSafOtpVerified: boolean;
  adjustmentDay: number;
}
export interface SurveyReportDataPartnerDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataPartnerDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface SurveyReportDataPartnerDistrict {
  createdOn: number;
  id: string;
  division: SurveyReportDataPartnerDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface SurveyReportDataPartnerRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface SurveyReportDataPartner {
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
  division: SurveyReportDataPartnerDivision;
  district: SurveyReportDataPartnerDistrict;
  credits: number;
  radiusIp: SurveyReportDataPartnerRadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
