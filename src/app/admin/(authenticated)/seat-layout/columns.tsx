"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type SeatLayoutColumn = {
  id: string;
  name: string;
  createdAt: Date | null;
};

export const columns: ColumnDef<SeatLayoutColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return row.original?.createdAt?.toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const theater = row.original;
      const router = useRouter();

      const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this seat layout template?"
        );

        if (!confirmed) return;

        const res = await fetch(`/api/seat-layout-templates/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          alert("Failed to delete seat layout template");
          return;
        }

        router.refresh(); // re-fetch server data
      };

      return (
        <div className="flex gap-2">
          <Link href={`/admin/seat-layout/${theater.id}`}>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </Link>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(theater.id)}
         >
            Delete
          </Button>
        </div>
      );
    },
  },
];
