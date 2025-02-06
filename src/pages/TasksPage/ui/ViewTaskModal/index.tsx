import React, { useState } from "react";
import Modal from "../../../../widgets/Modal/Modal";
import CommentTree from "../CommentTree";
import CommentForm from "../CommentForm";
import "./index.sass";
import TaskInfoHeader from "./TaskInfoHeader";
import SubtaskComponent from "./Subtask";
import EditTaskModal from "../EditTaskModal";

const ViewTaskModal = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: (arg0: any) => void;
  data: any;
}) => {
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <div className="task-info">
          <TaskInfoHeader data={data} open={setEditIsOpen} />

          <span className="task-info__description">{data.description}</span>

          <section className="file">
            {data.files.map((file: { name: string; content: string }) => (
              <a download={file.name} href={file.content}>
                {file.name}
              </a>
            ))}
          </section>

          <SubtaskComponent data={data} />

          <section className="task-info__comments-section">
            <h3 className="task-info__comments-header">Comments</h3>
            <div className="task-info__comments-list">
              {data.comments.map((commentId: number, index: number) => (
                <CommentTree key={index} commentId={String(commentId)} />
              ))}
            </div>
            <CommentForm taskId={data.id} />
          </section>

          <footer className="task-info__task-meta">
            <span className="task-info__created-at">
              Created: {new Date(data.createdAt).toLocaleDateString()}
            </span>
            <span className="task-info__status">Status: {data.status}</span>
          </footer>
        </div>
      </Modal>
      <EditTaskModal isOpen={editIsOpen} onClose={setEditIsOpen} task={data} />
    </>
  );
};

export default ViewTaskModal;
