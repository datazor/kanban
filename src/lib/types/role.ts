export type Role = 'Administrator' | 'Member' | 'Observer';

export interface ChangeRoleRequest {
  newRole: Role;
}