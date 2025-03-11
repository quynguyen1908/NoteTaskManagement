import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import CreatePage from "../pages/CreatePage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
            <Route index element={<CreatePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;