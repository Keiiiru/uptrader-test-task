import React, { ReactNode, useState, useRef } from "react";
import "./ListItem.sass";
import ArrowIcon from "../../shared/icons/ArrowIcon";
import { Link } from "react-router-dom";
import { SET_CURRENT_PROJECT } from "../../app/store/types";
import { useDispatch } from "react-redux";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  children: ReactNode;
  data: any;
  type: string;
};

const ListItem = ({ children, data, type }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { setNodeRef } = useDroppable({
    id: data.title?.toLowerCase(),
    data: {
      accepts: [data.title?.toLowerCase()],
    },
  });

  const dispatch = useDispatch();

  const handleOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOpen(!open);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className={`item-container ${open ? "open" : ""}`} ref={setNodeRef}>
      <div className="item-container__header">
        {type === "project" ? (
          <Link
            to={`/project/${data.id}`}
            className="item-container__link"
            onClick={() =>
              dispatch({
                type: SET_CURRENT_PROJECT,
                payload: data.id,
              })
            }
          >
            {data.name}
          </Link>
        ) : (
          <h2 className="item-container__link">{data.title}</h2>
        )}
        <button
          className="item-container__button"
          onClick={handleOpen}
          aria-expanded={open}
          aria-label={open ? "Collapse" : "Expand"}
        >
          <ArrowIcon
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </button>
      </div>
      <div
        className={`item-container__content ${open ? "visible" : ""}`}
        ref={contentRef}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default ListItem;
