import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./pages/ProjectsPage/ProjectPage";
import LogoIcon from "./shared/icons/LogoIcon";
import TaskPage from "./pages/TasksPage/TaskPage";
import SearchIcon from "./shared/icons/SearchIcon";
import { Provider } from "react-redux";
import configureStore from "./app/store/configureStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <header className="app-header">
        <div className="app-header__left-side">
          <a href="/" className="app-header__logo">
            <LogoIcon />
          </a>
        </div>
      </header>

      <div className="app-search">
        <input
          type="text"
          className="app-search__input"
          placeholder={
            location.pathname === "/" ? "Search projects..." : "Search tasks..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="app-search__button">
          <SearchIcon />
        </button>
      </div>

      <Routes>
        <Route path="/" element={<ProjectPage searchTerm={searchTerm} />} />
        <Route
          path="/project/:projectId"
          element={<TaskPage searchTerm={searchTerm} />}
        />
      </Routes>
    </>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
