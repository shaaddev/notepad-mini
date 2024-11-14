"use client";
import { Button } from "@headlessui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl border border-black/20 dark:border-white/20 dark:text-white text-black p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all ease-in-out"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}
