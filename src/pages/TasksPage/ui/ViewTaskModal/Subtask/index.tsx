import React, { useState } from "react";
import { addSubtask } from "../../../../../app/store/actions/tasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store/reducers/types/types";
import { Task } from "../../../../../app/store/reducers/types/interfaces";
import ViewTaskModal from "..";
import "./index.sass";

interface SubtaskComponentProps {
  data: Task;
}

const SubtaskComponent: React.FC<SubtaskComponentProps> = ({ data }) => {
  const [selectedSubtask, setSelectedSubtask] = useState<string | null>(null);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [subtaskData, setSubtaskData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.entities);

  const handleOpenSubtask = (subtaskId: string) => {
    setSelectedSubtask(subtaskId);
  };

  const handleCloseSubtaskModal = () => {
    setSelectedSubtask(null);
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subtaskData.title.trim()) return;

    const newSubtask = {
      ...subtaskData,
      id: `task-${Date.now()}`,
      status: "queue" as const,
      createdAt: Date.now(),
      timeInWork: 0,
      endDate: null,
      files: [],
      subtasks: [],
      comments: [],
      parentTaskId: data.id,
    };

    dispatch(addSubtask(data.id, newSubtask));

    setSubtaskData({
      title: "",
      description: "",
      priority: "medium" as "low" | "medium" | "high",
    });
  };

  return (
    <>
      <section className="task-info__subtasks-section">
        <div className="task-info__subtasks-header">
          <h4>Subtasks</h4>
          <button
            className="task-info__subtasks-button"
            onClick={() => setShowSubtaskForm(!showSubtaskForm)}
          >
            {showSubtaskForm ? "Cancel" : "Create"}
          </button>
        </div>

        {showSubtaskForm && (
          <form onSubmit={handleAddSubtask} className="subtask-form">
            <input
              type="text"
              placeholder="Subtask title"
              value={subtaskData.title}
              onChange={(e) =>
                setSubtaskData({ ...subtaskData, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Subtask description"
              value={subtaskData.description}
              onChange={(e) =>
                setSubtaskData({
                  ...subtaskData,
                  description: e.target.value,
                })
              }
            />
            <select
              value={subtaskData.priority}
              onChange={(e) =>
                setSubtaskData({
                  ...subtaskData,
                  priority: e.target.value as any,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add Subtask</button>
          </form>
        )}

        <div className="task-info__subtasks-list">
          {data.subtasks.map((subtaskId: string) => {
            const subtask = tasks[subtaskId];
            return subtask ? (
              <div className="subtask" key={subtaskId}>
                <span>{subtask.title}</span>
                <button onClick={() => handleOpenSubtask(subtaskId)}>
                  open
                </button>
              </div>
            ) : null;
          })}
        </div>
      </section>
      {selectedSubtask && tasks[selectedSubtask] && (
        <ViewTaskModal
          isOpen={true}
          onClose={handleCloseSubtaskModal}
          data={tasks[selectedSubtask]}
        />
      )}
    </>
  );
};

export default SubtaskComponent;
