import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { NotepadServerView } from "@/components/notepad-server-view";

type Note = {
  id: number;
  title: string | null;
  content: string | null;
  createdAt: number;
  updatedAt: number;
};

export async function Notepad() {
  const allNotes = (await db.select().from(notes)) as Note[];
  return <NotepadServerView notes={allNotes} />;
}
