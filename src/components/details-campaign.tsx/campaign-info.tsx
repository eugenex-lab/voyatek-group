import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";

import DatePicker from "../create-campaign/form-date-picker";
import { DeleteCampaignDialog } from "../dialogs/delete-campaign";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { KeywordInput } from "../create-campaign/keyword-input";
import { toast } from "@/hooks/use-toast";
import { apiService } from "@/service/api-service";

// Define the schema with zod for validation
const formSchema = z.object({
  campaignName: z.string().min(2, {
    message: "Campaign Name must be at least 2 characters.",
  }),
  campaignDescription: z.string().min(2, {
    message: "Campaign Description must be at least 2 characters.",
  }),
  startDate: z.date({
    required_error: "Start Date is required.",
  }),

  endDate: z.date({
    required_error: "End Date is required.",
  }),
  digestCampaign: z.boolean(),
  linkedKeywords: z.array(z.string()).min(1, {
    message: "At least one keyword is required.",
  }),
  dailyDigest: z.string().optional(),
});

interface CampaignInfoProps {
  campaign: any;
  onUpdate?: () => void;
  onStop?: () => void;
}

const CampaignInfo: React.FC<CampaignInfoProps> = ({
  campaign,
  onUpdate,
  onStop,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignName: campaign.campaignName || "",
      campaignDescription: campaign.campaignDescription || "",
      startDate: campaign.startDate ? new Date(campaign.startDate) : undefined,
      endDate: campaign.endDate ? new Date(campaign.endDate) : undefined,
      digestCampaign: campaign.digestCampaign || "",
      linkedKeywords: campaign.linkedKeywords || [],
      dailyDigest: campaign.dailyDigest || "",
    },
  });
  const navigate = useNavigate();

  // Get id from the URL params
  const { id } = useParams<{ id: string }>(); // The id will be extracted from the URL

  // Log or perform actions with the campaign id from URL
  useEffect(() => {
    if (id) {
      console.log(`Campaign ID from URL params: ${id}`);
      // You can fetch the campaign details using the id here if necessary
    }
  }, [id]);

  const handleUpdateCampaign = async () => {
    setLoading(true);
    try {
      // Prepare data to match the API request format
      const formData = {
        id: id, // Use the ID from the URL params
        campaignName: form.getValues("campaignName"),
        campaignDescription: form.getValues("campaignDescription"),
        startDate: form.getValues("startDate")!.toISOString(),
        endDate: form.getValues("endDate")!.toISOString(),
        digestCampaign: form.getValues("digestCampaign") === "yes", // Convert to boolean
        linkedKeywords: form.getValues("linkedKeywords"),
        dailyDigest: form.getValues("dailyDigest") || "",
      };

      // Call the updateCampaign method
      await apiService.updateCampaign(id as string, formData);

      toast({
        variant: "default",
        title: "Success",
        description: "Campaign updated successfully.",
      });

      if (onUpdate) onUpdate();

      // Reload the page after successful update
      navigate(0);
    } catch (error: any) {
      setError(error.message || "Failed to update campaign.");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update campaign.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {};

  return (
    <Form {...form}>
      <form
        className="space-y-4 text-muted-foreground"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Campaign Name */}
        <FormField
          control={form.control}
          name="campaignName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEditing}
                  placeholder="Campaign Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campaign Description */}
        <FormField
          control={form.control}
          name="campaignDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Description</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-24"
                  disabled={!isEditing}
                  placeholder="Campaign Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date and End Date */}
        <div className="flex flex-row w-full gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker disabled={!isEditing} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker disabled={!isEditing} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Linked Keywords */}
        {/* Linked Keywords */}
        <FormField
          control={form.control}
          name="linkedKeywords"
          render={() => (
            <FormItem>
              <FormLabel>
                Linked Keywords
                {isEditing && (
                  <span className="text-xs text-destructive"> *</span>
                )}
              </FormLabel>
              <FormControl>
                {/* If in editing mode, show interactive keyword input */}
                {isEditing ? (
                  <KeywordInput
                    keywords={form.getValues("linkedKeywords")}
                    setKeywords={(updatedKeywords: string[]) =>
                      form.setValue("linkedKeywords", updatedKeywords)
                    }
                  />
                ) : (
                  // When not editing, show keywords in a disabled view
                  <div
                    className={`flex flex-wrap p-1 border rounded-md min-h-24 bg-transparent cursor-not-allowed opacity-50`}
                  >
                    {form
                      .getValues("linkedKeywords")
                      .map((keyword: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center h-6 p-1 px-2 m-1 text-white rounded-sm bg-primary"
                        >
                          <span className="text-sm text-center min-w-10">
                            {keyword}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Digest Campaign */}
        <FormField
          control={form.control}
          name="digestCampaign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Want to receive daily digest about the campaign?
              </FormLabel>
              <FormControl>
                <Select
                  disabled={!isEditing}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Digest Options</SelectLabel>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Daily Digest Frequency */}
        <FormField
          control={form.control}
          name="dailyDigest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kindly select the time you want to receive daily digest
              </FormLabel>
              <FormControl>
                <Select
                  disabled
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Daily Digest Frequency</SelectLabel>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-start gap-4 pt-14">
          <DeleteCampaignDialog
            campaignId={id as string} // Use the id from params here
            campaignName={campaign.campaignName}
            onDelete={(id) => console.log(`Deleted campaign with id: ${id}`)}
            trigger={
              <Button
                variant="destructive"
                size="lg"
                width={"lg"}
                onClick={handleDelete}
              >
                Stop Campaign
              </Button>
            } // Custom trigger
          />
          <Button
            variant={isEditing ? "default" : "outline"}
            size="lg"
            width={"lg"}
            onClick={
              isEditing ? handleUpdateCampaign : () => setIsEditing(!isEditing)
            }
          >
            {loading ? (
              <Icon
                icon="line-md:loading-alt-loop"
                width="20"
                height="20"
                className="animate-spin"
              />
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Edit Information"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampaignInfo;
