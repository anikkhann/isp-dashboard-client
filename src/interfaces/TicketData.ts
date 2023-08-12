import { ComplainTypeData } from "./ComplainTypeData";
import { CustomerData } from "./CustomerData";

export interface TicketData {
  createdOn: number;
  updatedOn: number;
  id: string;
  ticketNo: string;
  ticketCategory: string;
  customerId: string;
  customer: CustomerData;
  complainTypeId: string;
  complainType: ComplainTypeData;
  complainDetails: string;
  assignedToId: string;
  assignedTo: AssignedTo;
  status: string;
  rootCauseId: string;
  rootCause: RootCause;
  openedBy: OpenedBy;
  closedById: string;
  closedBy: ClosedBy;
  closedTime: number;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  client: Client;
  clientId: string;
  partner: Partner13;
  partnerId: string;
  attachment: string;
  checkList: string;
  isForSystemAdmin: boolean;
  ticketDetails: TicketDetail[];
}

export interface Customer {
  createdOn: number;
  updatedOn: number;
  id: string;
  customerId: string;
  name: string;
  username: string;
  password: string;
  customerType: CustomerType;
  mobileNo: string;
  email: string;
  contactPerson: string;
  contactNumber: string;
  connectionAddress: string;
  houseNo: string;
  area: string;
  identityType: string;
  identityNo: string;
  customerPackage: CustomerPackage;
  distributionZone: DistributionZone;
  distributionPop: DistributionPop;
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
  partner: Partner6;
  subZoneManager: SubZoneManager;
  zoneManager: ZoneManager2;
  retailer: Retailer;
  client: Client13;
  isActive: boolean;
  isSafVerified: boolean;
  adjustmentDay: number;
}

