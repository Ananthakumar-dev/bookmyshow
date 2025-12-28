import { NextResponse } from "next/server";
import { db } from "@/db";
import { theaters } from "@/db/schema/theaters";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import { upload_paths } from "@/lib/data/uploads_path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const city = formData.get("city") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  const image = formData.get("photo") as File | null;

  let photo: string | null = null;

  if (image) {
    // upload to local
    const filePath = `${upload_paths.public}/${upload_paths.theaters}/${image.name}`;
    const fileData = await image.arrayBuffer();

    // create path if not exists
    await fs.mkdir(`${upload_paths.public}/${upload_paths.theaters}`, { recursive: true });

    // write using fs
    await fs.writeFile(filePath, Buffer.from(fileData));
    photo = `${image.name}`;
  }

  await db.insert(theaters).values({
    id: randomUUID(),
    name,
    description,
    phone,
    email,
    city,
    address,
    photo,
  });

  return NextResponse.json({ success: true });
}