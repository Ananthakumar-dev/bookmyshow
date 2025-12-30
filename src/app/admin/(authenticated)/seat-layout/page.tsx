import React from "react";
import DataTable from "@/components/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { desc, sql } from "drizzle-orm";
import { seatLayoutTemplates } from "@/db/schema/seatLayoutTemplates";
import { columns } from "./columns";

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

  const data = await db
    .select()
    .from(seatLayoutTemplates)
    .orderBy(desc(seatLayoutTemplates.createdAt))
    .limit(pageSize)
    .offset(offset);

  const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(seatLayoutTemplates);
  
  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    needPagination: true,
    totalPages,
    currentPage: page
  }
  
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

      <DataTable columns={columns} data={data} paginationProps={paginationProps} />
    </div>
  );
};
export default Page;