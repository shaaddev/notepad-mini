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

type GuestNote = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

const STORAGE_KEY = "guest_notes_v1";
const MAX_NOTES = 20;
const MAX_NOTE_SIZE = 20_000; // ~20KB per note content limit
const MAX_TOTAL_SIZE = 250_000; // ~250KB total for all notes

function loadNotes(): GuestNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as GuestNote[];
  } catch {
    return [];
  }
}

function saveNotes(notes: GuestNote[]) {
  try {
    const raw = JSON.stringify(notes);
    if (raw.length > MAX_TOTAL_SIZE) return; // soft fail if exceeding cap
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {}
}

function clampNotes(notes: GuestNote[]): GuestNote[] {
  let clamped = notes.slice(0, MAX_NOTES);
  // ensure each note does not exceed MAX_NOTE_SIZE
  clamped = clamped.map((n) => ({
    ...n,
    content: n.content.slice(0, MAX_NOTE_SIZE),
    title: n.title.slice(0, 200),
  }));
  return clamped;
}

export function NotepadGuest() {
  const [notes, setNotes] = React.useState<GuestNote[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const { state } = useSidebar();
  const sidebarOpen = state === "expanded";

  React.useEffect(() => {
    const initial = clampNotes(loadNotes());
    if (initial.length === 0) {
      const now = Date.now();
      const newNote: GuestNote = {
        id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
        title: "New Note",
        content: "",
        createdAt: now,
        updatedAt: now,
      };
      setNotes([newNote]);
      setActiveId(newNote.id);
    } else {
      setNotes(initial);
      setActiveId(initial[0]?.id ?? null);
    }
  }, []);

  React.useEffect(() => {
    saveNotes(clampNotes(notes));
  }, [notes]);

  const active = notes.find((n) => n.id === activeId) || null;

  function addNote() {
    const now = Date.now();
    const newNote: GuestNote = {
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      title: "Untitled",
      content: "",
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => clampNotes([newNote, ...prev]));
    setActiveId(newNote.id);
  }

  function updateActive(content: string) {
    if (!active) return;
    const now = Date.now();
    const trimmed = content.slice(0, MAX_NOTE_SIZE);
    const rawTitle = trimmed.slice(0, 10);
    const hasMore = trimmed.length > 10;
    const generatedTitle =
      rawTitle.length > 0 ? rawTitle + (hasMore ? "..." : "") : "Untitled";

    setNotes((prev) =>
      clampNotes(
        prev.map((n) =>
          n.id === active.id
            ? {
                ...n,
                content: trimmed,
                title: generatedTitle,
                updatedAt: now,
              }
            : n,
        ),
      ),
    );
  }

  return (
    <div className="relative w-4/5 min-h-[500px] max-h-[500px] h-[500px] bg-neutral-200 text-black dark:text-white dark:bg-neutral-900 rounded-xl overflow-hidden">
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64 border-r" : "w-0 border-0"
          } border-neutral-300 dark:border-neutral-800 h-full overflow-hidden transition-[width] duration-200`}
        >
          <SidebarContent className="h-full">
            <SidebarGroup className="h-full p-0">
              <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-300 dark:border-neutral-800 sticky top-0 bg-neutral-200 dark:bg-neutral-900 z-10">
                <SidebarGroupLabel className="px-0">Notes</SidebarGroupLabel>
                <button
                  className="text-xs px-2 py-1 rounded-md bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400/60 dark:hover:bg-neutral-700/60"
                  onClick={addNote}
                >
                  New
                </button>
              </div>
              <ScrollArea className="h-[calc(500px-2.5rem)]">
                <SidebarMenu className="p-2">
                  {notes.length === 0 && (
                    <div className="text-xs opacity-60 px-2 py-1">
                      No notes yet
                    </div>
                  )}
                  {notes.map((n) => (
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
                          {n.title || "Untitled"}
                        </span>
                      </SidebarMenuButton>
                      <SidebarMenuAction
                        aria-label="Delete note"
                        onClick={() => {
                          setNotes((prev) => prev.filter((x) => x.id !== n.id));
                          if (activeId === n.id) {
                            const remaining = notes.filter(
                              (x) => x.id !== n.id,
                            );
                            setActiveId(remaining[0]?.id ?? null);
                          }
                        }}
                        showOnHover
                        className="hover:cursor-pointer"
                      >
                        <Trash2Icon className="size-4 text-red-500" />
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroup>
          </SidebarContent>
        </div>

        {/* Editor area */}
        <div className="flex-1 h-full">
          <EditableNoteArea
            value={active?.content}
            onChange={active ? updateActive : undefined}
          />
        </div>
      </div>
    </div>
  );
}
