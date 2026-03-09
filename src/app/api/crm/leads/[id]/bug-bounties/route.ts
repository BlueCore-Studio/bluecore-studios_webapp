import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bugBountySubmissions, leads } from "@/lib/schema/crm";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);

  const rows = await db
    .select()
    .from(bugBountySubmissions)
    .where(eq(bugBountySubmissions.leadId, leadId))
    .orderBy(desc(bugBountySubmissions.submittedAt));

  return NextResponse.json({ submissions: rows });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);
  const body = await request.json();

  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const [submission] = await db.insert(bugBountySubmissions).values({
    leadId,
    platform: body.platform,
    title: body.title,
    details: body.details || null,
    severity: body.severity || "medium",
    status: body.status || "submitted",
    reward: body.reward ? parseFloat(body.reward) : null,
    submittedAt: body.submitted_at || new Date().toISOString(),
  }).returning();

  return NextResponse.json({ submission }, { status: 201 });
}
