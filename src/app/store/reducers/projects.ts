import {
  ADD_PROJECT,
  ADD_TASK_TO_PROJECT,
  SET_CURRENT_PROJECT,
} from "../types";
import { Project, ProjectAction, ProjectState } from "./types/types";

const initialState: ProjectState = {
  entities: {},
  currentProjectId: null,
};

export const projectReducer = (
  state: ProjectState = initialState,
  action: ProjectAction
): ProjectState => {
  switch (action.type) {
    case ADD_PROJECT: {
      const { id, name, createdAt } = action.payload;
      const newProject: Project = {
        id,
        name,
        createdAt,
        taskIds: [],
        description: "",
      };

      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: newProject,
        },
      };
    }

    case SET_CURRENT_PROJECT: {
      return {
        ...state,
        currentProjectId: action.payload,
      };
    }

    case ADD_TASK_TO_PROJECT: {
      const { projectId, taskId } = action.payload;
      const project = state.entities[projectId];

      if (!project) return state;

      const hasTask = project.taskIds.includes(taskId);
      if (hasTask) return state;

      return {
        ...state,
        entities: {
          ...state.entities,
          [projectId]: {
            ...project,
            taskIds: [...project.taskIds, taskId],
          },
        },
      };
    }

    default:
      return state;
  }
};
