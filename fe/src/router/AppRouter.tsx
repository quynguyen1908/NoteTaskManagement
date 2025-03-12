import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import CreatePage from "../pages/CreatePage";
import CreateNote from "../components/Notes/CreateNote";
import NoteList from "../components/Notes/NoteList";
import NoteDetail from "../components/Notes/NoteDetail";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
            <Route index element={<CreatePage />} />
            <Route path="notes" element={<NoteList />} />
            <Route path="notes/:id" element={<NoteDetail />} />
        </Route>
        <Route path="create-note" element={<CreateNote />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;