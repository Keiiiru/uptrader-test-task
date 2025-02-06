import {
  ADD_COMMENT_TO_TASK,
  ADD_PROJECT,
  ADD_SUBTASK,
  ADD_TASK_TO_PROJECT,
  CREATE_TASK,
  DELETE_TASK,
  SET_CURRENT_PROJECT,
  UPDATE_TASK,
  UPDATE_TASK_STATUS,
} from "../../types";
import { rootReducer } from "../rootReducer";
import { Task } from "./interfaces";

export type AddProjectAction = {
  type: typeof ADD_PROJECT;
  payload: {
    id: string;
    name: string;
    createdAt: string;
  };
};

export type SetCurrentProjectAction = {
  type: typeof SET_CURRENT_PROJECT;
  payload: string;
};

export type AddTaskToProjectAction = {
  type: typeof ADD_TASK_TO_PROJECT;
  payload: {
    projectId: string;
    taskId: string;
  };
};

export type ProjectAction =
  | AddProjectAction
  | SetCurrentProjectAction
  | AddTaskToProjectAction;

export type AddTaskToProjectPayload = {
  projectId: string;
  taskId: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  taskIds: string[];
};

export type ProjectState = {
  entities: {
    [id: string]: Project;
  };
  currentProjectId: string | null;
};

export type CreateTaskAction = {
  type: typeof CREATE_TASK;
  payload: Task;
};

export type UpdateTaskStatusAction = {
  type: typeof UPDATE_TASK_STATUS;
  payload: {
    taskId: string;
    status: "queue" | "development" | "done";
  };
};

export type AddSubtaskAction = {
  type: typeof ADD_SUBTASK;
  payload: {
    parentTaskId: string;
    subtask: Task;
  };
};

export type AddCommentToTaskAction = {
  type: typeof ADD_COMMENT_TO_TASK;
  payload: {
    taskId: string;
    id: string;
  };
};

export type TaskAction =
  | { type: typeof CREATE_TASK; payload: Task }
  | {
      type: typeof UPDATE_TASK_STATUS;
      payload: { taskId: string; status: string };
    }
  | {
      type: typeof ADD_SUBTASK;
      payload: { parentTaskId: string; subtask: Task };
    }
  | {
      type: typeof ADD_COMMENT_TO_TASK;
      payload: { taskId: string; id: string };
    }
  | {
      type: typeof UPDATE_TASK;
      payload: { taskId: string; updatedData: Partial<Task> };
    }
  | { type: typeof DELETE_TASK; payload: { taskId: string } };
export type RootState = ReturnType<typeof rootReducer>;
