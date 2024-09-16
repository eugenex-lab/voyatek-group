import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "@/service/api-service";
import PageLoading from "../commons/page-loading";
import { ErrorView } from "../commons/error-view";
import { Button } from "../ui/button";
import CampaignInfo from "./campaign-info";
import { Icon } from "@iconify/react";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const fetchCampaignDetails = async () => {
    try {
      const data = await apiService.getCampaignById(id as string);
      setCampaign(data);
    } catch (err) {
      setError("Failed to fetch campaign details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaignStatus = async () => {
    if (!campaign) return;

    setStatusLoading(true);
    try {
      const updatedStatus = campaign.campaignStatus !== "Active"; // Toggle the status
      await apiService.updateCampaignStatus(id as string, updatedStatus);
      setCampaign((prev: any) => ({
        ...prev,
        campaignStatus: updatedStatus ? "Active" : "Inactive",
      }));
      navigate(0);
    } catch (err) {
      console.error("Error updating campaign status:", err);
    } finally {
      setStatusLoading(false);
    }
  };

  const goBack = () => {
    navigate("/campaign");
  };

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  if (loading) return <PageLoading />;

  if (error)
    return <ErrorView errorMessage={error} onRetry={fetchCampaignDetails} />;

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        className="gap-2 pl-0 text-muted-foreground"
        onClick={goBack}
      >
        <Icon
          className="font-semibold "
          icon="ph:arrow-left-bold"
          width="18"
          height="18"
        />
        <span className="font-semibold ">Back</span>
      </Button>
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        <h1 className="text-lg font-bold md:text-2xl text-primary">
          Campaign Information
        </h1>
        <div>
          {" "}
          <div className="flex items-center h-10 px-4 py-2 text-sm rounded-md bg-tertiary">
            <div className="text-black">Campaign Status</div>
            <Separator
              orientation="vertical"
              className="border-[1px] mx-2 bg-muted-foreground"
            />

            <div className="flex items-center">
              {loading ? (
                <Icon
                  icon="line-md:loading-alt-loop"
                  width="50"
                  height="50"
                  className="text-red animate-spin"
                />
              ) : (
                <div
                  className={
                    campaign?.campaignStatus === "Inactive"
                      ? "text-destructive"
                      : "text-primary"
                  }
                >
                  {campaign?.campaignStatus === "Inactive"
                    ? "Inactive"
                    : "Active"}
                </div>
              )}
            </div>

            <Separator orientation="vertical" className="border-[1px] mx-2" />

            {isStatusUpdating ? (
              <Icon
                icon="line-md:loading-alt-loop"
                width="20"
                height="20"
                className="animate-spin"
              />
            ) : (
              <Switch
                checked={campaign?.campaignStatus === "Active"}
                onCheckedChange={toggleCampaignStatus}
                id="campaign-status"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4 p-6 border rounded-lg shadow-sm lg:gap-10 lg:p-10 min-h-[800px]">
        {campaign ? (
          <CampaignInfo campaign={campaign} />
        ) : (
          <div>No campaign details found.</div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
