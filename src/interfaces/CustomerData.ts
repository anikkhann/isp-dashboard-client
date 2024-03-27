/* eslint-disable @typescript-eslint/no-explicit-any */
import { Union, Upazilla } from "./ClientData";
import { EditedBy } from "./RoleData";
import { SubZoneManager, ZoneManager } from "./TicketData";

export interface CustomerData {
  createdOn: number;
  id: string;
  customerId: string;
  name: string;
  username: string;
  password: string;
  customerType: CustomerType;
  customerTypeId: string;
  mobileNo: string;
  email: string;
  contactPerson: string;
  contactPersonNumber: string;
  connectionAddress: string;
  houseNo: string;
  roadNo: string;
  area: string;
  identityType: string;
  identityNo: string;
  customerPackage: CustomerPackage;
  customerPackageId: string;
  distributionZone: DistributionZone;
  distributionZoneId: string;
  distributionPop: DistributionPop;
  distributionPopId: string;
  isMacBound: boolean;
  simultaneousUser: number;
  ipMode: string;
  expirationTime: number;
  credits: number;
  autoRenew: boolean;
  discount: number;
  smsAlert: boolean;
  emailAlert: boolean;
  partner: Partner6;
  partnerId: string;
  client: Client;
  clientId: string;
  isActive: boolean;
  isSafVerified: boolean;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  updatedOn?: string;
  altMobileNo?: string;
  flatNo?: string;
  remarks?: string;
  referenceType?: string;
  referrerName?: string;
  divisionId?: string;
  districtId?: string;
  upazillaId?: string;
  unionId?: string;
  clientNote?: string;
  clientStatus?: string;
  zoneNote?: string;
  zoneStatus?: string;
  contactNumber?: number;
  connectionType?: string;
  swPortNo?: any;
  vlanBoxName?: string;
  cableLength?: number;
  division?: Division;
  district?: District;
  upazilla?: Upazilla;
  union?: Union;
  zoneManager?: ZoneManager;
  subZoneManager?: SubZoneManager;
  adjustmentDay?: any;
  mac: string;
  staticIp: string;
  referrerCustomerId: string;
  referrerUserId: string;
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
  name: string;
  master: Master;
  isActive: boolean;
}

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
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
  validityUnit: ValidityUnit;
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

export interface ValidityUnit {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  code: string;
  master: Master2;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master2 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
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
  name: string;
  master: Master3;
  isActive: boolean;
}

export interface Master3 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface DistributionZone {
  createdOn: number;
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
  name: string;
  master: Master4;
  isActive: boolean;
}

export interface Master4 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
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
  name: string;
  master: Master5;
  isActive: boolean;
}

export interface Master5 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface Zone {
  createdOn: number;
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
  name: string;
  master: Master6;
  isActive: boolean;
}

export interface Master6 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
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
  name: string;
  master: Master7;
  isActive: boolean;
}

export interface Master7 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
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
  division: Division13;
  district: District7;
  credits: number;
  radiusIp: RadiusIp7;
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

export interface RadiusIp7 {
  createdOn: number;
  id: string;
  name: string;
  master: Master8;
  isActive: boolean;
}

export interface Master8 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
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
  partnerId: string;
  partner: Partner7;
  userType: string;
  credits: number;
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
  division: Division15;
  district: District8;
  credits: number;
  radiusIp: RadiusIp8;
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

export interface RadiusIp8 {
  createdOn: number;
  id: string;
  name: string;
  master: Master9;
  isActive: boolean;
}

export interface Master9 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}
