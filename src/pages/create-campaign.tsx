import React from "react";
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
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import PageLayout from "@/layouts/page-layout";

interface DatePickerProps {
  onChange: (date: Date | undefined) => void;
  value: Date | undefined;
  placeholder?: string;
}

// Corrected DatePicker component with TypeScript
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ onChange, value, placeholder }, ref) => {
    const [date, setDate] = React.useState<Date | undefined>(value);

    const handleSelect = (newDate: Date | undefined) => {
      setDate(newDate);
      onChange(newDate);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"muted"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            ref={ref}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

// Form schema definition
const formSchema = z.object({
  campaignName: z.string().min(2, {
    message: "Campaign Name must be at least 2 characters.",
  }),
  campaignDescription: z.string().optional(),
  startDate: z.date({
    required_error: "Start Date is required.",
  }),
  endDate: z.date().optional(),
  dailyDigest: z.enum(["yes", "no"]),
  linkedKeywords: z.string().min(1, {
    message: "Linked Keywords are required.",
  }),
  frequency: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Main form component
export function CreateCampaign() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignName: "",
      campaignDescription: "",
      startDate: undefined,
      endDate: undefined,
      dailyDigest: "no",
      linkedKeywords: "",
      frequency: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log(data);
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
                  <FormLabel>Campaign Description</FormLabel>
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
                    <FormLabel>End Date</FormLabel>
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
              name="dailyDigest"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between w-full">
                  <FormLabel>
                    Want to receive daily digest about the campaign?
                  </FormLabel>
                  <div>
                    <FormControl>
                      <Switch
                        checked={field.value === "yes"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "yes" : "no")
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Linked Keywords */}
            <FormField
              control={form.control}
              name="linkedKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Kindly select how often you want to receive daily digest
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-24"
                      placeholder="To add keywords, type your keyword and press enter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Frequency of Daily Digest */}
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency of Daily Digest</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
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
              <Button type="submit" size="lg" width={"lg"}>
                Create Campaign
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}
