import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "@/service/api-service";
import PageLoading from "../commons/page-loading";
import { ErrorView } from "../commons/error-view";
import { Button } from "../ui/button";
import CampaignInfo from "./campaign-info";
import { Icon } from "@iconify/react";

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        <div>Campaign status</div>
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
