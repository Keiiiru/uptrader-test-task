import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../../widgets/Modal/Modal";
import { addProject } from "../../../../app/store/actions/projects";

const CreateProjectModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (arg0: any) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    dispatch(addProject(title, description));
    onClose((prev: any) => !prev);
  };

  return (
    <Modal onClose={() => onClose((prev: boolean) => !prev)} isOpen={isOpen}>
      <form className="create-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Project name"
          value={title}
          className="create-form__input"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="create-form__text-area"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="create-form__button">
          Create
        </button>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
