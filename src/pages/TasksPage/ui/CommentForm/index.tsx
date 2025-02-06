import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../../../app/store/actions/comments";
import "./index.sass";

interface CommentFormProps {
  taskId: string;
  parentCommentId?: string | null;
  onCancel?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  taskId,
  parentCommentId = null,
}) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const currentUser = "Anonymous";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(createComment(text, currentUser, taskId, parentCommentId));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="comment..."
        className="comment-form__input"
      />
      <button type="submit" className="comment-form__button">
        {parentCommentId ? "Reply" : "Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
