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

interface TableFiltersProps {
  table: Table<any>;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  data: any[]; // Make sure to type this correctly according to your data structure
  fetchedData: any[];
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  table,
  statusFilter,
  setStatusFilter,
  data,
  fetchedData,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 lg:flex-nowrap">
      <div className="flex flex-row items-center gap-2">
        {["All", "Active", "Inactive"].map((status) => {
          // Count the number of campaigns for each status based on the original fetched data
          const statusCount =
            status === "All"
              ? fetchedData.length // All campaigns
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="items-center justify-center hidden ml-auto lg:flex"
          >
            <span>Columns</span>
            <ChevronDownIcon className="w-4 h-4 ml-2" />
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
