import { combineReducers } from "redux";
import { projectReducer } from "./projects";
import { taskReducer } from "./tasks";
import { commentReducer } from "./comments";

export const rootReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer,
  comments: commentReducer,
});
