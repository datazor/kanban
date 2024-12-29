import { api } from './config';
import { handleApiError } from '../utils/api';

export const memberApi = {
  changeRole: async (
    projectId: number,
    userId: number,
    newRole: string
  ): Promise<void> => {
    try {
      await api.put(`/projects/${projectId}/members/${userId}/role`, {
        newRole,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
