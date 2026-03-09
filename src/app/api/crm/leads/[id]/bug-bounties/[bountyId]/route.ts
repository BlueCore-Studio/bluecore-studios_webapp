import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bugBountySubmissions } from "@/lib/schema/crm";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; bountyId: string }> }
) {
  const { id, bountyId } = await params;
  const leadId = parseInt(id);
  const bId = parseInt(bountyId);

  await db
    .delete(bugBountySubmissions)
    .where(and(eq(bugBountySubmissions.id, bId), eq(bugBountySubmissions.leadId, leadId)));

  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; bountyId: string }> }
) {
  const { id, bountyId } = await params;
  const leadId = parseInt(id);
  const bId = parseInt(bountyId);
  const body = await request.json();

  const updates: Record<string, unknown> = {};
  if (body.status !== undefined) updates.status = body.status;
  if (body.reward !== undefined) updates.reward = body.reward ? parseFloat(body.reward) : null;
  if (body.severity !== undefined) updates.severity = body.severity;

  if (Object.keys(updates).length > 0) {
    await db
      .update(bugBountySubmissions)
      .set(updates)
      .where(and(eq(bugBountySubmissions.id, bId), eq(bugBountySubmissions.leadId, leadId)));
  }

  return NextResponse.json({ success: true });
}
