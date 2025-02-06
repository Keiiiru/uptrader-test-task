import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../../widgets/Modal/Modal";
import "./index.sass";
import { deleteTask, updateTask } from "../../../../app/store/actions/tasks";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: (arg0: any) => void;
  task: any;
}

const EditTaskModal = ({ isOpen, onClose, task }: EditTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setFiles(task.files || []);
    }
  }, [task]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateTask({
        ...task,
        taskId: task.id,
        title,
        description,
        priority,
        files: [...(task.files || []), ...files],
      })
    );
    console.log(task);

    onClose(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose(false);
  };

  return (
    <Modal onClose={() => onClose(false)} isOpen={isOpen}>
      <form className="create-task-form" onSubmit={handleFormSubmit}>
        <h2 className="form-title">Edit Task</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Task title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="form-group">
          <label className="file-upload">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="file-input"
            />
            <span className="file-custom">
              {files.length > 0
                ? `${files.length} new files selected`
                : "Add more files..."}
            </span>
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Task
          </button>
          <div className="form-action-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              onClick={(e) => handleFormSubmit(e)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
