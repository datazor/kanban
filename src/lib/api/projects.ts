import { api } from './config';
import { handleApiError } from '../utils/api';
import type {
  Project,
  ProjectResponse,
  CreateProjectRequest,
} from '../types/project';

export const projectApi = {
  getProjects: async (username: string): Promise<Project[]> => {
    try {
      const response = await api.get<ProjectResponse[]>(
        `/projects/${username}`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  getProject: async (id: number): Promise<Project> => {
    try {
      const response = await api.get<ProjectResponse>(`projects/project/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    try {
      const response = await api.post<Project>('/projects/create', data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
