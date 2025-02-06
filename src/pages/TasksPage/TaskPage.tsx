import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../widgets/ListItem/ListItem";
import "./TaskPage.sass";
import { desks } from "../../shared/constants";
import TaskItem from "./ui/TaskItem/TaskItem";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { UPDATE_TASK_STATUS } from "../../app/store/types";
import CreateButton from "../../widgets/CreateButton";
import CreateTaskModal from "./ui/CreateTaskModal";
import { RootState } from "../../app/store/reducers/types/types";

const TaskPage = ({ searchTerm }: { searchTerm: string }) => {
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const project = useSelector(
    (state: RootState) => state.projects.entities[projectId!]
  );
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active) {
      const newStatus = over.id;
      dispatch({
        type: UPDATE_TASK_STATUS,
        payload: {
          taskId: active.id,
          status: newStatus,
        },
      });
    }
  }

  const tasks = useSelector((state: RootState) =>
    project.taskIds
      .map((taskId) => state.tasks.entities[taskId])
      .filter(
        (task) =>
          task?.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase().trim()) ||
          task?.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase().trim())
      )
  );

  return (
    <>
      <ul className="tasks-list">
        <DndContext onDragEnd={handleDragEnd} sensors={[sensor]}>
          {desks.map((deskItem) => (
            <ListItem data={deskItem} type="task" key={deskItem.title}>
              {tasks
                .filter((task) => task.status === deskItem.title.toLowerCase())
                .map((task: any) => (
                  <li className="tasks-list__item" key={task.id}>
                    <TaskItem data={task} />
                  </li>
                ))}
            </ListItem>
          ))}
        </DndContext>
      </ul>
      <CreateButton setIsOpen={setIsOpen} />
      <CreateTaskModal isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
};

export default TaskPage;
