"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Native <dialog> + showModal(): the browser makes the rest of the page inert,
// traps focus and puts the dialog in the top layer. We add enter/exit motion,
// scroll locking, backdrop-click and focus restoration on close.
export function Dialog({
  open,
  onClose,
  labelledBy,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  // Stays true until the exit animation has finished.
  const [rendered, setRendered] = useState(open);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- mount before opening
  useEffect(() => { if (open) setRendered(true); }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open || dialog.open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    dialog.showModal();
    document.documentElement.classList.add("scroll-locked");
    // Browsers differ on initial focus inside dialogs; pick it explicitly.
    const target = dialog.querySelector<HTMLElement>("[data-autofocus]") ?? dialog;
    target.focus({ preventScroll: true });
  }, [open, rendered]);

  function finishClose() {
    const dialog = ref.current;
    if (dialog?.open) dialog.close();
    document.documentElement.classList.remove("scroll-locked");
    setRendered(false);
    returnFocus.current?.focus({ preventScroll: true });
    returnFocus.current = null;
  }

  // Unmounting while open (e.g. route change) must not leave the page locked.
  useEffect(() => () => document.documentElement.classList.remove("scroll-locked"), []);

  if (!rendered) return null;

  return (
    <dialog
      ref={ref}
      className="app-dialog"
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        // Escape: animate out instead of closing instantly.
        e.preventDefault();
        onClose();
      }}
      onClose={() => {
        // The browser can close a dialog on its own (close watchers); sync state.
        if (open) onClose();
      }}
    >
      <AnimatePresence onExitComplete={finishClose}>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-[rgb(5_6_9/0.72)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />
        )}
        {open && (
          <motion.div
            key="panel"
            className={cn("pointer-events-none fixed inset-0 flex", className)}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
