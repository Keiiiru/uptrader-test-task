import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../app/store/actions/tasks";
import Modal from "../../../../widgets/Modal/Modal";
import "./index.sass";

const CreateTaskModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (arg0: any) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [files, setFiles] = useState<
    Array<{ name: string; content: string | ArrayBuffer | null }>
  >([]);
  const dispatch = useDispatch();

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arrayFiles = [];
      for (let i = 0; i < e.target.files.length; i++) {
        arrayFiles.push({
          name: e.target.files[i].name,
          content: await toBase64(e.target.files[i]),
        });
      }

      setFiles(arrayFiles);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log(files);
    e.preventDefault();
    dispatch(
      createTask({
        title,
        description,
        priority,
        files,
        status: "queue",
        createdAt: Date.now(),
      })
    );
    onClose((prev: any) => !prev);
  };

  return (
    <Modal onClose={() => onClose((prev: boolean) => !prev)} isOpen={isOpen}>
      <form className="create-task-form" onSubmit={handleFormSubmit}>
        <h2 className="form-title">Create New Task</h2>

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
                ? `${files.length} files selected`
                : "Choose files..."}
            </span>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
