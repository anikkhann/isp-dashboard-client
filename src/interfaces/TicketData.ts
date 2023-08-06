import { ComplainTypeData } from "./ComplainTypeData";
import { CustomerData, Client } from "./CustomerData";

export interface TicketData {
  createdOn: number;
  id: string;
  ticketNo: string;
  ticketCategory: string;
  customerId: string;
  customer: CustomerData;
  complainTypeId: string;
  complainType: ComplainTypeData;
  complainDetails: string;
  status: string;
  openedBy: OpenedBy;
  insertedBy: InsertedBy;
  client: Client;
  clientId: string;
  partner: Partner10;
  partnerId: string;
  checkList: string;
  isForSystemAdmin: boolean;
  ticketDetails: any[];
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
  partner: Partner;
  userType: string;
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
  partner: Partner;
  userType: string;
  insertedBy: InsertedBy2;
  editedBy: EditedBy;
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
  division: Division10;
  district: District10;
  radiusIp: RadiusIp10;
  isActive: boolean;
}

export interface Division10 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  master: Master38;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master38 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface District10 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  master: Master39;
  parent: Parent20;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master39 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  code: string;
  parent: Parent19;
  key: string;
  isActive: boolean;
}

export interface Parent19 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface Parent20 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  master: Master40;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master40 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface RadiusIp10 {
  createdOn: number;
  id: string;
  name: string;
  master: Master41;
  isActive: boolean;
}

export interface Master41 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
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
  userType: string;
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
  email: string;
  address: string;
  division: Division11;
  district: District11;
  radiusIp: RadiusIp11;
  isActive: boolean;
}

export interface Division11 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  master: Master42;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master42 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface District11 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  master: Master43;
  parent: Parent22;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master43 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  code: string;
  parent: Parent21;
  key: string;
  isActive: boolean;
}

export interface Parent21 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface Parent22 {
  createdOn: number;
  id: string;
  name: string;
  bnName: string;
  master: Master44;
  isActive: boolean;
  isSystem: boolean;
}

export interface Master44 {
  createdOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}

export interface RadiusIp11 {
  createdOn: number;
  id: string;
  name: string;
  master: Master45;
  isActive: boolean;
}

export interface Master45 {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  key: string;
  isActive: boolean;
}
