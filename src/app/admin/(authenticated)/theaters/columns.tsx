"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type Theater = {
  id: string;
  name: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  city: string;
  address: string;
  photo: string | null;
  latitude: string | null;
  longitude: string | null;
  created_at: Date | null;
};

export const columns: ColumnDef<Theater>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return row.original?.created_at?.toLocaleDateString();
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
        "Are you sure you want to delete this theater?"
      );

      if (!confirmed) return;

      const res = await fetch(`/api/theaters/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete theater");
        return;
      }

      router.refresh(); // re-fetch server data
    };

      return (
        <div className="flex gap-2">
          <Link href={`/admin/theaters/${theater.id}`}>
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
