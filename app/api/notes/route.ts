import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";

export async function GET() {
  try {
    const all = await db.select().from(notes);
    return NextResponse.json(all, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title: string = body?.title ?? "Untitled";
    const content: string = body?.content ?? "";
    const inserted = await db
      .insert(notes)
      .values({ title, content })
      .returning();
    const created = inserted[0];
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
