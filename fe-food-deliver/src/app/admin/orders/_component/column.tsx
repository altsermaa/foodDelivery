"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export type Payment = {
  id: string;
  number: number;
  customer: string;
  food: string;
  date: string;
  total: number;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  address: string;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          PENDING
        </Badge>
      );
    case "DELIVERED":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          DELIVERED
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
          CANCELLED
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary">
          {status}
        </Badge>
      );
  }
};

export const customColums = (selectHandler: any): ColumnDef<Payment>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => () => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            selectHandler(row.original.id, value);
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "number",
      header: "№",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "food",
      header: "Food",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "status",
      header: "Delivery state",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: "address",
      header: "Delivery address",
    },
  ];
};
