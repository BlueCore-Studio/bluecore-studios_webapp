import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { fundingRounds, leads } from "@/lib/schema/crm";
import { desc, asc, like, eq, gte, lte, sql, and, or, isNotNull } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") || "";
  const roundType = searchParams.get("round_type") || "";
  const minAmount = searchParams.get("min_amount") || "";
  const maxAmount = searchParams.get("max_amount") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const sortBy = searchParams.get("sort") || "date";
  const sortDir = searchParams.get("dir") || "desc";

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        like(fundingRounds.companyName, `%${search}%`),
        like(fundingRounds.description, `%${search}%`)
      )!
    );
  }
  if (roundType) conditions.push(eq(fundingRounds.roundType, roundType));
  if (minAmount) conditions.push(gte(fundingRounds.amountUsd, parseFloat(minAmount)));
  if (maxAmount) conditions.push(lte(fundingRounds.amountUsd, parseFloat(maxAmount)));
  if (category) conditions.push(like(fundingRounds.categoryTags, `%${category}%`));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allowedSorts: Record<string, any> = {
    date: fundingRounds.date,
    amount_usd: fundingRounds.amountUsd,
    company_name: fundingRounds.companyName,
    created_at: fundingRounds.createdAt,
  };
  const sortCol = allowedSorts[sortBy] || fundingRounds.date;
  const orderFn = sortDir === "asc" ? asc : desc;

  const offset = (page - 1) * limit;

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [countRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(fundingRounds)
    .where(whereClause);

  const rows = await db
    .select()
    .from(fundingRounds)
    .where(whereClause)
    .orderBy(orderFn(sortCol))
    .limit(limit)
    .offset(offset);

  const roundTypes = await db
    .selectDistinct({ roundType: fundingRounds.roundType })
    .from(fundingRounds)
    .orderBy(asc(fundingRounds.roundType));

  // Get funding round IDs that have already been imported as leads
  const importedRows = await db
    .select({ fundingRoundId: leads.fundingRoundId })
    .from(leads)
    .where(isNotNull(leads.fundingRoundId));
  const importedIds = new Set(importedRows.map((r) => r.fundingRoundId));

  return NextResponse.json({
    data: rows.map((r) => ({
      id: r.id,
      company_name: r.companyName,
      company_name_normalized: r.companyNameNormalized,
      round_type: r.roundType,
      amount_usd: r.amountUsd,
      date: r.date,
      investors: JSON.parse(r.investors || "[]"),
      category_tags: JSON.parse(r.categoryTags || "[]"),
      source: r.source,
      source_url: r.sourceUrl,
      company_website: r.companyWebsite,
      description: r.description,
      created_at: r.createdAt,
      updated_at: r.updatedAt,
      imported: importedIds.has(r.id),
    })),
    total: countRow.count,
    page,
    limit,
    totalPages: Math.ceil(countRow.count / limit),
    roundTypes: roundTypes.map((r) => r.roundType),
  });
}
