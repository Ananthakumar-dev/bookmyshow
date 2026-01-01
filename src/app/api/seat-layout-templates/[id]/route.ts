import { seatLayoutSchema } from "@/app/admin/(authenticated)/seat-layout/seat-layout.schema";
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const parsed = seatLayoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await db
    .update(seatLayoutTemplates)
    .set({
      name: parsed.data.name,
      layout: parsed.data,
    })
    .where(eq(seatLayoutTemplates.id, params.id));

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await db
    .delete(seatLayoutTemplates)
    .where(eq(seatLayoutTemplates.id, params.id));

  return NextResponse.json({ success: true });
}