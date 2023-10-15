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
  wsdCommission: string;
}

export interface PaymentGateway {
  createdOn: number;
  id: string;
  bankName: string;
  paymentUrl: string;
  key: string;
  isActive: boolean;
}

export interface PaymentGatewayConfigData {
  createdOn: number;
  id: string;
  clientId: string;
  client: Client;
  paymentGatewayId: string;
  paymentGateway: PaymentGateway;
  credential: string;
  isForSystem: boolean;
  isActive: boolean;
}
