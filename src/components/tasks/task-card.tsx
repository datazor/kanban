import { format } from 'date-fns';
import { Calendar, ChevronDown, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import { getInitials } from '@/lib/utils/string';
import type { Task } from '@/lib/api/types';

const priorityColors = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
} as const;

interface TaskCardProps {
  task: Task;
  assignee: { id: number; name: string };
  onEdit: () => void;
}

export function TaskCard({ task, assignee, onEdit }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasLongDescription = task.description && task.description.length > 100;

  return (
    <Card 
      className="cursor-move hover:shadow-md transition-shadow"
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
    >
      <CardHeader className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-sm">{task.title}</h3>
          <Badge variant="secondary" className={`${priorityColors[task.priority]} text-xs shrink-0`}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="p-3 pt-0 space-y-2">
          {hasLongDescription ? (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className="text-xs text-muted-foreground">
                <p className={isOpen ? undefined : 'line-clamp-2'}>
                  {task.description}
                </p>
              </div>
              <CollapsibleTrigger className="w-full pt-1">
                <div className="flex items-center justify-center text-xs text-muted-foreground hover:text-foreground">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pt-1 text-xs text-muted-foreground">
                  {task.description}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <p className="text-xs text-muted-foreground">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[10px]">
                  {getInitials(assignee.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(task.dueDate), 'MMM d')}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}