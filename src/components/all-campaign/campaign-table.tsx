import * as React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiService } from "@/service/api-service";
import { TableLoader } from "./table-loading";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { Search } from "lucide-react";

export type Campaign = {
  id: number;
  campaignName: string;
  startDate: string;
  campaignStatus: string;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold">S/N</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "campaignName",
    header: "Campaign",
    cell: ({ row }) => <div>{row.getValue("campaignName")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "campaignStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("campaignStatus");
      let statusClass = "";
      switch (status) {
        case "Active":
          statusClass = "text-primary-success font-bold text-xs";
          break;
        case "Inactive":
          statusClass = "text-destructive font-bold text-xs";
          break;
        default:
          statusClass = "font-bold";
      }
      return <div className={`${statusClass} uppercase`}>{status}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const campaign = row.original;

      return (
        <>
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
                    <Button variant="ghost">
                      <Icon
                        icon="material-symbols:delete-outline"
                        width="24"
                        height="24"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Campaign</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0 lg:hidden">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="">
                  <div className="block lg:hidden">
                    {/* For small screens */}
                    <DropdownMenuItem> Detail</DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Campaign[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await apiService.fetchCampaigns();
        if (statusFilter) {
          setData(
            fetchedData.filter(
              (campaign: any) => campaign.campaignStatus === statusFilter
            )
          );
        } else {
          setData(fetchedData);
        }
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [statusFilter]); // Re-run when statusFilter changes

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (error) return <div>{error}</div>;

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center gap-4 py-4 lg:flex-nowrap">
        <div className="flex flex-row items-center gap-2">
          {["All", "Active", "Inactive"].map((status) => (
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
              {status}
            </Button>
          ))}
        </div>

        <div className="relative lg:w-1/3">
          <Input
            placeholder="Search Campaigns..."
            value={
              (table.getColumn("campaignName")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("campaignName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm text-muted-foreground"
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
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="min-h-40">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <TableLoader />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="bottom-0 flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} row(s) of{" "}
          {table.getFilteredRowModel().rows.length} total.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
