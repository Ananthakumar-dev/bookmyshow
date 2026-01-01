"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type ScreenRow = {
  id: string;
  name: string;
  theaterName?: string;
  layoutName?: string;
  createdAt: Date;
};

export const screenColumns: ColumnDef<ScreenRow>[] = [
  {
    accessorKey: "name",
    header: "Screen Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "theaterName",
    header: "Theater",
  },
  {
    accessorKey: "layoutName",
    header: "Seat Layout",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue<Date>("createdAt");
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const screen = row.original;
      const router = useRouter();

      return (
        <div className="flex gap-2">
          <Link href={`/admin/screens/${screen.id}/edit`}>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </Link>

          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              const confirmed = confirm(
                "Are you sure you want to delete this screen?"
              );
              if (!confirmed) return;

              const res = await fetch(`/api/screens/${screen.id}`, {
                method: "DELETE",
              });

              if (!res.ok) {
                alert("Failed to delete screen");
                return;
              }

              // simplest refresh strategy
              router.refresh();
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
