import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/layouts/page-layout";
import DatePicker from "./form-date-picker";
import { apiService } from "@/service/api-service";
import { handleError } from "@/service/error-handler";
import { Icon } from "@iconify/react";
import { KeywordInput } from "./keyword-input";
import { SuccessDialog } from "../notification/create-campaign-scuccess";
import { toast } from "@/hooks/use-toast";

// Form schema definition
const formSchema = z.object({
  campaignName: z.string().min(2, {
    message: "Campaign Name must be at least 2 characters.",
  }),
  campaignDescription: z
    .string()
    .min(2, {
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

type FormValues = z.infer<typeof formSchema>;

// Form component
export function FormComponent() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignName: "",
      campaignDescription: "",
      startDate: undefined,
      endDate: undefined,
      digestCampaign: false,
      linkedKeywords: [],
      dailyDigest: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const minimumLoadingTime = 3000;
    try {
      const campaignData = {
        ...data,
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate ? data.endDate.toISOString() : null,
        linkedKeywords: keywords,
      };
      await apiService.createCampaign(campaignData);
      setIsSuccessDialogOpen(true);
      form.reset();
      setKeywords([]);
      form.clearErrors();
    } catch (error: any) {
      const errorMsg = handleError(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg, // This will now be "One or more validation errors occurred."
      });
    } finally {
      setTimeout(() => setIsLoading(false), minimumLoadingTime);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <PageLayout title="Create New Campaign">
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-muted-foreground"
          >
            {/* Campaign Name */}
            <FormField
              control={form.control}
              name="campaignName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Campaign Name{" "}
                    <span className="text-xs text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g The Future is now" {...field} />
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
                  <FormLabel>
                    Campaign Description{" "}
                    <span className="text-xs text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-24"
                      placeholder="Please add a description to your campaign"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date and End Date using DatePicker */}
            <div className="flex flex-row w-full gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>
                      Start Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker placeholder="Select start date" {...field} />
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
                    <FormLabel>
                      End Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker placeholder="Select end date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Daily Digest */}
            <FormField
              control={form.control}
              name="digestCampaign"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between w-full">
                  <FormLabel>
                    Want to receive daily digest about the campaign?
                  </FormLabel>
                  <div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange} // Handle boolean directly
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Keyword Input */}
            <FormField
              control={form.control}
              name="linkedKeywords"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Linked Keywords
                    <span className="text-xs text-destructive"> *</span>
                  </FormLabel>
                  <KeywordInput
                    keywords={keywords}
                    setKeywords={setKeywords}
                    setFormValue={(name: "linkedKeywords", value: string[]) =>
                      form.setValue(name, value)
                    }
                    name="linkedKeywords"
                  />
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
                    How often would you like to receive the digest?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
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

            {/* Submit and Cancel */}
            <div className="flex justify-start gap-4 pt-14">
              <Button
                variant="outline"
                onClick={handleClick}
                size="lg"
                width={"lg"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                width={"lg"}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? (
                  <Icon
                    icon="eos-icons:three-dots-loading"
                    width="25"
                    height="25"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <SuccessDialog
          isOpen={isSuccessDialogOpen}
          onClose={() => setIsSuccessDialogOpen(false)}
        />
      </div>
    </PageLayout>
  );
}
