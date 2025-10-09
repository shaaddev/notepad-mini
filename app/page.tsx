import { Notepad } from "@/components/notepad";
import { Theme } from "@/components/theme";
import { LoginBtn, LogoutBtn } from "@/components/auth/auth-btns";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-300 dark:bg-neutral-950 gap-12">
      <div className="text-center">
        {session ? <LogoutBtn /> : <LoginBtn />}
      </div>
      <Notepad />
      <Theme />
    </div>
  );
}
