import React, { useEffect } from "react";
import { format, formatISO } from "date-fns";

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
import { useNavigate, useParams } from "react-router-dom";
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
      digestCampaign: campaign.digestCampaign || false,
      linkedKeywords: campaign.linkedKeywords || [],
      dailyDigest: campaign.dailyDigest || "",
    },
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      console.log(`Campaign ID from URL params: ${id}`);
    }
  }, [id]);
  const handleUpdateCampaign = async (data: any) => {
    setLoading(true);
    try {
      const formData = {
        id: id,
        campaignName: data.campaignName,
        campaignDescription: data.campaignDescription,
        // Convert date objects back to ISO strings for submission
        startDate: data.startDate ? formatISO(data.startDate) : null,
        endDate: data.endDate ? formatISO(data.endDate) : null,
        digestCampaign: data.digestCampaign === "yes",
        linkedKeywords: data.linkedKeywords,
        dailyDigest: data.dailyDigest || "",
      };

      await apiService.updateCampaign(id as any, formData);

      toast({
        variant: "success",
        title: "Success",
        description: "Campaign updated successfully.",
      });

      if (onUpdate) onUpdate();
      // navigate(0);
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

  const handleSubmit = form.handleSubmit(handleUpdateCampaign);

  const handleDelete = async () => {
    // Implementation for handleDelete
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 text-muted-foreground"
        onSubmit={handleSubmit} // Use handleSubmit to trigger validation and submission
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
                {isEditing ? (
                  <KeywordInput
                    keywords={form.getValues("linkedKeywords")}
                    setKeywords={(updatedKeywords: string[]) =>
                      form.setValue("linkedKeywords", updatedKeywords)
                    }
                    setFormValue={form.setValue}
                    name="linkedKeywords"
                  />
                ) : (
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
                  value={field.value ? true : false} // Use "true"/"false" for display
                  onValueChange={(value) => field.onChange(value === true)} // Convert to boolean
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Digest Options</SelectLabel>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Daily Digest Frequency */}
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
                  disabled={!isEditing} // Condition to disable or enable based on editing state
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Frequency</SelectLabel>
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
            disabled={loading} // Disable the button during loading
            onClick={isEditing ? handleSubmit : () => setIsEditing(!isEditing)}
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
