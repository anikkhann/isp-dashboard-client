export interface DurjoyRequisitionData {
  createdOn: number;
  updatedOn: number;
  id: string;
  requisitionNo: string;
  date: number;
  totalAmount: number;
  payableAmount: number;
  paymentStatus: string;
  status: string;
  statusChangedById: string;
  statusChangedBy: DurjoyRequisitionDataStatusChangedBy;
  statusChangedDate: number;
  expireDate: number;
  paymentType: string;
  deliveryType: string;
  deliveryName: string;
  deliveryAddress: string;
  deliveryContact: string;
  clientId: string;
  client: DurjoyRequisitionDataClient;
  attachment: string;
}
export interface DurjoyRequisitionDataStatusChangedBy {
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
export interface DurjoyRequisitionDataClientDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface DurjoyRequisitionDataClientDistrictDivision {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
export interface DurjoyRequisitionDataClientDistrict {
  createdOn: number;
  id: string;
  division: DurjoyRequisitionDataClientDistrictDivision;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
export interface DurjoyRequisitionDataClientRadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
export interface DurjoyRequisitionDataClientInsertedBy {
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
export interface DurjoyRequisitionDataClientEditedBy {
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
export interface DurjoyRequisitionDataClient {
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
  division: DurjoyRequisitionDataClientDivision;
  districtId: string;
  district: DurjoyRequisitionDataClientDistrict;
  credits: number;
  radiusIp: DurjoyRequisitionDataClientRadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: DurjoyRequisitionDataClientInsertedBy;
  editedBy: DurjoyRequisitionDataClientEditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}
