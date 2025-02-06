import { UpdateTaskPayload } from "../reducers/types/interfaces";
import {
  CREATE_TASK,
  UPDATE_TASK_STATUS,
  ADD_SUBTASK,
  ADD_COMMENT_TO_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../types";

export const createTask = (taskData: object) => ({
  type: CREATE_TASK,
  payload: {
    id: `task-${Date.now()}`,
    ...taskData,
    status: "queue",
    createdAt: Date.now(),
    timeInWork: 0,
    subtasks: [],
    comments: [],
    parentTaskId: null,
  },
});

export const addSubtask = (parentTaskId: string, subtaskData: object) => ({
  type: ADD_SUBTASK,
  payload: {
    parentTaskId,
    subtask: {
      ...subtaskData,
      parentTaskId,
      id: `task-${Date.now()}`,
      status: "queue",
      createdAt: Date.now(),
      timeInWork: 0,
      files: [],
      subtasks: [],
      comments: [],
    },
  },
});

export const addCommentToTask = (taskId: any, id: any): any => ({
  type: ADD_COMMENT_TO_TASK,
  payload: { taskId, id },
});

export const updateTaskStatus = (taskId: number, newStatus: string) => ({
  type: UPDATE_TASK_STATUS,
  payload: { taskId, newStatus },
});

export const deleteTask = (taskId: string) => ({
  type: DELETE_TASK,
  payload: { taskId },
});

export const updateTask = (payload: UpdateTaskPayload) => ({
  type: UPDATE_TASK,
  payload,
});
