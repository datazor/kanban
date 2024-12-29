import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskCard } from './task-card';
import { EditTaskDialog } from './edit-task-dialog';
import type { Task } from '@/lib/api/types';

interface TaskColumnProps {
  id: Task['status'];
  title: string;
  tasks: Task[];
  members: Array<{ id: number; name: string }>;
  onTaskUpdated: () => void;
}

export function TaskColumn({ id, title, tasks, members, onTaskUpdated }: TaskColumnProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <>
      <Card className="h-full">
        <CardHeader className="p-3">
          <CardTitle className="flex items-center justify-between text-base">
            {title}
            <span className="text-sm font-normal text-muted-foreground">
              {tasks.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[200px] transition-colors ${
                  snapshot.isDraggingOver ? 'bg-accent/50 rounded-lg' : ''
                }`}
              >
                {tasks.map((task, index) => {
                  const assignee = members.find(m => m.id === task.assigneeId);
                  if (!assignee) return null;
                  
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            transform: snapshot.isDragging 
                              ? provided.draggableProps.style?.transform 
                              : 'none',
                          }}
                        >
                          <TaskCard
                            task={task}
                            assignee={assignee}
                            onEdit={() => setEditingTask(task)}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>

      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          members={members}
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
          onTaskUpdated={onTaskUpdated}
        />
      )}
    </>
  );
}