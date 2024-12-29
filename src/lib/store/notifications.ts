import { create } from 'zustand';
import type { ProjectInvitation } from '../types/invitation';

interface NotificationState {
  invitations: ProjectInvitation[];
  unreadCount: number;
  addInvitation: (invitation: ProjectInvitation) => void;
  markAsRead: (projectId: number) => void;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  invitations: [],
  unreadCount: 0,

  addInvitation: (invitation) => set((state) => ({
    invitations: [invitation, ...state.invitations],
    unreadCount: state.unreadCount + 1
  })),

  markAsRead: (projectId) => set((state) => ({
    invitations: state.invitations.map(inv =>
      inv.projectId === projectId ? { ...inv, read: true } : inv
    ),
    unreadCount: Math.max(0, state.unreadCount - 1)
  })),

  reset: () => set({ invitations: [], unreadCount: 0 })
}));