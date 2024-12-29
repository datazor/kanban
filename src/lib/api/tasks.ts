import { api } from './config';
import { handleApiError } from '../utils/api';
import type {TaskUpdateRequest, TaskResponse, Task} from '../types/task';
import {Writeable, ZodDate, ZodEnum, ZodNumber, ZodOptional, ZodString} from "zod";

export const taskApi = {
  updateTask: async (
    taskId: number,
    data: TaskUpdateRequest
  ): Promise<TaskResponse> => {
    try {
      const response = await api.put<TaskResponse>(`/tasks/${taskId}`, {
        ...data,
        updater: 'currentUser', // TODO: Get from auth context
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  getProjectTasks: async (projectId: number):Promise<Task[]> => {
    try {
      const response = await api.get<Task[]>(`/tasks/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }

  },
  createTask(param: {
    dueDate: ZodDate["_output"];
    description?: ZodOptional<ZodString>["_output"];
    title: ZodString["_output"];
    priority: ZodEnum<Writeable<[string, string, string]>>["_output"];
    assigneeId: ZodNumber["_output"];
    projectId: number;
    status: string
  }) {
    try {
      api.post(`/tasks/create`, {param});
    } catch (error) {
      console.log('error', error)
      throw new Error(handleApiError(error));
    }

  }
};
