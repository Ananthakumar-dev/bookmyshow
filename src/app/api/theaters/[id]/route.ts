import { db } from "@/db";
import { theaters } from "@/db/schema/theaters";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import { upload_paths } from "@/lib/data/uploads_path";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();

  const updateData: Record<string, any> = {
    name: formData.get("name"),
    description: formData.get("description"),
    city: formData.get("city"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    photo: null
  };

  // handle photo upload if exists
  const image = formData.get("photo") as File | null;
  let photo: string | null = null;
  if (image) {
    // remove the existing file
    const existingTheater = await db.select().from(theaters).where(eq(theaters.id, params.id));
    if (existingTheater.length > 0 && existingTheater[0].photo) {
      const existingImagePath = `public${existingTheater[0].photo}`;
      await fs.unlink(existingImagePath);
    }

    // upload to local
    const filePath = `${upload_paths.public}/${upload_paths.theaters}/${image.name}`;
    const fileData = await image.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(fileData));
    photo = `${image.name}`;
  }
  // set photo only if a new one was uploaded
  if (photo) updateData.photo = photo;
  await db.update(theaters).set(updateData).where(eq(theaters.id, params.id));

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await db.delete(theaters)
    .where(eq(theaters.id, params.id));

  return NextResponse.json({ success: true });
}