import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import DataTable from "@/components/data-table";
import {screenColumns} from "@/app/admin/(authenticated)/screens/columns";

import { db } from "@/db";
import { desc, sql, eq } from "drizzle-orm";
import { screens } from '@/db/schema/screens';
import { theaters } from '@/db/schema/theaters';
import { seatLayoutTemplates } from '@/db/schema/seatLayoutTemplates';

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
                .select({
                    id: screens.id,
                    name: screens.name,
                    theaterName: theaters.name,
                    layoutName: seatLayoutTemplates.name,
                    createdAt: screens.createdAt,
                })
                .from(screens)
                .leftJoin(theaters, eq(screens.theaterId, theaters.id))
                .leftJoin(
                    seatLayoutTemplates,
                    eq(screens.seatLayoutTemplateId, seatLayoutTemplates.id)
                )
                .orderBy(desc(screens.createdAt))
                .limit(pageSize)
                .offset(offset);

    const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(screens);
    
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
                    <h2>Screens</h2>
                    <p> Here you can manage all the screens config for the particular theater </p>
                </div>

                <div>
                    <Button variant="link">
                        <Link href="/admin/screens/add">
                            Add
                        </Link>
                    </Button>
                </div>
            </div>

            <DataTable columns={screenColumns} data={data} paginationProps={paginationProps} />
        </div>
    )
}
export default Page
