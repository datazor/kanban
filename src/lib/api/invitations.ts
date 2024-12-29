import { api } from './config';
import { handleApiError } from '../utils/api';
import type { InvitationRequest } from '../types/invitation';

export const invitationApi = {
  inviteUser: async (data: InvitationRequest): Promise<void> => {
    try {
      await api.post('/projects/invite', data);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  respondToInvitation: async (
    projectId: number,
    accept: boolean,
    username: string
  ): Promise<void> => {
    try {
      await api.post('/projects/invite/respond', {
        projectId,
        accept,
        username,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
