export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: number;
  parentCommentId: string | null;
  taskId: string;
  children: string[];
}

export interface CommentState {
  entities: Record<string, Comment>;
}

export interface FileItem {
  name: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "queue" | "development" | "done";
  createdAt: number;
  timeInWork: number;
  endDate: number | null;
  files: FileItem[];
  subtasks: string[];
  comments: string[];
  parentTaskId: string | null;
}

export interface TaskState {
  entities: Record<string, Task>;
}

export interface UpdateTaskPayload {
  taskId: string;
  updatedData: Partial<Task>;
}
