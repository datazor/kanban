import { format } from 'date-fns';
import { CalendarDays, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getInitials } from '@/lib/utils/string';
import type { Project, ProjectMember } from '@/lib/api';

const roleColors = {
  Administrator: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Member: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Observer: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
} as const;

interface ProjectCardProps {
  project: Project;
  currentUserId: number;
  onInviteClick: (projectId: number) => void;
}

export function ProjectCard({ project, currentUserId, onInviteClick }: ProjectCardProps) {
  const navigate = useNavigate();
  const currentUserRole = project.members.find(member => member.id === currentUserId)?.role;
  const isAdmin = currentUserRole === 'Administrator';

  const handleCardClick = () => {
    navigate(`/projects/${project.id}`);
  };

  const handleInviteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInviteClick(project.id);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={handleCardClick}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <CalendarDays className="h-4 w-4 mr-1" />
              {format(new Date(project.startDate), 'MMM d, yyyy')}
            </div>
          </div>
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleInviteClick}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Team Members</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.members.map((member) => (
                <MemberBadge key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MemberBadge({ member }: { member: ProjectMember }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="secondary"
            className={`${roleColors[member.role]} flex items-center gap-2 px-2 py-1`}
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{member.name}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{member.role}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}