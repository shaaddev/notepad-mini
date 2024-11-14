import { Notepad } from "@/components/notepad";
import { Theme } from "@/components/theme";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-300 dark:bg-neutral-950 gap-12">
      <Notepad />
      <Theme />
    </div>
  );
}
