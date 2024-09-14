import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Plus } from "lucide-react";
import { Icon } from "@iconify/react";
import { navItems } from "@/lib/constants/nav-items";
import HelpCard from "../components/help-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-campaign");
  };

  const renderNavItems = useMemo(() => {
    return navItems.map(({ to, icon, label, badge }) => (
      <div
        key={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
          location.pathname === to
            ? "bg-white text-primary"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        <Link to={to} className="flex items-center w-full gap-3">
          <Icon icon={icon} className="w-5 h-5 font-bold" />
          {label}
          {badge && (
            <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
              {badge}
            </Badge>
          )}
        </Link>
      </div>
    ));
  }, [location.pathname]);

  return (
    <div className="hidden border-r bg-muted md:block">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-20 items-center px-4 lg:h-[100px] lg:px-10">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src={logo} alt="Logo" />
            <h3 className="font-bold bg-gradient-text text-gradient-text bg-clip-text">
              Scrutz
            </h3>
          </Link>
        </div>

        <div>
          <nav className="grid items-start p-2 space-y-3 text-sm font-medium lg:px-8 lg:pr-12">
            <Button
              onClick={handleClick}
              className="flex items-center mt-2 mb-6 space-x-2 lg:mt-3"
            >
              <Plus className="w-5 h-5 text-white" />
              <span>New Campaign</span>
            </Button>
            {renderNavItems}
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <HelpCard />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
