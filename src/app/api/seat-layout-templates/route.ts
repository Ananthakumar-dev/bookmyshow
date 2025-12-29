import { NextResponse } from "next/server";
import { db } from "@/db";
import { seatLayoutTemplates } from "@/db/schema/seatLayoutTemplates";
import { seatLayoutSchema } from "@/app/admin/(authenticated)/seat-layout/seat-layout.schema";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  // ✅ Validate again on server
  const parsed = seatLayoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const id = randomUUID();

  await db.insert(seatLayoutTemplates).values({
    id,
    name: parsed.data.name,
    layout: parsed.data,
  });

  return NextResponse.json({ id });
}
