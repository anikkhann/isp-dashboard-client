export interface UsedVoucherData {
  createdOn: number;
  retailer: string;
  package: string;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  updatedOn: number;
  id: string;
  clientCardRequisitionId: string;
  clientCardRequisition: ClientCardRequisition;
  pricingPlanId: string;
  pricingPlan: PricingPlan;
  packagePrice: number;
  serialNo: string;
  voucherNumber: string;
  referenceNumber: string;
  usedTime: number;
  usedById: string;
  usedBy: UsedBy;
  usedIp: string;
  usedMac: string;
  client: Client;
  clientId: string;
  subZoneManager: SubZoneManager;
  zoneManager: ZoneManager;
  subZoneManagerId: string;
}

export interface ClientCardRequisition {
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
  statusChangedDate: number;
  expireDate: number;
  adminNote: string;
  clientNote: string;
  paymentType: string;
  deliveryType: string;
  deliveryName: string;
  deliveryAddress: string;
  deliveryContact: string;
  clientId: string;
  zoneManagerId: string;
  subZoneManagerId: string;
}

export interface PricingPlan {
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

export interface UsedBy {
  createdOn: number;
  id: string;
  customer: Customer;
  clientId: string;
  activePricingPlan: ActivePricingPlan;
  dataRate: number;
  dataRateUnit: string;
  expirationTime: number;
  otp: string;
  radCheckId: number;
  radiusUsername: string;
  radiusPassword: string;
  mac: string;
  lastActivatedBy: string;
  lastIpAddress: string;
}

export interface Customer {
  createdOn: number;
  id: string;
  name: string;
  phone: string;
  dateOfBirth: number;
  professionId: string;
  gender: string;
  lastActive: number;
  status: string;
  isBonusRedeemed: boolean;
}

export interface ActivePricingPlan {
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
  divisionId: string;
  division: Division;
  districtId: string;
  district: District;
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
  wsdCommission: number;
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
  division: Division2;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division2 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
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

export interface SubZoneManager {
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
  division: Division3;
  districtId: string;
  district: District2;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: Parent;
  clientId: string;
  client: Client3;
  zoneManagerId: string;
  zoneManager: ZoneManager;
  isActive: boolean;
  insertedBy: InsertedBy2;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}

export interface Division3 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District2 {
  createdOn: number;
  id: string;
  division: Division4;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division4 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent {
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
  division: Division5;
  district: District3;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent2;
  client: Client2;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division5 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District3 {
  createdOn: number;
  id: string;
  division: Division6;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division6 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent2 {
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
  division: Division7;
  district: District4;
  credits: number;
  radiusIp: RadiusIp2;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division7 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District4 {
  createdOn: number;
  id: string;
  division: Division8;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division8 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp2 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client2 {
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
  division: Division9;
  district: District5;
  credits: number;
  radiusIp: RadiusIp3;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division9 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District5 {
  createdOn: number;
  id: string;
  division: Division10;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division10 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp3 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client3 {
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
  division: Division11;
  district: District6;
  credits: number;
  radiusIp: RadiusIp4;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division11 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District6 {
  createdOn: number;
  id: string;
  division: Division12;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division12 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp4 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager {
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
  division: Division13;
  district: District7;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent3;
  client: Client4;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division13 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District7 {
  createdOn: number;
  id: string;
  division: Division14;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division14 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent3 {
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
  division: Division15;
  district: District8;
  credits: number;
  radiusIp: RadiusIp5;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division15 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District8 {
  createdOn: number;
  id: string;
  division: Division16;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division16 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp5 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client4 {
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
  division: Division17;
  district: District9;
  credits: number;
  radiusIp: RadiusIp6;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division17 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District9 {
  createdOn: number;
  id: string;
  division: Division18;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division18 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp6 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface InsertedBy2 {
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
  parentPartner: ParentPartner;
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
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division19;
  district: District10;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent4;
  client: Client5;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division19 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District10 {
  createdOn: number;
  id: string;
  division: Division20;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division20 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent4 {
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
  division: Division21;
  district: District11;
  credits: number;
  radiusIp: RadiusIp7;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division21 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District11 {
  createdOn: number;
  id: string;
  division: Division22;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division22 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp7 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client5 {
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
  division: Division23;
  district: District12;
  credits: number;
  radiusIp: RadiusIp8;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division23 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District12 {
  createdOn: number;
  id: string;
  division: Division24;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division24 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp8 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ParentPartner {
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
  division: Division25;
  district: District13;
  credits: number;
  radiusIp: RadiusIp9;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division25 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District13 {
  createdOn: number;
  id: string;
  division: Division26;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division26 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp9 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
