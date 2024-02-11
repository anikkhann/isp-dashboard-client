export interface DistributionPopData {
  createdOn: number;
  updatedOn: number;
  id: string;
  partner: Partner;
  partnerId: string;
  zone: Zone;
  zoneId: string;
  name: string;
  isActive: boolean;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
  latitude: string;
  longitude: string;
  // updatedOn?: string;
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

export interface Zone {
  createdOn: number;
  id: string;
  partner: Partner2;
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
  userType: string;
  credits: number;
}
