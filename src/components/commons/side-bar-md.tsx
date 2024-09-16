import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Plus } from "lucide-react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HelpCard from "./help-card";
import { apiService } from "@/service/api-service";
import { handleError } from "@/service/error-handler";
import { toast } from "@/hooks/use-toast";

const SidebarMd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCampaignCount, setActiveCampaignCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    navigate("/create-campaign");
  };

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
        // Handle error (e.g., show a toast notification or error message)
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };
    fetchActiveCampaignCount();
  }, []);

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

            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/"
                  ? "bg-white text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Link to="/" className="flex items-center w-full gap-3">
                <Icon icon="carbon:meter" className="w-5 h-5 font-bold" />
                Overview
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/campaign"
                  ? "bg-white text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Link to="/campaign" className="flex items-center w-full gap-3">
                <Icon
                  icon="material-symbols:campaign-outline"
                  className="w-5 h-5 font-bold"
                />
                Campaign
                <Badge className="flex items-center justify-center w-6 h-6 p-0 ml-auto rounded-full shrink-0">
                  {loading ? (
                    <Icon
                      icon="line-md:loading-alt-loop"
                      width="50"
                      height="50"
                      className="text-red"
                    />
                  ) : (
                    activeCampaignCount > 0 && activeCampaignCount
                  )}
                </Badge>
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === ""
                  ? "bg-white text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Link to="#" className="flex items-center w-full gap-3">
                <Icon icon="tabler:bulb" className="w-5 h-5 font-bold" />
                Market Intelligence
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "#"
                  ? "bg-white text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Link to="#" className="flex items-center w-full gap-3">
                <Icon
                  icon="fluent:settings-20-regular"
                  className="w-5 h-5 font-bold"
                />
                Account Settings
              </Link>
            </div>
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <HelpCard />
        </div>
      </div>
    </div>
  );
};

export default React.memo(SidebarMd);
