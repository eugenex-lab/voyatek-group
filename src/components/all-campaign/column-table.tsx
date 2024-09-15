import { ColumnDef } from "@tanstack/react-table";
import { Campaign } from "./campaign-table";
import { TableActions } from "./table-action";

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
    cell: ({ row }) => (
      <TableActions campaign={row.original} refreshData={refreshData} />
    ),
  },
];
function refreshData(): void {
  throw new Error("Function not implemented.");
}

