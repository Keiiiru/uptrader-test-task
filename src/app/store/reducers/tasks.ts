import {
  CREATE_TASK,
  UPDATE_TASK_STATUS,
  ADD_SUBTASK,
  ADD_COMMENT_TO_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../types";
import { TaskState } from "./types/interfaces";
import { TaskAction } from "./types/types";

const initialState: TaskState = {
  entities: {},
};

const deleteNestedTasks = (state: TaskState, taskId: string) => {
  const task = state.entities[taskId];
  let newState: TaskState = { ...state };

  task.subtasks.forEach((subtaskId: string) => {
    newState = deleteNestedTasks(newState, subtaskId);
  });

  delete newState.entities[taskId];
  return newState;
};

export const taskReducer = (
  state: TaskState = initialState,
  action: TaskAction
) => {
  switch (action.type) {
    case CREATE_TASK:
      console.log(action.payload.files);
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_TASK_STATUS: {
      const { taskId, status } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [taskId]: {
            ...state.entities[taskId],
            status: status,
            updatedAt: Date.now(),
          },
        },
      };
    }
    case ADD_SUBTASK:
      const { parentTaskId, subtask } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [parentTaskId]: {
            ...state.entities[parentTaskId],
            subtasks: [...state.entities[parentTaskId].subtasks, subtask.id],
          },
          [subtask.id]: subtask,
        },
      };

    case ADD_COMMENT_TO_TASK: {
      const { taskId, id } = action.payload;
      const task = state.entities[taskId];

      return {
        ...state,
        entities: {
          ...state.entities,
          [taskId]: {
            ...task,
            comments: [...task.comments, id],
          },
        },
      };
    }

    case UPDATE_TASK: {
      const { taskId, ...updatedData } = action.payload;
      if (!state.entities[taskId]) return state;

      return {
        ...state,
        entities: {
          ...state.entities,
          [taskId]: {
            ...state.entities[taskId],
            ...updatedData,
            updatedAt: Date.now(),
          },
        },
      };
    }

    case DELETE_TASK: {
      const { taskId } = action.payload;
      if (!state.entities[taskId]) return state;

      const newState = deleteNestedTasks(state, taskId);

      const parentTaskId = state.entities[taskId]?.parentTaskId;
      if (parentTaskId) {
        const parentTask = newState.entities[parentTaskId];
        return {
          ...newState,
          entities: {
            ...newState.entities,
            [parentTaskId]: {
              ...parentTask,
              subtasks: parentTask.subtasks.filter((id) => id !== taskId),
            },
          },
        };
      }

      return newState;
    }

    default:
      return state;
  }
};
