import { formatDateTime } from '@/lib/utils/date';
import { History } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TaskHistory as TaskHistoryType } from '@/lib/types/task';

interface TaskHistoryProps {
  history: TaskHistoryType[];
}

function getFieldLabel(field: string): string {
  switch (field) {
    case 'status': return 'Status';
    case 'priority': return 'Priority';
    case 'assignee': return 'Assignee';
    case 'title': return 'Title';
    case 'description': return 'Description';
    case 'dueDate': return 'Due Date';
    default: return field.charAt(0).toUpperCase() + field.slice(1);
  }
}

export function TaskHistory({ history }: TaskHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No history available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <History className="h-4 w-4" />
        Task History
      </div>
      <div className="space-y-4">
        {history.map((entry, index) => (
          <div 
            key={`${entry.taskId}-${entry.updatedAt}-${index}`}
            className="space-y-2 bg-muted/30 rounded-lg p-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{entry.updatedBy}</span>
              <span className="text-muted-foreground">
                {formatDateTime(entry.updatedAt)}
              </span>
            </div>
            <div className="space-y-1">
              {entry.changes.map((change, changeIndex) => (
                <div 
                  key={`${change.field}-${changeIndex}`}
                  className="text-sm text-muted-foreground"
                >
                  Changed <span className="font-medium">{getFieldLabel(change.field)}</span> from{' '}
                  <span className="font-medium text-foreground">{change.oldValue || 'empty'}</span> to{' '}
                  <span className="font-medium text-foreground">{change.newValue || 'empty'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}