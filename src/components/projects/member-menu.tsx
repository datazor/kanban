import { useState } from 'react';
import { Check, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/lib/utils/string';
import { memberApi } from '@/lib/api/members';
import { useToast } from '@/hooks/use-toast';
import type { ProjectMember } from '@/lib/types/project';
import type { Role } from '@/lib/types/role';

interface MemberMenuProps {
  member: ProjectMember;
  projectId: number;
  isAdmin: boolean;
  onRoleChange?: () => void;
}

const roles: Role[] = ['Administrator', 'Member', 'Observer'];

export function MemberMenu({ member, projectId, isAdmin, onRoleChange }: MemberMenuProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleRoleChange = async (newRole: Role) => {
    if (isUpdating || member.role === newRole) return;

    try {
      setIsUpdating(true);
      await memberApi.changeRole(projectId, member.id, newRole);
      toast({
        title: 'Success',
        description: `Role updated to ${newRole}`,
      });
      onRoleChange?.();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update role',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">
          {getInitials(member.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{member.name}</p>
        <p className="text-xs text-muted-foreground">{member.role}</p>
      </div>
      {isAdmin && member.id !== 1 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-accent/50"
              disabled={isUpdating}
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {roles.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => handleRoleChange(role)}
                disabled={member.role === role}
              >
                <span className="flex-1">{role}</span>
                {member.role === role && (
                  <Check className="h-4 w-4 ml-2" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Remove from project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}