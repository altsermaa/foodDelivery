"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    number: number
    customer: string
    food: string
    date: Date
//   id: string
  total: number
  status: "pending" | "delivered" | "cancelled" 
  address: string
}

export const columns: ColumnDef<Payment>[] = [
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
      },

  {
    accessorKey: "address",
    header: "Delivery address",
  },


]