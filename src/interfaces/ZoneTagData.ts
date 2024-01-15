export interface ZoneTagData {
  createdOn: number;
  updatedOn: number;
  id: string;
  pricingPlanId: string;
  pricingPlan: PricingPlan;
  type: string;
  serialFrom: string;
  serialTo: string;
  quantity: number;
  clientId: string;
  client: Client;
  zoneManagerId: string;
  zoneManager: ZoneManager;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
}
interface ZoneManager {
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
  division: Division;
  districtId: string;
  district: District;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: Parent;
  clientId: string;
  client: Parent;
  isActive: boolean;
  insertedBy: InsertedBy2;
  editedBy: EditedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
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
  isMasterUser: boolean;
  partnerId: string;
  partner: Partner;
  parentPartnerId: string;
  parentPartner: Parent;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
interface Partner {
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
  division: Division;
  district: District;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent;
  client: Parent;
  isActive: boolean;
  wsdCommission: number;
}
interface InsertedBy2 {
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
  partner: Parent;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}
interface Parent {
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
  division: Division;
  district: District;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
  wsdCommission: number;
}
interface Client {
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
  division: Division;
  districtId: string;
  district: District;
  credits: number;
  radiusIp: RadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: InsertedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
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
interface RadiusIp {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
interface District {
  createdOn: number;
  id: string;
  division: Division;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}
interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}
interface PricingPlan {
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
