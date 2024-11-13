import { Textarea } from "@headlessui/react";

export function Notepad() {
  return (
    <div className="w-4/5 h-[500px]">
      <Textarea
        name="note"
        className="w-full h-full bg-neutral-900 rounded-xl focus:outline-none p-4"
      ></Textarea>
    </div>
  );
}
