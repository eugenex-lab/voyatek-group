// utils/date-picker.tsx
import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  onChange: (date: Date | undefined) => void;
  value: Date | undefined;
  placeholder?: string;
}

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

DatePicker.displayName = "DatePicker";

export default DatePicker;
