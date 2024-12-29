import { Home, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreateProjectButton } from '@/components/projects/create-project-button';
import { NotificationButton } from './notification-button';
import { NotificationDialog } from '../notifications/notification-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/hooks/use-notifications';
import { useUser } from '@/contexts/user';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps {
  onProjectDialogOpen: () => void;
}

export function Sidebar({ onProjectDialogOpen }: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const { invitations, unreadCount, markAsRead } = useNotifications(user?.name ?? '');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen w-16 flex flex-col fixed left-0 top-0 border-r bg-background">
      <div className="flex-1 flex flex-col gap-2 p-3">
        <CreateProjectButton onClick={onProjectDialogOpen} />
        <div className="h-px bg-border my-2" />
        <NotificationButton 
          unreadCount={unreadCount}
          onClick={() => setNotificationDialogOpen(true)}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/dashboard"
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-accent hover:shadow-md transition-all"
                )}
              >
                <Home className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="p-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-10 w-10 rounded-lg hover:bg-accent hover:shadow-md transition-all"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <NotificationDialog
        open={notificationDialogOpen}
        onOpenChange={setNotificationDialogOpen}
        invitations={invitations}
        onInvitationRead={markAsRead}
      />
    </div>
  );
}