import { useEffect } from 'react';
import { WebSocketService } from '@/lib/services/websocket';
import { useNotificationStore } from '@/lib/store/notifications';
import type { ProjectInvitation } from '@/lib/types/invitation';

export function useNotifications(username: string) {
  const { invitations, unreadCount, addInvitation, markAsRead, reset } = useNotificationStore();

  useEffect(() => {
    if (!username) return;

    const ws = new WebSocketService(username, (data: ProjectInvitation) => {
      addInvitation(data);
    });

    ws.connect();

    return () => {
      ws.disconnect();
      reset();
    };
  }, [username, addInvitation, reset]);

  return {
    invitations,
    unreadCount,
    markAsRead
  };
}