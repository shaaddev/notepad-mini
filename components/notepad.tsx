import { Textarea } from "@headlessui/react";

export function Notepad() {
  return (
    <div className="w-4/5 h-[500px]">
      <Textarea
        name="note"
        className="w-full h-full  min-h-[500px] max-h-[500px] bg-neutral-200 text-black dark:text-white dark:bg-neutral-900 rounded-xl focus:outline-none p-4"
      ></Textarea>
    </div>
  );
}
