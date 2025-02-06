// ProjectPage.tsx
import React, { useState } from "react";
import "./ProjectPage.sass";
import ListItem from "../../widgets/ListItem/ListItem";
import { useSelector } from "react-redux";
import CreateButton from "../../widgets/CreateButton";
import CreateProjectModal from "./ui/CreateProjectModal";
import { RootState } from "../../app/store/reducers/types/types";

const ProjectPage = ({ searchTerm }: { searchTerm: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const projects = useSelector((state: RootState) =>
    Object.values(state.projects.entities).filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        project.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim())
    )
  );

  return (
    <>
      <div className="projects-container">
        {projects.length === 0 ? (
          <div className="no-projects-message"></div>
        ) : (
          <ul className="projects-list">
            {projects.map((project) => (
              <li key={project.id} className="projects-list__item">
                <ListItem data={project} type="project">
                  <div className="project-meta">
                    <span>Tasks: {(project.taskIds || []).length}</span>
                  </div>
                </ListItem>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CreateButton setIsOpen={setIsOpen} />
      <CreateProjectModal isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
};

export default ProjectPage;
