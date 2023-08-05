export interface ClientData {
  createdOn: number;
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
  upazillaId: string;
  upazilla: Upazilla;
  nid: string;
  password: string;
  unionId: string;
  union: Union;
  licenseTypeId: string;
  licenseType: LicenseType;
  licenseExpireDate: number;
  btrcLicenseNo: string;
  salesDistributionCommission: number;
  credits: number;
  radiusIp: RadiusIp;
  radiusIpId: string;
  isActive: boolean;
  insertedBy: InsertedBy;
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

export interface Upazilla {
  createdOn: number;
  id: string;
  district: District2;
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

export interface LicenseType {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  master: Master;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
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
  userType: string;
  credits: number;
}
