export interface InvitationRequest {
  email: string;
  projectId: number;
  invitedById: string;
  role: string;
}

export interface InvitationResponse {
  projectId: number;
  accept: boolean;
  username: string;
}

export interface ProjectInvitation {
  projectId: number;
  projectName: string;
  invitedBy: string;
  status: string;
  createdAt: string;
  read: boolean;
}