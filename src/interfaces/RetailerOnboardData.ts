export interface RetailerOnboardData {
  createdOn: number;
  username: string;
  updatedOn: number;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  nidNo: string;
  wsdCommission: number;
  division: Division;
  divisionId: string;
  district: District;
  districtId: string;
  upazilla: Upazilla;
  upazillaId: string;
  union: Union;
  unionId: string;
  bkashNumber: string;
  nagadNumber: string;
  latitude: string;
  longitude: string;
  tsoComment: string;
  status: string;
  tso: Tso;
  tsoId: string;
  areaManager: AreaManager2;
  areaManagerId: string;
  subZoneManager: SubZoneManager;
  subZoneManagerId: string;
  statusChangedById: string;
  statusChangedBy: StatusChangedBy;
  generatedUsername: string;
  generatedPassword: string;
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
  divisionId: string;
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

export interface Upazilla {
  createdOn: number;
  id: string;
  district: District2;
  districtId: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District2 {
  createdOn: number;
  id: string;
  division: Division3;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division3 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Union {
  createdOn: number;
  id: string;
  upazilla: Upazilla2;
  upazillaId: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Upazilla2 {
  createdOn: number;
  id: string;
  district: District3;
  name: string;
  bnName: string;
  url: string;
}

export interface District3 {
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

export interface Tso {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
  salesManager: SalesManager;
  salesManagerId: string;
  areaManager: AreaManager;
  areaManagerId: string;
}

export interface SalesManager {
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

export interface AreaManager {
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
  salesManager: SalesManager2;
}

export interface SalesManager2 {
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

export interface AreaManager2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
  salesManager: SalesManager3;
  salesManagerId: string;
}

export interface SalesManager3 {
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
  division: Division5;
  districtId: string;
  district: District4;
  salesDistributionCommission: number;
  credits: number;
  parentId: string;
  parent: Parent;
  clientId: string;
  client: Client2;
  zoneManagerId: string;
  zoneManager: ZoneManager;
  isActive: boolean;
  insertedBy: InsertedBy;
  totalCustomer: number;
  activeCustomer: number;
  registeredCustomer: number;
  expiredCustomer: number;
  wsdCommission: number;
}

export interface Division5 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District4 {
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
  division: Division7;
  district: District5;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent2;
  client: Client;
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

export interface District5 {
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
  division: Division9;
  district: District6;
  credits: number;
  radiusIp: RadiusIp;
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

export interface District6 {
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
  division: Division11;
  district: District7;
  credits: number;
  radiusIp: RadiusIp2;
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

export interface District7 {
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
  division: Division13;
  district: District8;
  credits: number;
  radiusIp: RadiusIp3;
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

export interface District8 {
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

export interface RadiusIp3 {
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
  division: Division15;
  district: District9;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent3;
  client: Client3;
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

export interface District9 {
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
  division: Division17;
  district: District10;
  credits: number;
  radiusIp: RadiusIp4;
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

export interface District10 {
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

export interface RadiusIp4 {
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
  division: Division19;
  district: District11;
  credits: number;
  radiusIp: RadiusIp5;
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

export interface District11 {
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

export interface RadiusIp5 {
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
  division: Division21;
  district: District12;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent4;
  client: Client4;
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

export interface District12 {
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
  division: Division23;
  district: District13;
  credits: number;
  radiusIp: RadiusIp6;
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

export interface District13 {
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

export interface RadiusIp6 {
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
  division: Division25;
  district: District14;
  credits: number;
  radiusIp: RadiusIp7;
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

export interface District14 {
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

export interface RadiusIp7 {
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
  division: Division27;
  district: District15;
  credits: number;
  radiusIp: RadiusIp8;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division27 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District15 {
  createdOn: number;
  id: string;
  division: Division28;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division28 {
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

export interface StatusChangedBy {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  isMasterUser: boolean;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  userCategory: string;
}
