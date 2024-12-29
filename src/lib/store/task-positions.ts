import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TaskStatus } from '../types/task';

interface TaskPosition {
  taskId: number;
  position: number;
  status: TaskStatus;
}

interface TaskPositionsState {
  positions: TaskPosition[];
}

interface TaskPositionsActions {
  updatePositions: (taskId: number, newPosition: number, newStatus: TaskStatus) => void;
  getPosition: (taskId: number) => number | undefined;
  getTasksInColumn: (status: TaskStatus) => number[];
  reset: () => void;
}

export const useTaskPositions = create<TaskPositionsState & TaskPositionsActions>()(
  persist(
    (set, get) => ({
      positions: [],
      
      updatePositions: (taskId, newPosition, newStatus) => 
        set(state => ({
          positions: [
            ...state.positions.filter(p => p.taskId !== taskId),
            { taskId, position: newPosition, status: newStatus }
          ]
        })),
        
      getPosition: (taskId) => 
        get().positions.find(p => p.taskId === taskId)?.position,
        
      getTasksInColumn: (status) => 
        get().positions
          .filter(p => p.status === status)
          .sort((a, b) => a.position - b.position)
          .map(p => p.taskId),
          
      reset: () => set({ positions: [] })
    }),
    {
      name: 'task-positions',
    }
  )
);