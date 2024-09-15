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
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/json/empty-state.json";
import { useLottieAnimation } from "@/lib/utils/lottie-animation";

import { apiService } from "@/service/api-service";
import { TableFilters } from "./table-filter";
import { columns } from "./column-table";
import { useNavigate } from "react-router-dom";

export type Campaign = {
  id: number;
  campaignName: string;
  startDate: string;
  campaignStatus: string;
};

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

  const lottieRef = React.useRef(null);
  const { isPlaying, handleMouseEnter, handleMouseLeave } =
    useLottieAnimation(6000);

  const handleClick = () => {
    setData([]); // Clear the data
    setStatusFilter(null); // Reset the status filter to its default value
    setLoading(true); // Trigger loading state again
  };

  const fetchData = async () => {
    try {
      const fetchedData = await apiService.fetchCampaigns();
      if (statusFilter) {
        setData(
          fetchedData.filter(
            (campaign: { campaignStatus: string }) =>
              campaign.campaignStatus === statusFilter
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
  };

  React.useEffect(() => {
    fetchData();
  }, [statusFilter]);

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

  if (error)
    return (
      <div>
        <div className="flex items-center justify-center flex-1 rounded-lg shadow-sm">
          <div
            className="flex flex-col items-center gap-1 p-5 text-center lg:mb-20"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Lottie
              loop={isPlaying}
              animationData={lottieJson}
              play={isPlaying}
              ref={lottieRef}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
            />

            <p className="mb-4 text-sm font-semibold text-black">{error} </p>
            <Button
              onClick={handleClick}
              className="flex items-center mt-2 mb-6 space-x-2 lg:mt-3"
            >
              <span>Reload Page</span>
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative w-full">
      <TableFilters
        table={table}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
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
