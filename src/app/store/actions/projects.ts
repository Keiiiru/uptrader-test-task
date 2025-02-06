import { AddTaskToProjectPayload } from "../reducers/types/types";
import {
  ADD_PROJECT,
  ADD_TASK_TO_PROJECT,
  SET_CURRENT_PROJECT,
} from "../types";

export const addTaskToProject = (payload: AddTaskToProjectPayload) => ({
  type: ADD_TASK_TO_PROJECT,
  payload,
});

export const addProject = (name: string, description: string) => ({
  type: ADD_PROJECT,
  payload: {
    id: `project-${Date.now()}`,
    name,
    description,
    createdAt: new Date().toISOString(),
  },
});

export const setCurrentProject = (projectId: string) => ({
  type: SET_CURRENT_PROJECT,
  payload: projectId,
});
