import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import CreatePage from "../pages/CreatePage";
import CreateNote from "../components/Notes/CreateNote";
import NoteList from "../components/Notes/NoteList";
import NoteDetail from "../components/Notes/NoteDetail";
import CreateTask from "../components/Tasks/CreateTask";
import TaskList from "../components/Tasks/TaskList";
import TaskDetail from "../components/Tasks/TaskDetail";
import AuthPage from "../pages/AuthPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />}>
            <Route index element={<CreatePage />} />
            <Route path="notes" element={<NoteList />} />
            <Route path="notes/:id" element={<NoteDetail />} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/:id" element={<TaskDetail/>} />
        </Route>  
        <Route path="create-note" element={<CreateNote />} />
        <Route path="create-task" element={<CreateTask/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;