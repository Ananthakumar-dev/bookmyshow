import { db } from "@/db";
import { seatLayoutTemplates } from "@/db/schema/seatLayoutTemplates";
import { eq } from "drizzle-orm";
import SeatLayoutEditor from "@/app/admin/_components/seat-layout/SeatLayoutEditor";
import { SeatLayoutForm } from "@/lib/types/seat-layout.types";

export default async function Page({ params }: { params: { id: string } }) {
  const rows = await db
    .select()
    .from(seatLayoutTemplates)
    .where(eq(seatLayoutTemplates.id, params.id))
    .limit(1);

  if (!rows.length) {
    throw new Error("Layout not found");
  }

  return (
    <SeatLayoutEditor defaultValues={rows[0].layout as SeatLayoutForm} templateId={rows[0].id} />
  );
}
