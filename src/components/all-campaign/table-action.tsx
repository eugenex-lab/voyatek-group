import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Campaign } from "./campaign-table";
import { DeleteCampaignDialog } from "../dialogs/delete-campaign";
import { apiService } from "@/service/api-service";

export function TableActions({
  campaign,
  refreshData, // Add refreshData prop
}: {
  campaign: Campaign;
  refreshData: () => void; // Define the function signature for refresh
}) {
  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteCampaign(id); // Assuming you have a deleteCampaign API service
      refreshData(); // Call the refresh function after deletion
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const handleGoBack = () => {
    console.log("Go back action triggered.");
  };

  return (
    <div className="items-center justify-center lg:flex">
      <div className="flex-row hidden mt-2 lg:flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Icon icon="ci:show" width="24" height="24" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuSeparator />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Icon icon="mage:edit" width="24" height="24" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit this campaign</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuSeparator />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DeleteCampaignDialog
                campaignId={String(campaign.id)}
                campaignName={campaign.campaignName || "Unnamed Campaign"}
                onDelete={handleDelete}
                onGoBack={handleGoBack}
                refreshData={refreshData} // Pass the refreshData prop
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Campaign</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="lg:hidden">
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DeleteCampaignDialog
              campaignId={String(campaign.id)}
              campaignName={campaign.campaignName || "Unnamed Campaign"}
              onDelete={handleDelete}
              onGoBack={handleGoBack}
              refreshData={refreshData} // Pass the refreshData prop
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
