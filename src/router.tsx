// src/router.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Campaign from "./pages/campaign";
import Overview from "./pages/overview";

const RouterConfig: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/campaign" element={<Campaign />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default RouterConfig;
