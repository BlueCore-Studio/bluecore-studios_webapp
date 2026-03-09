import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dataRoomDocuments } from "@/lib/schema/crm";
import path from "path";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const category = formData.get("category") as string | null;
  const fileType = formData.get("file_type") as string | null;
  const sharedBy = formData.get("shared_by") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!name || !sharedBy) {
    return NextResponse.json(
      { error: "name and shared_by are required" },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 25MB." },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name);
  const detectedType = fileType || file.type || ext.replace(".", "");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const [doc] = await db
    .insert(dataRoomDocuments)
    .values({
      name,
      description: description || null,
      category: (category as typeof dataRoomDocuments.category.enumValues[number]) || "other",
      fileUrl: file.name,
      fileType: detectedType,
      fileData: buffer,
      fileSize: file.size,
      sharedBy,
    })
    .returning();

  return NextResponse.json(
    {
      data: {
        id: doc.id,
        name: doc.name,
        description: doc.description,
        category: doc.category,
        file_url: doc.fileUrl,
        file_type: doc.fileType,
        file_size: doc.fileSize,
        shared_by: doc.sharedBy,
        created_at: doc.createdAt,
        updated_at: doc.updatedAt,
      },
    },
    { status: 201 }
  );
}
