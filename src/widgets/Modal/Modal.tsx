import React, { ReactNode } from "react";
import "./Modal.sass";
import CrossIcon from "../../shared/icons/CrossIcon";
import { createPortal } from "react-dom";

type Props = {
  onClose: (arg0: any) => void;
  children: ReactNode;
  isOpen: boolean;
};

const Modal = ({ onClose, children, isOpen }: Props) => {
  if (isOpen) {
    return createPortal(
      <>
        {isOpen && (
          <div className="modal-container">
            <header className="modal-container__modal-header">
              <h3 className="modal-container__modal-title">Create</h3>
              <button
                className="modal-container__button"
                onClick={() => onClose((prev: boolean) => !prev)}
              >
                <CrossIcon />
              </button>
            </header>

            <main className="modal-container__content">{children}</main>
          </div>
        )}
        <div className="modal-background" />
      </>,
      document.getElementById("modal") as HTMLElement
    );
  }
};

export default Modal;
