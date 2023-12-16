export interface Division {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  url: string;
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
  division: Division;
  name: string;
  bnName: string;
  lat: string;
  lon: string;
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

export interface NasDeviceData {
  createdOn: number;
  id: string;
  clientId: string;
  client: Client;
  name: string;
  mapLocation: string;
  locationDescription: string;
  ip: string;
  secret: string;
  radiusIncomingPort: string;
  apiSsl: boolean;
  apiPort: string;
  apiUsername: string;
  apiPassword: string;
  isActive: boolean;
}
