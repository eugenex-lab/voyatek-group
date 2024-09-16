import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Plus } from "lucide-react";
import { navItems } from "@/lib/constants/nav-items";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HelpCard from "./help-card";
import logo from "@/assets/logo.png";

interface SidebarMobileProps {
  onClose: () => void;
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigate and close sidebar function
  const handleClick = (to: string) => {
    navigate(to);
    onClose(); // Close sidebar after navigation
  };

  // Dynamically render the nav items with useMemo
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
        <Link
          to={to}
          className="flex items-center w-full gap-3"
          onClick={() => handleClick(to)} // Navigate and close the sidebar
        >
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
    <div className="flex flex-col md:hidden">
      {" "}
      {/* Hidden on medium and larger screens */}
      <div className="flex items-center justify-center px-4 h-14">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img src={logo} alt="Logo" className="" />
          <h3 className="font-bold bg-gradient-text text-gradient-text bg-clip-text">
            Scrutz
          </h3>
        </Link>
      </div>
      {/* Navigation and button for mobile sidebar */}
      <nav className="grid items-start p-4 space-y-3 text-sm font-medium">
        <Button
          onClick={() => handleClick("/create-campaign")}
          className="flex items-center mt-2 mb-6 space-x-2"
        >
          <Plus className="w-5 h-5 text-white" />
          <span>New Campaign</span>
        </Button>
        {renderNavItems}
      </nav>
      {/* Help card at the bottom */}
      <div className="p-4 mt-auto">
        <HelpCard />
      </div>
    </div>
  );
};

export default SidebarMobile;
