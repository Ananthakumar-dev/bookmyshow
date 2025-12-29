import { db } from "@/db";
import { seatLayoutTemplates } from "@/db/schema/seatLayoutTemplates";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const rows = await db
    .select()
    .from(seatLayoutTemplates)
    .where(eq(seatLayoutTemplates.id, params.id))
    .limit(1);

  if (!rows.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}
