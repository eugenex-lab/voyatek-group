import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Search, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./datepicker-picker-range";

interface TableFiltersProps {
  table: Table<any>;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  fetchedData: any[];
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  table,
  statusFilter,
  setStatusFilter,
  fetchedData,
  setDateRange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 ">
      <div className="flex flex-row items-center gap-2">
        {["All", "Active", "Inactive"].map((status) => {
          const statusCount =
            status === "All"
              ? fetchedData.length
              : fetchedData.filter(
                  (campaign) => campaign.campaignStatus === status
                ).length;

          return (
            <Button
              key={status}
              variant="outline"
              className={`${
                statusFilter === (status === "All" ? null : status)
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              }`}
              onClick={() => setStatusFilter(status === "All" ? null : status)}
            >
              {status} ({statusCount})
            </Button>
          );
        })}
      </div>

      <div className="relative">
        <Input
          placeholder="Search Campaigns..."
          value={
            (table.getColumn("campaignName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("campaignName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-muted-foreground lg:max-w-md"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>

      <DatePickerWithRange
        className="hidden ml-auto xl:block"
        onDateRangeChange={setDateRange}
      />


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outlineSec"
            className="items-center justify-center hidden lg:flex"
          >
            <span className="text-muted-foreground">Columns</span>
            <ChevronDownIcon className="w-6 h-6 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
