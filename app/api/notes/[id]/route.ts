import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const { title, content } = body ?? {};
    const updated = await db
      .update(notes)
      .set({ title, content })
      .where(eq(notes.id, id))
      .returning();
    return NextResponse.json(updated[0], { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const deleted = await db.delete(notes).where(eq(notes.id, id)).returning();
    return NextResponse.json(deleted[0] ?? null, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
