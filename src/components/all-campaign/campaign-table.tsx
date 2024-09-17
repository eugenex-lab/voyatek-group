import * as React from "react";
import {
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableLoader } from "./table-loading";
import { useLottieAnimation } from "@/lib/utils/lottie-animation";
import { apiService } from "@/service/api-service";
import { TableFilters } from "./table-filter";
import { columns } from "./column-table";
import { ErrorView } from "../commons/error-view";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";

export type Campaign = {
  id: number;
  campaignName: string;
  startDate: string;
  campaignStatus: string;
};

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "id", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Campaign[]>([]);
  const [fetchedData, setFetchedData] = React.useState<Campaign[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useLottieAnimation(12000);

  const handleClick = () => {
    setData(fetchedData);
    setStatusFilter(null);
    setDateRange(undefined);
    setLoading(true);
    navigate(0);
  };

  const fetchData = async () => {
    try {
      const fetchedData = await apiService.fetchCampaigns();
      setFetchedData(fetchedData);
      setData(fetchedData);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    let filteredData = fetchedData;

    if (statusFilter) {
      filteredData = filteredData.filter(
        (campaign) => campaign.campaignStatus === statusFilter
      );
    }

    if (dateRange) {
      const { from, to } = dateRange;
      filteredData = filteredData.filter((campaign) => {
        const campaignDate = new Date(campaign.startDate);
        return (!from || campaignDate >= from) && (!to || campaignDate <= to);
      });
    }

    setData(filteredData);
  }, [statusFilter, dateRange, fetchedData]);

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

  if (error) return <ErrorView errorMessage={error} onRetry={handleClick} />;

  return (
    <div className="relative w-full">
      <TableFilters
        table={table}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        fetchedData={fetchedData}
        setDateRange={setDateRange}
      />
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
