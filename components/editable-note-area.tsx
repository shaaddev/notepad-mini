"use client";

import * as React from "react";
import { Textarea } from "@headlessui/react";
import { ScrollArea } from "@/components/ui/scroll-area";

type EditableNoteAreaProps = {
  initialValue?: string;
  value?: string;
  onChange?: (next: string) => void;
};

export function EditableNoteArea({
  initialValue = "",
  value: controlledValue,
  onChange,
}: EditableNoteAreaProps) {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(initialValue);
  const value = isControlled ? controlledValue! : uncontrolledValue;
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const autoResize = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  React.useEffect(() => {
    autoResize();
  }, [autoResize, value]);

  return (
    <div className="h-full w-full">
      <ScrollArea className="h-full w-full">
        <div className="min-h-full w-full">
          <Textarea
            ref={textareaRef}
            name="note"
            rows={1}
            value={value}
            onChange={(e) => {
              const next = e.target.value;
              if (isControlled) {
                onChange?.(next);
              } else {
                setUncontrolledValue(next);
              }
            }}
            className="w-full min-h-[500px] resize-none bg-transparent text-black dark:text-white outline-hidden focus:outline-hidden p-4"
          />
        </div>
      </ScrollArea>
    </div>
  );
}
