"use client";

import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditableNoteArea } from "@/components/editable-note-area";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type Note = {
  id: number;
  title: string | null;
  content: string | null;
  createdAt: number;
  updatedAt: number;
};

export function NotepadServerView({ notes }: { notes: Note[] }) {
  const { state } = useSidebar();
  const sidebarOpen = state === "expanded";
  const [activeId, setActiveId] = React.useState<number | null>(
    notes[0]?.id ?? null,
  );
  const [allNotes, setAllNotes] = React.useState<Note[]>(notes);
  const active = allNotes.find((n) => n.id === activeId) || null;

  async function createNote(initialContent: string) {
    const trimmed = initialContent.slice(0, 20000);
    const rawTitle = trimmed.slice(0, 10);
    const hasMore = trimmed.length > 10;
    const title =
      rawTitle.length > 0 ? rawTitle + (hasMore ? "..." : "") : "Untitled";
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content: trimmed }),
    });
    if (!res.ok) return null;
    const created = (await res.json()) as Note;
    setAllNotes((prev) => [created, ...prev]);
    setActiveId(created.id);
    return created;
  }

  async function updateNoteContent(id: number, content: string) {
    const trimmed = content.slice(0, 20000);
    const rawTitle = trimmed.slice(0, 10);
    const hasMore = trimmed.length > 10;
    const title =
      rawTitle.length > 0 ? rawTitle + (hasMore ? "..." : "") : "Untitled";
    setAllNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, content: trimmed, title } : n)),
    );
    await fetch(`/api/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content: trimmed }),
    });
  }
  async function deleteNote(id: number) {
    setAllNotes((prev) => prev.filter((n) => n.id !== id));
    setActiveId((prev) => {
      if (prev === id) {
        const remaining = allNotes.filter((n) => n.id !== id);
        return remaining[0]?.id ?? null;
      }
      return prev;
    });
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
  }

  return (
    <div className="relative w-4/5 min-h-[500px] max-h-[500px] h-[500px] bg-neutral-200 text-black dark:text-white dark:bg-neutral-900 rounded-xl overflow-hidden">
      <div className="flex h-full w-full">
        <div
          className={`${
            sidebarOpen ? "w-64 border-r" : "w-0 border-0"
          } border-neutral-300 dark:border-neutral-800 h-full overflow-hidden transition-[width] duration-200`}
        >
          <SidebarContent className="h-full">
            <SidebarGroup className="h-full p-0">
              <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-300 dark:border-neutral-800 sticky top-0 bg-neutral-200 dark:bg-neutral-900 z-10">
                <SidebarGroupLabel className="px-0">Notes</SidebarGroupLabel>
              </div>
              <ScrollArea className="h-[calc(500px-2.5rem)]">
                <SidebarMenu className="p-2">
                  {allNotes.length === 0 && (
                    <div className="text-xs opacity-60 px-2 py-1">
                      No notes yet
                    </div>
                  )}
                  {allNotes.map((n) => (
                    <SidebarMenuItem key={n.id}>
                      <SidebarMenuButton
                        className={cn(
                          "flex flex-col items-start py-1",
                          n.id === activeId &&
                            "bg-neutral-400/50 dark:bg-neutral-700/60",
                        )}
                        onClick={() => setActiveId(n.id)}
                      >
                        <span className="text-sm truncate">
                          {n.title || "New Note"}
                        </span>
                      </SidebarMenuButton>
                      <SidebarMenuAction
                        aria-label="Delete note"
                        onClick={() => deleteNote(n.id)}
                        showOnHover
                        className="hover:cursor-pointer"
                      >
                        {/* simple × icon */}
                        <Trash2Icon className="size-4 text-red-500" />
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroup>
          </SidebarContent>
        </div>
        <div className="flex-1 h-full">
          <EditableNoteArea
            value={active?.content ?? ""}
            onChange={async (next) => {
              if (!active) {
                const created = await createNote(next);
                if (!created) return;
                return;
              }
              await updateNoteContent(active.id, next);
            }}
          />
        </div>
      </div>
    </div>
  );
}
