import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import layout
import DashboardLayout from "@/layouts/dashboard-layout";

// Import pages
import Campaign from "./pages/campaign";
import Overview from "./pages/overview";
import CreateCampaign from "./pages/create-campaign";
import CampaignDetails from "./pages/campaign-details";
import ErrorPage from "./pages/error";

// Define route configuration with layout flag
const routes = [
  {
    key: "overview",
    path: "/",
    component: Overview,
    layout: true, // Use DashboardLayout
  },
  {
    key: "campaign",
    path: "/campaign",
    component: Campaign,
    layout: true, // Use DashboardLayout
  },
  {
    key: "create-campaign",
    path: "/create-campaign",
    component: CreateCampaign,
    layout: true, // Use DashboardLayout
  },
  {
    key: "campaign-details",
    path: "/campaign/:id",
    component: CampaignDetails,
    layout: true, // Use DashboardLayout
  },
  {
    key: "error",
    path: "*",
    component: ErrorPage,
    layout: false, // Do not use DashboardLayout
  },
  {
    key: "404",
    path: "*",
    component: ErrorPage,
    layout: false, // Do not use DashboardLayout
  },
];

// RouterConfig component
const RouterConfig: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ key, path, component: Component, layout }) => (
          <Route
            key={key}
            path={path}
            element={
              layout ? (
                <DashboardLayout>
                  <Component />
                </DashboardLayout>
              ) : (
                <Component />
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default RouterConfig;
