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
import DatePicker from "../create-campaign/form-date-picker";
import { DeleteCampaignDialog } from "../dialogs/delete-campaign";
import { useParams } from "react-router-dom";

// Define the schema with zod for validation
const formSchema = z.object({
  campaignName: z.string().min(2),
  campaignDescription: z.string().min(2),
  startDate: z.date(),
  endDate: z.date(),
  digestCampaign: z.string(),
  linkedKeywords: z.array(z.string()).min(1),
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

  // Get id from the URL params
  const { id } = useParams<{ id: string }>(); // The id will be extracted from the URL

  // Log or perform actions with the campaign id from URL
  useEffect(() => {
    if (id) {
      console.log(`Campaign ID from URL params: ${id}`);
      // You can fetch the campaign details using the id here if necessary
    }
  }, [id]);

  const handleUpdateCampaign = async () => {};

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
        <FormField
          control={form.control}
          name="linkedKeywords"
          render={() => (
            <FormItem>
              <FormLabel>Linked Keywords</FormLabel>
              <FormControl>
                <div
                  className={`flex flex-wrap p-1 border rounded-md min-h-24 bg-transparent ${
                    !isEditing ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {form
                    .getValues("linkedKeywords")
                    .map((keyword: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center h-6 p-1 px-2 m-1 text-white rounded-sm bg-primary "
                      >
                        <span className="text-sm text-center min-w-10">
                          {keyword}
                        </span>
                        {isEditing && (
                          <button
                            type="button"
                            className="ml-1 text-white"
                            onClick={() => {
                              const updatedKeywords = form
                                .getValues("linkedKeywords")
                                .filter((_: any, i: any) => i !== index);
                              form.setValue("linkedKeywords", updatedKeywords);
                            }}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                </div>
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
            {isEditing ? "Save Changes" : "Edit Information"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampaignInfo;
