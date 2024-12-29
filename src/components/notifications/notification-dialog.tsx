import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { invitationApi } from '@/lib/api/invitations';
import { useUser } from '@/contexts/user';
import type { ProjectInvitation } from '@/lib/types/invitation';

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitations: ProjectInvitation[];
  onInvitationRead: (invitationId: number) => void;
}

export function NotificationDialog({ 
  open, 
  onOpenChange, 
  invitations,
  onInvitationRead 
}: NotificationDialogProps) {
  const { toast } = useToast();
  const { user } = useUser();

  const handleResponse = async (projectId: number, accept: boolean) => {
    if (!user) return;

    try {
      await invitationApi.respondToInvitation(
        projectId,
        accept,
        user.name
      );
      
      toast({
        title: 'Success',
        description: `Successfully ${accept ? 'accepted' : 'declined'} the invitation`,
      });
      
      onInvitationRead(projectId);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to respond to invitation',
      });
    }
  };

  return (
    <ResponsiveDialog 
      open={open} 
      onOpenChange={onOpenChange}
      title="Notifications"
    >
      <ScrollArea className="h-[400px] pr-4">
        {invitations.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No notifications
          </div>
        ) : (
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <div
                key={`${invitation.projectId}-${invitation.createdAt}`}
                className={`p-4 rounded-lg border ${
                  !invitation.read ? 'bg-accent' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{invitation.projectName}</h4>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(invitation.createdAt), 'MMM d, HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {invitation.invitedBy} invited you to join as {invitation.status}
                </p>
                {!invitation.read && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleResponse(invitation.projectId, false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleResponse(invitation.projectId, true)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </ResponsiveDialog>
  );
}