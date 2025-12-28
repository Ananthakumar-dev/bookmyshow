import React from "react";
import TheatreForm from "@/app/admin/(authenticated)/theaters/form";
import { db } from "@/db";
import { theaters } from "@/db/schema/theaters";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type PageProps = {
    params: {
        id: string
    }
}

const Page = async ({params}: PageProps) => {
    console.log({params})
    const theater = await db
        .select()
        .from(theaters)
        .where(eq(theaters.id, params.id))
        .limit(1);

    if (!theater.length) {
        notFound();
    }

    const row = theater[0];

    const defaultValues = {
        name: row.name,
        description: row.description ?? "",
        city: row.city,
        address: row.address,
        phone: row.phone ?? "",
        email: row.email ?? "",
        latitude: row.latitude ? Number(row.latitude) : null,
        longitude: row.longitude ? Number(row.longitude) : null,
        photo: undefined, // never preload file
    };

    return (
        <div className="container p-4 space-y-4">
            <div>
                <h2>Edit Theater</h2>
                <p> Here edit the theater config </p>
            </div>

            <TheatreForm
                defaultValues={defaultValues}
                mode="edit"
                theaterId={params.id}
            />
        </div>
    );
}

export default Page;