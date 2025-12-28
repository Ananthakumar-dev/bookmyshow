"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type Movie = {
  id: string;
  title: string;
  description: string | null;
  duration: number; // in minutes
  language: string;
  genre: string[];
  certification: string; // like U/A, A, PG
  status: string; // upcoming/ now showing/ expired
  release_date: Date;
  created_at: Date | null;
};

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "certification",
    header: "Certification",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
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
      const movie = row.original;
      const router = useRouter();

      const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this movie?"
        );

        if (!confirmed) return;

        const res = await fetch(`/api/movies/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          alert("Failed to delete movie");
          return;
        }

        router.refresh(); // re-fetch server data
      };

      return (
        <div className="flex gap-2">
          <Link href={`/admin/movies/${movie.id}`}>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </Link>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(movie.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

export default columns;
