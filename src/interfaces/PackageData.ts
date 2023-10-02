/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientData } from "./ClientData";

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
  validityUnit: string;
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
  editedBy: InsertedBy;
  zones: ClientData[];
  nextExpiredPackage?: nextExpiredPackage;
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
  partner: Partner;
  userType: string;
  credits: number;
}
export interface nextExpiredPackage {
  autoRenew: boolean;
  createdOn: any;
  displayName: string;
  downloadLimit: number;
  downloadLimitUnit: any;
  id: string;
  ipPoolName: string;
  isActive: boolean;
  isAssignedToSubZone: boolean;
  isAssignedToZone: boolean;
  name: string;
  partner?: Partner;
  totalPrice: number;
  unitPrice: number;
  uploadLimit: number;
  uploadLimitUnit: any;
  validity: number;
  validityUnit: string;
  vat: number;
}