export interface CustomerType {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  title: string;
  isActive: boolean;
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
  altContactNumber: string;
  email: string;
  address: string;
  division: Division;
  district: District;
  credits: number;
  radiusIp: RadiusIp;
  isActive: boolean;
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

export interface CustomerPackage {
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
  partner: Partner2;
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
  altContactNumber: string;
  email: string;
  address: string;
  division: Division3;
  district: District2;
  credits: number;
  radiusIp: RadiusIp2;
  isActive: boolean;
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

export interface RadiusIp2 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface DistributionZone {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner3;
  name: string;
  isActive: boolean;
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
  altContactNumber: string;
  email: string;
  address: string;
  division: Division5;
  district: District3;
  credits: number;
  radiusIp: RadiusIp3;
  isActive: boolean;
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

export interface RadiusIp3 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface DistributionPop {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner4;
  zone: Zone;
  name: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
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
  altContactNumber: string;
  email: string;
  address: string;
  division: Division7;
  district: District4;
  credits: number;
  radiusIp: RadiusIp4;
  isActive: boolean;
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

export interface RadiusIp4 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Zone {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner5;
  name: string;
  isActive: boolean;
}

export interface Partner5 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  radiusIp: RadiusIp5;
  isActive: boolean;
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

export interface RadiusIp5 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Partner6 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  radiusIp: RadiusIp6;
  isActive: boolean;
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

export interface RadiusIp6 {
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
  division: Division13;
  district: District7;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent;
  client: Client2;
  zoneManager: ZoneManager;
  isActive: boolean;
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

export interface Parent {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division15;
  district: District8;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent2;
  client: Client;
  isActive: boolean;
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

export interface Parent2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  radiusIp: RadiusIp7;
  isActive: boolean;
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

export interface RadiusIp7 {
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
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division19;
  district: District10;
  credits: number;
  radiusIp: RadiusIp8;
  isActive: boolean;
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

export interface RadiusIp8 {
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
  radiusIp: RadiusIp9;
  isActive: boolean;
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

export interface RadiusIp9 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division23;
  district: District12;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent3;
  client: Client3;
  isActive: boolean;
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

export interface Parent3 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  radiusIp: RadiusIp10;
  isActive: boolean;
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

export interface RadiusIp10 {
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
  radiusIp: RadiusIp11;
  isActive: boolean;
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

export interface RadiusIp11 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager2 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division29;
  district: District15;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent4;
  client: Client4;
  isActive: boolean;
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

export interface Parent4 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  radiusIp: RadiusIp12;
  isActive: boolean;
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

export interface RadiusIp12 {
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
  radiusIp: RadiusIp13;
  isActive: boolean;
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

export interface RadiusIp13 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Retailer {
  createdOn: number;
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
  parent: Parent5;
  client: Client8;
  zoneManager: ZoneManager4;
  subZoneManager: SubZoneManager2;
  isActive: boolean;
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

export interface Parent5 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division37;
  district: District19;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent6;
  client: Client6;
  zoneManager: ZoneManager3;
  isActive: boolean;
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

export interface Parent6 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division39;
  district: District20;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent7;
  client: Client5;
  isActive: boolean;
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

export interface Parent7 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division41;
  district: District21;
  credits: number;
  radiusIp: RadiusIp14;
  isActive: boolean;
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

export interface RadiusIp14 {
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

export interface Client6 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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

export interface ZoneManager3 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division47;
  district: District24;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent8;
  client: Client7;
  isActive: boolean;
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

export interface Parent8 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  radiusIp: RadiusIp17;
  isActive: boolean;
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

export interface RadiusIp17 {
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
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division51;
  district: District26;
  credits: number;
  radiusIp: RadiusIp18;
  isActive: boolean;
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

export interface RadiusIp18 {
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

export interface ZoneManager4 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division55;
  district: District28;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent9;
  client: Client9;
  isActive: boolean;
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

export interface Parent9 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
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
  radiusIp: RadiusIp20;
  isActive: boolean;
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

export interface RadiusIp20 {
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
  radiusIp: RadiusIp21;
  isActive: boolean;
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

export interface RadiusIp21 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface SubZoneManager2 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division61;
  district: District31;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent10;
  client: Client11;
  zoneManager: ZoneManager5;
  isActive: boolean;
}

export interface Division61 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District31 {
  createdOn: number;
  id: string;
  division: Division62;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division62 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent10 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division63;
  district: District32;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent11;
  client: Client10;
  isActive: boolean;
}

export interface Division63 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District32 {
  createdOn: number;
  id: string;
  division: Division64;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division64 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent11 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division65;
  district: District33;
  credits: number;
  radiusIp: RadiusIp22;
  isActive: boolean;
}

export interface Division65 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District33 {
  createdOn: number;
  id: string;
  division: Division66;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division66 {
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

export interface Client10 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division67;
  district: District34;
  credits: number;
  radiusIp: RadiusIp23;
  isActive: boolean;
}

export interface Division67 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District34 {
  createdOn: number;
  id: string;
  division: Division68;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division68 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp23 {
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
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division69;
  district: District35;
  credits: number;
  radiusIp: RadiusIp24;
  isActive: boolean;
}

export interface Division69 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District35 {
  createdOn: number;
  id: string;
  division: Division70;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division70 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp24 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager5 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division71;
  district: District36;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent12;
  client: Client12;
  isActive: boolean;
}

export interface Division71 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District36 {
  createdOn: number;
  id: string;
  division: Division72;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division72 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent12 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division73;
  district: District37;
  credits: number;
  radiusIp: RadiusIp25;
  isActive: boolean;
}

export interface Division73 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District37 {
  createdOn: number;
  id: string;
  division: Division74;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division74 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp25 {
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
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division75;
  district: District38;
  credits: number;
  radiusIp: RadiusIp26;
  isActive: boolean;
}

export interface Division75 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District38 {
  createdOn: number;
  id: string;
  division: Division76;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division76 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp26 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client13 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division77;
  district: District39;
  credits: number;
  radiusIp: RadiusIp27;
  isActive: boolean;
}

export interface Division77 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District39 {
  createdOn: number;
  id: string;
  division: Division78;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division78 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp27 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ComplainType {
  createdOn: number;
  updatedOn: number;
  id: string;
  complainCategory: string;
  name: string;
  partner: Partner7;
  isActive: boolean;
}

export interface Partner7 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division79;
  district: District40;
  credits: number;
  radiusIp: RadiusIp28;
  isActive: boolean;
}

export interface Division79 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District40 {
  createdOn: number;
  id: string;
  division: Division80;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division80 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp28 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface AssignedTo {
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
  partner: Partner8;
  userType: string;
  credits: number;
}

export interface Partner8 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division81;
  district: District41;
  credits: number;
  radiusIp: RadiusIp29;
  isActive: boolean;
}

export interface Division81 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District41 {
  createdOn: number;
  id: string;
  division: Division82;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division82 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp29 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface RootCause {
  createdOn: number;
  id: string;
  rootCauseCategory: string;
  title: string;
  isActive: boolean;
}

export interface OpenedBy {
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
  partner: Partner9;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner9 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division83;
  district: District42;
  credits: number;
  radiusIp: RadiusIp30;
  isActive: boolean;
}

export interface Division83 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District42 {
  createdOn: number;
  id: string;
  division: Division84;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division84 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp30 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ClosedBy {
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
  partner: Partner10;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner10 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division85;
  district: District43;
  credits: number;
  radiusIp: RadiusIp31;
  isActive: boolean;
}

export interface Division85 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District43 {
  createdOn: number;
  id: string;
  division: Division86;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division86 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp31 {
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
  partner: Partner11;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner11 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division87;
  district: District44;
  credits: number;
  radiusIp: RadiusIp32;
  isActive: boolean;
}

export interface Division87 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District44 {
  createdOn: number;
  id: string;
  division: Division88;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division88 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp32 {
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
  partner: Partner12;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner12 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division89;
  district: District45;
  credits: number;
  radiusIp: RadiusIp33;
  isActive: boolean;
}

export interface Division89 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District45 {
  createdOn: number;
  id: string;
  division: Division90;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division90 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp33 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client14 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division91;
  district: District46;
  credits: number;
  radiusIp: RadiusIp34;
  isActive: boolean;
}

export interface Division91 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District46 {
  createdOn: number;
  id: string;
  division: Division92;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division92 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp34 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Partner13 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division93;
  district: District47;
  credits: number;
  radiusIp: RadiusIp35;
  isActive: boolean;
}

export interface Division93 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District47 {
  createdOn: number;
  id: string;
  division: Division94;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division94 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp35 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface TicketDetail {
  createdOn: number;
  id: string;
  ticket: Ticket;
  ticketId: string;
  subject: string;
  note: string;
  attachment?: string;
  replyBy: ReplyBy;
  replyById: string;
  insertedBy: InsertedBy2;
}

export interface Ticket {
  createdOn: number;
  updatedOn: number;
  id: string;
  ticketNo: string;
  ticketCategory: string;
  customer: Customer2;
  complainType: ComplainType2;
  complainDetails: string;
  assignedTo: AssignedTo2;
  status: string;
  rootCause: RootCause2;
  openedBy: OpenedBy2;
  closedBy: ClosedBy2;
  closedTime: number;
  client: Client28;
  partner: Partner24;
  attachment: string;
  checkList: string;
  isForSystemAdmin: boolean;
}

export interface Customer2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  customerId: string;
  name: string;
  username: string;
  password: string;
  customerType: CustomerType2;
  mobileNo: string;
  email: string;
  contactPerson: string;
  contactNumber: string;
  connectionAddress: string;
  houseNo: string;
  area: string;
  identityType: string;
  identityNo: string;
  customerPackage: CustomerPackage2;
  distributionZone: DistributionZone2;
  distributionPop: DistributionPop2;
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
  partner: Partner19;
  subZoneManager: SubZoneManager3;
  zoneManager: ZoneManager7;
  retailer: Retailer2;
  client: Client27;
  isActive: boolean;
  isSafVerified: boolean;
  adjustmentDay: number;
}

export interface CustomerType2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner14;
  title: string;
  isActive: boolean;
}

export interface Partner14 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division95;
  district: District48;
  credits: number;
  radiusIp: RadiusIp36;
  isActive: boolean;
}

export interface Division95 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District48 {
  createdOn: number;
  id: string;
  division: Division96;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division96 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp36 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface CustomerPackage2 {
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
  partner: Partner15;
  isActive: boolean;
}

export interface Partner15 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division97;
  district: District49;
  credits: number;
  radiusIp: RadiusIp37;
  isActive: boolean;
}

export interface Division97 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District49 {
  createdOn: number;
  id: string;
  division: Division98;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division98 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp37 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface DistributionZone2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner16;
  name: string;
  isActive: boolean;
}

export interface Partner16 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division99;
  district: District50;
  credits: number;
  radiusIp: RadiusIp38;
  isActive: boolean;
}

export interface Division99 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District50 {
  createdOn: number;
  id: string;
  division: Division100;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division100 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp38 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface DistributionPop2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner17;
  zone: Zone2;
  name: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
}

export interface Partner17 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division101;
  district: District51;
  credits: number;
  radiusIp: RadiusIp39;
  isActive: boolean;
}

export interface Division101 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District51 {
  createdOn: number;
  id: string;
  division: Division102;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division102 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp39 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Zone2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner18;
  name: string;
  isActive: boolean;
}

export interface Partner18 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division103;
  district: District52;
  credits: number;
  radiusIp: RadiusIp40;
  isActive: boolean;
}

export interface Division103 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District52 {
  createdOn: number;
  id: string;
  division: Division104;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division104 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp40 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Partner19 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division105;
  district: District53;
  credits: number;
  radiusIp: RadiusIp41;
  isActive: boolean;
}

export interface Division105 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District53 {
  createdOn: number;
  id: string;
  division: Division106;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division106 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp41 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface SubZoneManager3 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division107;
  district: District54;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent13;
  client: Client16;
  zoneManager: ZoneManager6;
  isActive: boolean;
}

export interface Division107 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District54 {
  createdOn: number;
  id: string;
  division: Division108;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division108 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent13 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division109;
  district: District55;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent14;
  client: Client15;
  isActive: boolean;
}

export interface Division109 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District55 {
  createdOn: number;
  id: string;
  division: Division110;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division110 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent14 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division111;
  district: District56;
  credits: number;
  radiusIp: RadiusIp42;
  isActive: boolean;
}

export interface Division111 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District56 {
  createdOn: number;
  id: string;
  division: Division112;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division112 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp42 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client15 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division113;
  district: District57;
  credits: number;
  radiusIp: RadiusIp43;
  isActive: boolean;
}

export interface Division113 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District57 {
  createdOn: number;
  id: string;
  division: Division114;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division114 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp43 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client16 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division115;
  district: District58;
  credits: number;
  radiusIp: RadiusIp44;
  isActive: boolean;
}

export interface Division115 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District58 {
  createdOn: number;
  id: string;
  division: Division116;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division116 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp44 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager6 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division117;
  district: District59;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent15;
  client: Client17;
  isActive: boolean;
}

export interface Division117 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District59 {
  createdOn: number;
  id: string;
  division: Division118;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division118 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent15 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division119;
  district: District60;
  credits: number;
  radiusIp: RadiusIp45;
  isActive: boolean;
}

export interface Division119 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District60 {
  createdOn: number;
  id: string;
  division: Division120;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division120 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp45 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client17 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division121;
  district: District61;
  credits: number;
  radiusIp: RadiusIp46;
  isActive: boolean;
}

export interface Division121 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District61 {
  createdOn: number;
  id: string;
  division: Division122;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division122 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp46 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager7 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division123;
  district: District62;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent16;
  client: Client18;
  isActive: boolean;
}

export interface Division123 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District62 {
  createdOn: number;
  id: string;
  division: Division124;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division124 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent16 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division125;
  district: District63;
  credits: number;
  radiusIp: RadiusIp47;
  isActive: boolean;
}

export interface Division125 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District63 {
  createdOn: number;
  id: string;
  division: Division126;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division126 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp47 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client18 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division127;
  district: District64;
  credits: number;
  radiusIp: RadiusIp48;
  isActive: boolean;
}

export interface Division127 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District64 {
  createdOn: number;
  id: string;
  division: Division128;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division128 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp48 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Retailer2 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division129;
  district: District65;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent17;
  client: Client22;
  zoneManager: ZoneManager9;
  subZoneManager: SubZoneManager4;
  isActive: boolean;
}

export interface Division129 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District65 {
  createdOn: number;
  id: string;
  division: Division130;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division130 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent17 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division131;
  district: District66;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent18;
  client: Client20;
  zoneManager: ZoneManager8;
  isActive: boolean;
}

export interface Division131 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District66 {
  createdOn: number;
  id: string;
  division: Division132;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division132 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent18 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division133;
  district: District67;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent19;
  client: Client19;
  isActive: boolean;
}

export interface Division133 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District67 {
  createdOn: number;
  id: string;
  division: Division134;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division134 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent19 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division135;
  district: District68;
  credits: number;
  radiusIp: RadiusIp49;
  isActive: boolean;
}

export interface Division135 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District68 {
  createdOn: number;
  id: string;
  division: Division136;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division136 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp49 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client19 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division137;
  district: District69;
  credits: number;
  radiusIp: RadiusIp50;
  isActive: boolean;
}

export interface Division137 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District69 {
  createdOn: number;
  id: string;
  division: Division138;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division138 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp50 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client20 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division139;
  district: District70;
  credits: number;
  radiusIp: RadiusIp51;
  isActive: boolean;
}

export interface Division139 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District70 {
  createdOn: number;
  id: string;
  division: Division140;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division140 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp51 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager8 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division141;
  district: District71;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent20;
  client: Client21;
  isActive: boolean;
}

export interface Division141 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District71 {
  createdOn: number;
  id: string;
  division: Division142;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division142 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent20 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division143;
  district: District72;
  credits: number;
  radiusIp: RadiusIp52;
  isActive: boolean;
}

export interface Division143 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District72 {
  createdOn: number;
  id: string;
  division: Division144;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division144 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp52 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client21 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division145;
  district: District73;
  credits: number;
  radiusIp: RadiusIp53;
  isActive: boolean;
}

export interface Division145 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District73 {
  createdOn: number;
  id: string;
  division: Division146;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division146 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp53 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client22 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division147;
  district: District74;
  credits: number;
  radiusIp: RadiusIp54;
  isActive: boolean;
}

export interface Division147 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District74 {
  createdOn: number;
  id: string;
  division: Division148;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division148 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp54 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager9 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division149;
  district: District75;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent21;
  client: Client23;
  isActive: boolean;
}

export interface Division149 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District75 {
  createdOn: number;
  id: string;
  division: Division150;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division150 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent21 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division151;
  district: District76;
  credits: number;
  radiusIp: RadiusIp55;
  isActive: boolean;
}

export interface Division151 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District76 {
  createdOn: number;
  id: string;
  division: Division152;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division152 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp55 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client23 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division153;
  district: District77;
  credits: number;
  radiusIp: RadiusIp56;
  isActive: boolean;
}

export interface Division153 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District77 {
  createdOn: number;
  id: string;
  division: Division154;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division154 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp56 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface SubZoneManager4 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division155;
  district: District78;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent22;
  client: Client25;
  zoneManager: ZoneManager10;
  isActive: boolean;
}

export interface Division155 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District78 {
  createdOn: number;
  id: string;
  division: Division156;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division156 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent22 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division157;
  district: District79;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent23;
  client: Client24;
  isActive: boolean;
}

export interface Division157 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District79 {
  createdOn: number;
  id: string;
  division: Division158;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division158 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent23 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division159;
  district: District80;
  credits: number;
  radiusIp: RadiusIp57;
  isActive: boolean;
}

export interface Division159 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District80 {
  createdOn: number;
  id: string;
  division: Division160;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division160 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp57 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client24 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division161;
  district: District81;
  credits: number;
  radiusIp: RadiusIp58;
  isActive: boolean;
}

export interface Division161 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District81 {
  createdOn: number;
  id: string;
  division: Division162;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division162 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp58 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client25 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division163;
  district: District82;
  credits: number;
  radiusIp: RadiusIp59;
  isActive: boolean;
}

export interface Division163 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District82 {
  createdOn: number;
  id: string;
  division: Division164;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division164 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp59 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ZoneManager10 {
  createdOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  division: Division165;
  district: District83;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent24;
  client: Client26;
  isActive: boolean;
}

export interface Division165 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District83 {
  createdOn: number;
  id: string;
  division: Division166;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division166 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface Parent24 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division167;
  district: District84;
  credits: number;
  radiusIp: RadiusIp60;
  isActive: boolean;
}

export interface Division167 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District84 {
  createdOn: number;
  id: string;
  division: Division168;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division168 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp60 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client26 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division169;
  district: District85;
  credits: number;
  radiusIp: RadiusIp61;
  isActive: boolean;
}

export interface Division169 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District85 {
  createdOn: number;
  id: string;
  division: Division170;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division170 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp61 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client27 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division171;
  district: District86;
  credits: number;
  radiusIp: RadiusIp62;
  isActive: boolean;
}

export interface Division171 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District86 {
  createdOn: number;
  id: string;
  division: Division172;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division172 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp62 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ComplainType2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  complainCategory: string;
  name: string;
  partner: Partner20;
  isActive: boolean;
}

export interface Partner20 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division173;
  district: District87;
  credits: number;
  radiusIp: RadiusIp63;
  isActive: boolean;
}

export interface Division173 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District87 {
  createdOn: number;
  id: string;
  division: Division174;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division174 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp63 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface AssignedTo2 {
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
  partner: Partner21;
  userType: string;
  credits: number;
}

export interface Partner21 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division175;
  district: District88;
  credits: number;
  radiusIp: RadiusIp64;
  isActive: boolean;
}

export interface Division175 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District88 {
  createdOn: number;
  id: string;
  division: Division176;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division176 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp64 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface RootCause2 {
  createdOn: number;
  id: string;
  rootCauseCategory: string;
  title: string;
  isActive: boolean;
}

export interface OpenedBy2 {
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
  partner: Partner22;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner22 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division177;
  district: District89;
  credits: number;
  radiusIp: RadiusIp65;
  isActive: boolean;
}

export interface Division177 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District89 {
  createdOn: number;
  id: string;
  division: Division178;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division178 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp65 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ClosedBy2 {
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
  partner: Partner23;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner23 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division179;
  district: District90;
  credits: number;
  radiusIp: RadiusIp66;
  isActive: boolean;
}

export interface Division179 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District90 {
  createdOn: number;
  id: string;
  division: Division180;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division180 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp66 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Client28 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division181;
  district: District91;
  credits: number;
  radiusIp: RadiusIp67;
  isActive: boolean;
}

export interface Division181 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District91 {
  createdOn: number;
  id: string;
  division: Division182;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division182 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp67 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface Partner24 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division183;
  district: District92;
  credits: number;
  radiusIp: RadiusIp68;
  isActive: boolean;
}

export interface Division183 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District92 {
  createdOn: number;
  id: string;
  division: Division184;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division184 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp68 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}

export interface ReplyBy {
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
  partner: Partner25;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner25 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division185;
  district: District93;
  credits: number;
  radiusIp: RadiusIp69;
  isActive: boolean;
}

export interface Division185 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District93 {
  createdOn: number;
  id: string;
  division: Division186;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division186 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp69 {
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
  partner: Partner26;
  userType: string;
  credits: number;
  lastLoginTime: number;
  ipAddress: string;
}

export interface Partner26 {
  createdOn: number;
  updatedOn: number;
  id: string;
  partnerType: string;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  division: Division187;
  district: District94;
  credits: number;
  radiusIp: RadiusIp70;
  isActive: boolean;
}

export interface Division187 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface District94 {
  createdOn: number;
  id: string;
  division: Division188;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division188 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp70 {
  createdOn: number;
  id: string;
  authProtocol: string;
  name: string;
  isActive: boolean;
}
