export interface RoleData {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  isActive: boolean;
  rolePermissions: RolePermission[];
  userType: string;
  insertedBy: InsertedBy;
  editedBy: EditedBy;
}

export interface RolePermission {
  createdOn: number;
  id: string;
  permissionId: string;
  permission: Permission;
  roleId: string;
  role: Role;
  actionTags: string[];
}

export interface Permission {
  createdOn: number;
  updatedOn?: number;
  id: string;
  displayName: string;
  tag: string;
  actionTags: string[];
}

export interface Role {
  createdOn: number;
  updatedOn: number;
  id: string;
  name: string;
  isActive: boolean;
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
