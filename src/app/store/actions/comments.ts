import { CREATE_COMMENT } from "../types";

export const createComment = (
  text: string,
  author: string,
  taskId: string,
  parentCommentId: string | null = null
) => ({
  type: CREATE_COMMENT,
  payload: {
    id: `comment-${Date.now()}`,
    text,
    author,
    createdAt: Date.now(),
    parentCommentId,
    taskId,
    children: [],
  },
});
