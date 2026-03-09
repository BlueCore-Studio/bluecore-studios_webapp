import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dataRoomDocuments } from "@/lib/schema/crm";
import { eq } from "drizzle-orm";

const MIME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  txt: "text/plain",
  zip: "application/zip",
  mp4: "video/mp4",
};

function getMimeType(fileType: string | null, fileName: string): string {
  if (fileType && fileType.includes("/")) return fileType;

  const ext = (fileType || fileName.split(".").pop() || "").toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [doc] = await db
    .select({
      fileData: dataRoomDocuments.fileData,
      fileType: dataRoomDocuments.fileType,
      fileUrl: dataRoomDocuments.fileUrl,
      name: dataRoomDocuments.name,
    })
    .from(dataRoomDocuments)
    .where(eq(dataRoomDocuments.id, parseInt(id)));

  if (!doc || !doc.fileData) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const mimeType = getMimeType(doc.fileType, doc.fileUrl);
  const fileName = doc.fileUrl || doc.name;

  const body = new Uint8Array(doc.fileData);

  return new NextResponse(body, {
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
