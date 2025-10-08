import { Notepad } from "@/components/notepad";
import { Theme } from "@/components/theme";
import { LoginBtn } from "@/components/auth/login-btn";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-300 dark:bg-neutral-950 gap-12">
      <LoginBtn />
      <Notepad />
      <Theme />
    </div>
  );
}
