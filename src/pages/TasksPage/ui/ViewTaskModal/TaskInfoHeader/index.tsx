import React from "react";
import { Task } from "../../../../../app/store/reducers/types/interfaces";
import "./index.sass";

const TaskInfoHeader = ({
  data,
  open,
}: {
  data: Task;
  open: (arg0: any) => void;
}) => {
  return (
    <header className="task-info__task-header">
      <h2 className="task-info__title">{data.title}</h2>
      <span
        className="task-info__edit"
        onClick={() => open((prev: boolean) => !prev)}
      >
        Edit
      </span>
      <span className="task-info__task-priority">
        Priority: {data.priority}
      </span>
    </header>
  );
};

export default TaskInfoHeader;
