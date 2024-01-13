export interface SubZoneRevenueDisbursement {
  createdOn: number;
  updatedOn: number;
  id: string;
  client: Client;
  clientId: string;
  zoneManager: ZoneManager;
  zoneManagerId: string;
  subZoneManager: SubZoneManager;
  subZoneManagerId: string;
  amount: number;
  note: string;
  childNote: string;
  status: string;
  statusUpdatedBy: StatusUpdatedBy;
  statusUpdatedById: string;
  statusUpdatedTime: number;
  partner: Partner2;
  partnerId: string;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
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
  division: Division;
  district: District;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
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
  division: Division3;
  district: District2;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent;
  client: Client2;
  isActive: boolean;
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
  clientLevel: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division5;
  district: District3;
  credits: number;
  radiusIp: RadiusIp2;
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
  division: Division7;
  district: District4;
  credits: number;
  radiusIp: RadiusIp3;
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

export interface RadiusIp3 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
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
  division: Division9;
  district: District5;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent2;
  client: Client4;
  zoneManager: ZoneManager2;
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

export interface Parent2 {
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
  division: Division11;
  district: District6;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent3;
  client: Client3;
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
  division: Division13;
  district: District7;
  credits: number;
  radiusIp: RadiusIp4;
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

export interface ZoneManager2 {
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

export interface StatusUpdatedBy {
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
  parentPartner: ParentPartner;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  client: Client7;
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
  division: Division25;
  district: District13;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent5;
  client: Client6;
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

export interface Parent5 {
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
  district: District14;
  credits: number;
  radiusIp: RadiusIp9;
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

export interface District14 {
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

export interface RadiusIp9 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client6 {
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
  division: Division29;
  district: District15;
  credits: number;
  radiusIp: RadiusIp10;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division29 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District15 {
  createdOn: number;
  id: string;
  division: Division30;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division30 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp10 {
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
  division: Division31;
  district: District16;
  credits: number;
  radiusIp: RadiusIp11;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division31 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District16 {
  createdOn: number;
  id: string;
  division: Division32;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division32 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp11 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client7 {
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
  division: Division33;
  district: District17;
  credits: number;
  radiusIp: RadiusIp12;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division33 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District17 {
  createdOn: number;
  id: string;
  division: Division34;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division34 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp12 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Partner2 {
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
  division: Division35;
  district: District18;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent6;
  client: Client8;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division35 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District18 {
  createdOn: number;
  id: string;
  division: Division36;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division36 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent6 {
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
  division: Division37;
  district: District19;
  credits: number;
  radiusIp: RadiusIp13;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division37 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District19 {
  createdOn: number;
  id: string;
  division: Division38;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division38 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp13 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client8 {
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
  division: Division39;
  district: District20;
  credits: number;
  radiusIp: RadiusIp14;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division39 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District20 {
  createdOn: number;
  id: string;
  division: Division40;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division40 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp14 {
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
  partner: Partner3;
  parentPartnerId: string;
  parentPartner: ParentPartner2;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  client: Client10;
}

export interface Partner3 {
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
  division: Division41;
  district: District21;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent7;
  client: Client9;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division41 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District21 {
  createdOn: number;
  id: string;
  division: Division42;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division42 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent7 {
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
  division: Division43;
  district: District22;
  credits: number;
  radiusIp: RadiusIp15;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division43 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District22 {
  createdOn: number;
  id: string;
  division: Division44;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division44 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp15 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client9 {
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
  division: Division45;
  district: District23;
  credits: number;
  radiusIp: RadiusIp16;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division45 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District23 {
  createdOn: number;
  id: string;
  division: Division46;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division46 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp16 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ParentPartner2 {
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
  division: Division47;
  district: District24;
  credits: number;
  radiusIp: RadiusIp17;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division47 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District24 {
  createdOn: number;
  id: string;
  division: Division48;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division48 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp17 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client10 {
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
  division: Division49;
  district: District25;
  credits: number;
  radiusIp: RadiusIp18;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division49 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District25 {
  createdOn: number;
  id: string;
  division: Division50;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division50 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp18 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
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
  isMasterUser: boolean;
  partnerId: string;
  partner: Partner4;
  parentPartnerId: string;
  parentPartner: ParentPartner3;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
  client: Client12;
}

export interface Partner4 {
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
  division: Division51;
  district: District26;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent8;
  client: Client11;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division51 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District26 {
  createdOn: number;
  id: string;
  division: Division52;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division52 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent8 {
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
  division: Division53;
  district: District27;
  credits: number;
  radiusIp: RadiusIp19;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division53 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District27 {
  createdOn: number;
  id: string;
  division: Division54;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division54 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp19 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client11 {
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
  division: Division55;
  district: District28;
  credits: number;
  radiusIp: RadiusIp20;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division55 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District28 {
  createdOn: number;
  id: string;
  division: Division56;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division56 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp20 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ParentPartner3 {
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
  division: Division57;
  district: District29;
  credits: number;
  radiusIp: RadiusIp21;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division57 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District29 {
  createdOn: number;
  id: string;
  division: Division58;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division58 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp21 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client12 {
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
  division: Division59;
  district: District30;
  credits: number;
  radiusIp: RadiusIp22;
  isActive: boolean;
  wsdCommission: number;
}

export interface Division59 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District30 {
  createdOn: number;
  id: string;
  division: Division60;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division60 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp22 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
