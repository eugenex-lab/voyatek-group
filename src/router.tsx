// RouterConfig.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import layout
import DashboardLayout from "@/layouts/dashboard-layout";

// Import pages
import Campaign from "./pages/campaign";
import Overview from "./pages/overview";
import  CreateCampaign  from "./pages/create-campaign";

// Define route configuration
const routes = [
  {
    key: "overview",
    path: "/",
    component: Overview,
  },
  {
    key: "campaign",
    path: "/campaign",
    component: Campaign,
  },
  {
    key: "create-campaign",
    path: "/create-campaign",
    component: CreateCampaign,
  },
];

// RouterConfig component
const RouterConfig: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ key, path, component: Component }) => (
          <Route
            key={key}
            path={path}
            element={
              <DashboardLayout>
                <Component />
              </DashboardLayout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default RouterConfig;
