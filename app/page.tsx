import { Notepad } from "@/components/notepad";
import { NotepadGuest } from "@/components/notepad-guest";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Theme } from "@/components/theme";
import { LoginBtn, LogoutBtn } from "@/components/auth/auth-btns";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-300 dark:bg-neutral-950 gap-6">
          <div className="w-4/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <div className="text-center">
              {session ? <LogoutBtn /> : <LoginBtn />}
            </div>
          </div>
          {session ? <Notepad /> : <NotepadGuest />}
          <Theme />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
