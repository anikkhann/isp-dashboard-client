export interface PackageData {
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
  validityUnitId: string;
  validity: number;
  vat: number;
  totalPrice: number;
  unitPrice: number;
  autoRenew: boolean;
  isAssignedToZone: boolean;
  isAssignedToSubZone: boolean;
  partner: Partner;
  partnerId: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  distributionZones: DistributionZone[];
}

export interface ValidityUnit {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  code: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master {
  createdOn: number;
  id: string;
  name: string;
  key: string;
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
  master: Master2;
  isActive: boolean;
}

export interface Master2 {
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
  partner: Partner2;
  userType: string;
  credits: number;
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

export interface EditedBy {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  partnerId: string;
  partner: Partner3;
  userType: string;
  credits: number;
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

export interface DistributionZone {
  createdOn: number;
  id: string;
  customerPackage: CustomerPackage;
  customerPackageId: string;
  zone: Zone;
  zoneId: string;
  insertedBy: InsertedBy2;
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
  validityUnit: ValidityUnit2;
  validity: number;
  vat: number;
  totalPrice: number;
  unitPrice: number;
  autoRenew: boolean;
  isAssignedToZone: boolean;
  isAssignedToSubZone: boolean;
  partner: Partner4;
  isActive: boolean;
}

export interface ValidityUnit2 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  code: string;
  master: Master5;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master5 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
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

export interface Zone {
  id: string;
  createdBy: string;
  updatedBy: any;
  isDeleted: boolean;
  partner: Partner5;
  name: string;
  isActive: boolean;
}

export interface Partner5 {
  id: string;
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
  partnerType: string;
  clientLevel: any;
  name: string;
  username: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  email: string;
  address: string;
  latitude: any;
  longitude: any;
  division: Division9;
  district: District5;
  upazilla: any;
  union: any;
  licenseType: any;
  licenseNo: any;
  licenseExpireDate: any;
  salesDistributionCommission: any;
  credits: number;
  nidNo: any;
  nidPhoto: any;
  aamarPayKey: any;
  aamarPaySecret: any;
  radiusIp: RadiusIp5;
  parent: any;
  client: any;
  zoneManager: any;
  subZoneManager: any;
  isActive: boolean;
}

export interface Division9 {
  id: string;
  createdBy: string;
  updatedBy: any;
  isDeleted: boolean;
  name: string;
  bnName: string;
  url: string;
}

export interface District5 {
  id: string;
  createdBy: string;
  updatedBy: any;
  isDeleted: boolean;
  division: Division10;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Division10 {
  id: string;
  createdBy: string;
  updatedBy: any;
  isDeleted: boolean;
  name: string;
  bnName: string;
  url: string;
}

export interface RadiusIp5 {
  id: string;
  createdBy: string;
  updatedBy: any;
  isDeleted: boolean;
  name: string;
  bnName: any;
  master: Master7;
  parent: any;
  code: any;
  isActive: boolean;
  isSystem: any;
}

export interface Master7 {
  id: string;
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
  name: string;
  code: any;
  parent: any;
  key: string;
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
  partnerId: string;
  partner: Partner6;
  userType: string;
  credits: number;
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
