import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentForm from "../CommentForm";
import "./index.sass";
import { RootState } from "../../../../app/store/reducers/types/types";

const CommentTree = ({ commentId }: { commentId: string }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const comment = useSelector(
    (state: RootState) => state.comments.entities[commentId]
  );

  if (!comment) return null;

  return (
    <div className="comment-tree">
      <div className="comment">
        <div className="comment__content">
          <p className="comment__text">{comment.text}</p>

          <button
            className="comment__reply-btn"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Reply
          </button>
        </div>

        {showReplyForm && (
          <div className="comment__reply-form">
            <CommentForm
              taskId={comment.taskId}
              parentCommentId={comment.id}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}

        {comment.children.length > 0 && (
          <div className="comment__replies">
            {comment.children.map((childId) => (
              <CommentTree key={childId} commentId={childId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentTree;
