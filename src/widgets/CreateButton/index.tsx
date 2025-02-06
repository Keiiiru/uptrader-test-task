import React from "react";
import AddNew from "../../shared/icons/AddNew";
import "./index.sass";

const CreateButton = ({ setIsOpen }: { setIsOpen: (arg0: any) => void }) => {
  return (
    <button
      className="create-button"
      onClick={() => setIsOpen((prev: boolean) => !prev)}
    >
      <AddNew />
    </button>
  );
};

export default CreateButton;
