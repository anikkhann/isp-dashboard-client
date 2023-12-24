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
  division: Division;
  district: District;
  salesDistributionCommission: number;
  credits: number;
  parent: Parent;
  client: Client;
  isActive: boolean;
  wsdCommission: number;
}

export interface NoticeBoardData {
  createdOn: number;
  id: string;
  noticeType: string;
  message: string;
  client: Client;
  clientId: string;
  zoneManager: ZoneManager;
  zoneManagerId: string;
  subZoneManagerId: string;
  retailerId: string;
  customerPackageId: string;
  customerId: string;

  startDate: number;
  endDate: number;
  isActive: boolean;
}
