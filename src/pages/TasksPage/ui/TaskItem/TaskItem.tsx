import React, { useState } from "react";
import "./TaskItem.sass";
import DotsIcon from "../../../../shared/icons/DotsIcon";
import TimerIcon from "../../../../shared/icons/TimerIcon";
import { useDraggable } from "@dnd-kit/core";
import ViewTaskModal from "../ViewTaskModal";

type Props = {
  data: any;
};

const TaskItem: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
    data: {
      type: "task",
      status: data.status?.toLowerCase(),
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const formatDuration = (): string => {
    const ms =
      data.updatedAt !== undefined
        ? Date.now() - data.updatedAt
        : Date.now() - data.createdAt;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (totalSeconds < 60) return "less than minute";

    return `${hours > 0 ? hours + " h " : ""}${
      minutes > 0 ? minutes + " min " : ""
    }`;
  };

  return (
    <>
      <div
        className="task-container"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <header className="task-container__task-header">
          <h3 className="task-container__task-number">{data.id}</h3>
          <button
            className="task-container__button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <DotsIcon />
          </button>
        </header>

        <main className="task-container__task-content">
          <h4 className="task-container__task-name">{data.title}</h4>
          <div className="task-container__time-box">
            <TimerIcon />
            <span className="task-container__timer">
              В работе: {formatDuration()}
            </span>
          </div>
        </main>
      </div>
      <ViewTaskModal isOpen={isOpen} onClose={setIsOpen} data={data} />
    </>
  );
};

export default TaskItem;
