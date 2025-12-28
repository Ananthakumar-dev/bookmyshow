import React from "react";
import DataTable from "@/components/data-table";
import { columns } from "@/app/admin/(authenticated)/theaters/columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { theaters } from "@/db/schema/theaters";
import { desc, sql } from "drizzle-orm";

type PageProps = {
  searchParams: {
    page?: string;
    q?: string;
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const page = Number(searchParams.page ?? 1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  return (
    <div className="container p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2>Seat Layout</h2>
          <p> Here you can manage all the seat layout config </p>
        </div>

        <div>
          <Button variant="link">
            <Link href="/admin/seat-layout/add">Add</Link>
          </Button>
        </div>
      </div>

      {/* <DataTable columns={columns} data={data} paginationProps={paginationProps} /> */}
    </div>
  );
};
export default Page;