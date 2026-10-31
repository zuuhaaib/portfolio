"use client";

import { useEffect, useRef } from "react";
import { reviewTitleId, sheetFor } from "@/components/ReviewSheets";
import type { Film } from "@/data/films";

// Reading a film review. Each film opens into its own sheet (see
// ReviewSheets); this is the shell around them, built on the native <dialog>:
// showModal() traps focus and makes the page behind inert, Escape closes it.
// On top of that it locks the page scroll and hands focus back to whatever
// opened it.
export default function ReviewDialog({
  film,
  returnFocusTo,
  onClose,
}: {
  film: Film | null;
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusRef.current = returnFocusTo;
  }, [returnFocusTo]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (film && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!film && dialog.open) {
      dialog.close();
    }
  }, [film]);

  // Runs for every way the dialog closes: the button, Escape, the backdrop
  const handleClose = () => {
    document.documentElement.style.overflow = "";
    returnFocusRef.current?.focus();
    onClose();
  };

  // Never leave the page locked if the dialog unmounts while open
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={film ? reviewTitleId(film) : undefined}
      onClose={handleClose}
      onClick={(event) => {
        // A click on the dialog element itself (not its content) is the backdrop
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className={`review-dialog m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain p-0 md:m-auto md:h-fit md:max-h-[88svh] md:w-[min(100%-4rem,62rem)] ${
        film ? sheetFor(film).surface : "bg-paper text-ink"
      }`}
    >
      {film && <OpenSheet film={film} onClose={() => dialogRef.current?.close()} />}
    </dialog>
  );
}

function OpenSheet({ film, onClose }: { film: Film; onClose: () => void }) {
  const { Sheet } = sheetFor(film);
  return <Sheet key={film.id} film={film} onClose={onClose} />;
}
