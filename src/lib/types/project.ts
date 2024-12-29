import type { Role } from './role';

export interface ProjectMemberResponse {
  id: number;
  name: string;
  role: Role;
}

export interface ProjectResponse {
  id: number;
  name: string;
  startDate: string;
  members: ProjectMemberResponse[];
}

export interface Project {
  id: number;
  name: string;
  startDate: string;
  members: ProjectMemberResponse[];
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  startDate: string;
}