import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HelpCard from "./help-card";
import logo from "@/assets/logo.png";
import { apiService } from "@/service/api-service";
import { handleError } from "@/service/error-handler";
import { toast } from "@/hooks/use-toast";

interface SidebarMobileProps {
  onClose: () => void;
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCampaignCount, setActiveCampaignCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [error, setError] = useState<string | null>(null);

  // Navigate and close sidebar function
  const handleClick = (to: string) => {
    navigate(to);
    onClose(); // Close sidebar after navigation
  };

  // Fetch active campaign count
  useEffect(() => {
    const fetchActiveCampaignCount = async () => {
      setLoading(true);
      try {
        const count = await apiService.fetchActiveCampaigns();
        setActiveCampaignCount(count);
      } catch (error) {
        const errorMsg = handleError(error);
        setError(errorMsg);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMsg,
        });
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };
    fetchActiveCampaignCount();
  }, []);

  return (
    <div className="flex flex-col md:hidden">
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

        {/* Overview Link */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
            location.pathname === "/"
              ? "bg-white text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Link
            to="/"
            className="flex items-center w-full gap-3"
            onClick={() => handleClick("/")}
          >
            <Icon icon="carbon:meter" className="w-5 h-5 font-bold" />
            Overview
          </Link>
        </div>

        {/* Campaign Link */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
            location.pathname === "/campaign"
              ? "bg-white text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Link
            to="/campaign"
            className="flex items-center w-full gap-3"
            onClick={() => handleClick("/campaign")}
          >
            <Icon
              icon="material-symbols:campaign-outline"
              className="w-5 h-5 font-bold"
            />
            Campaign
            <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
              {loading ? (
                <Icon
                  icon="line-md:loading-alt-loop"
                  width="20"
                  height="20"
                  className="text-red"
                />
              ) : (
                activeCampaignCount
              )}
            </Badge>
          </Link>
        </div>

        {/* Market Intelligence Link */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
            location.pathname === "/market-intelligence"
              ? "bg-white text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Link
            to="/market-intelligence"
            className="flex items-center w-full gap-3"
            onClick={() => handleClick("/market-intelligence")}
          >
            <Icon icon="tabler:bulb" className="w-5 h-5 font-bold" />
            Market Intelligence
          </Link>
        </div>

        {/* Account Settings Link */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
            location.pathname === "/account-settings"
              ? "bg-white text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Link
            to="/account-settings"
            className="flex items-center w-full gap-3"
            onClick={() => handleClick("/account-settings")}
          >
            <Icon
              icon="fluent:settings-20-regular"
              className="w-5 h-5 font-bold"
            />
            Account Settings
          </Link>
        </div>
      </nav>
      {/* Help card at the bottom */}
      <div className="p-4 mt-auto">
        <HelpCard />
      </div>
    </div>
  );
};

export default SidebarMobile;
