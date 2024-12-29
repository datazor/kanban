import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarDays, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog';
import { MemberMenu } from './member-menu';
import type { Project } from '@/lib/api';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const isObserver = project.members.some(
    member => member.id === 1 && member.role === 'Observer'
  );
  const isAdmin = project.members.some(
    member => member.id === 1 && member.role === 'Administrator'
  );

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 mr-1" />
          Started {format(new Date(project.startDate), 'MMMM d, yyyy')}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Users className="h-4 w-4 mr-2" />
              Team ({project.members.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-2">
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {project.members.map((member) => (
                  <MemberMenu
                    key={member.id}
                    member={member}
                    projectId={project.id}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        {!isObserver && (
          <Button onClick={() => setCreateTaskOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        )}
      </div>
      <CreateTaskDialog
        projectId={project.id}
        members={project.members}
        open={createTaskOpen}
        onOpenChange={setCreateTaskOpen}
        onTaskCreated={() => {
          // Refresh tasks
        }}
      />
    </div>
  );
}