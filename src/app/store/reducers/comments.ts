import { CREATE_COMMENT } from "../types";
import { CommentState } from "./types/interfaces";

const initialState: CommentState = {
  entities: {},
};

export const commentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_COMMENT: {
      const comment = action.payload;
      const newEntities = { ...state.entities };

      newEntities[comment.id] = comment;

      if (comment.parentCommentId) {
        const parent = newEntities[comment.parentCommentId];
        if (parent) {
          newEntities[comment.parentCommentId] = {
            ...parent,
            children: [...parent.children, comment.id],
          };
        }
      }

      return { ...state, entities: newEntities };
    }
    default:
      return state;
  }
};
