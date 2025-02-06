import {
  createStore,
  applyMiddleware,
  Middleware,
  Store,
  AnyAction,
} from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { CREATE_COMMENT, CREATE_TASK } from "./types";
import { addTaskToProject } from "./actions/projects";
import { addCommentToTask } from "./actions/tasks";
import { RootState } from "./reducers/types/types";

const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem("reduxState", JSON.stringify(state));
    return result;
  };

const taskProjectMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    if (action.type === CREATE_TASK) {
      const state = store.getState();
      const projectId = state.projects.currentProjectId;
      const result = next(action);

      if (projectId && action.payload && action.payload.id) {
        store.dispatch(
          addTaskToProject({
            projectId: projectId,
            taskId: action.payload.id,
          })
        );
      }
      return result;
    }
    return next(action);
  };

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return undefined;
  }
};

const commentMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    if (action.type === CREATE_COMMENT) {
      const { taskId, parentCommentId, id } = action.payload;
      const result = next(action);

      if (!parentCommentId) {
        store.dispatch(addCommentToTask(taskId, id));
      }
      return result;
    }
    return next(action);
  };

const configureStore = (): Store<RootState, AnyAction> => {
  return createStore(
    rootReducer,
    loadFromLocalStorage(),

    applyMiddleware(
      localStorageMiddleware,
      taskProjectMiddleware,
      commentMiddleware
    )
  );
};

export default configureStore;
