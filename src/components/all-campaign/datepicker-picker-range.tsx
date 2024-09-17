import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showExportButton?: boolean;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  showExportButton = false,
  onDateRangeChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  React.useEffect(() => {
    if (onDateRangeChange) {
      onDateRangeChange(date);
    }
  }, [date, onDateRangeChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-row flex-wrap w-full gap-2 md:flex-nowrap">
            <Button
              id="date"
              variant={"outlineSec"}
              className={cn(
                "justify-start text-left font-normal space-x-2 text-muted-foreground text-xs",
                !date && "text-primary"
              )}
            >
              <CalendarIcon className="w-4 h-4 text-primary" />
              <span className="text-black">Date Range</span>

              <Separator
                className="h-4 p-[0.5px] mr-1"
                orientation="vertical"
              />
              <span>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span className="text-muted-foreground">Pick a date</span>
                )}
              </span>
              <Icon
                icon="gg:chevron-down"
                className="h-8 pl-1 w-7 text-primary"
              />
            </Button>
            {showExportButton && (
              <Button variant={"secondary"} className="space-x-1 text-primary">
                <Icon
                  icon="carbon:export"
                  width="18"
                  height="18"
                  className="pl-1"
                />
                <span className="">Export</span>
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="absolute w-auto p-0 -left-5" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
