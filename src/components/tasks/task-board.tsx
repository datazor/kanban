import { useState, useEffect, useCallback } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { TaskColumn } from './task-column';
import {Task, taskApi} from '@/lib/api';
import { useTaskPositions } from '@/lib/store/task-positions';

const columns = [
  { id: 'TODO' as const, title: 'To Do' },
  { id: 'IN_PROGRESS' as const, title: 'In Progress' },
  { id: 'DONE' as const, title: 'Done' },
];

interface TaskBoardProps {
  projectId: number;
  members: Array<{ id: number; name: string }>;
}

export function TaskBoard({ projectId, members }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { positions, updatePositions } = useTaskPositions();

  const fetchTasks = useCallback(async () => {
    try {
      const data : Task[] = await taskApi.getProjectTasks(projectId);
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const taskId = Number(draggableId);
    const newStatus = destination.droppableId;

    try {
      // Update frontend state immediately for smooth UX
      updatePositions(taskId, destination.index, newStatus);

      // Update task status in backend
      await taskApi.updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task:', error);
      fetchTasks(); // Revert on error
    }
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter(task => task.status === column.id);
          const sortedTasks = columnTasks.sort((a, b) => {
            const posA = positions.find(p => p.taskId === a.id)?.position ?? 0;
            const posB = positions.find(p => p.taskId === b.id)?.position ?? 0;
            return posA - posB;
          });

          return (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={sortedTasks}
              members={members}
              onTaskUpdated={fetchTasks}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}