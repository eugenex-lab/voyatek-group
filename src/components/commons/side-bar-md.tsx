import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

import HelpCard from "./help-card";

const SidebarMd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    navigate("/create-campaign");
  };

  const sidebarItems = [
    { path: "/campaign", label: "Activities", icon: "ph:road-horizon-bold" },
    {
      path: "#",
      label: "Hotels",
      icon: "hugeicons:building-03",
    },
    {
      path: "#",
      label: "Flight",
      icon: "stash:airplane-light",
    },
    {
      path: "#",
      label: "Study",
      icon: "ph:student",
    },
    {
      path: "#",
      label: "Visa",
      icon: "ph:newspaper-clipping-light",
    },
    {
      path: "#",
      label: "Immigration",
      icon: "bi:suitcase",
    },
    {
      path: "#",
      label: "Medical",
      icon: "ic:outline-medical-services",
    },
    {
      path: "#",
      label: "Vacation Package",
      icon: "mage:package-box",
    },
  ];

  return (
    <div className="hidden w-full bg-white border-r rounded md:block border-radius max-w-72">
      <div className="flex flex-col h-full max-h-screen gap-2 py-4">
        <div>
          <nav className="grid items-start p-2 space-y-3 text-sm font-medium lg:px-8 lg:pr-12">
            {sidebarItems.map((item) => (
              <div
                key={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-white text-muted-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Link to={item.path} className="flex items-center w-full gap-3">
                  <Icon icon={item.icon} className="w-5 h-5 font-bold" />
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 pt-14">
          <HelpCard />
        </div>
      </div>
    </div>
  );
};

export default React.memo(SidebarMd);
