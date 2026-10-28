"use client";

// Frontend 3.0 global search box (Stage 6, feat/frontend-v3).
// Submits to the local /search results page only — never to an
// external engine. Keyboard behaviour: Enter submits, Escape clears
// the field (and blurs it when it is already empty). Every target is
// at least 44px tall; the form is safe at 200% zoom because it wraps
// instead of overflowing its container.

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export default function SearchBox({
  onNavigate,
  compact = false,
}: {
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputId = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      role="search"
      aria-label="Search courses and services"
      onSubmit={submit}
      className={compact ? "flex items-center gap-2" : "flex w-full items-center gap-2"}
    >
      <label htmlFor={inputId} className="sr-only">
        Search courses and services
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (value) {
              setValue("");
            } else {
              e.currentTarget.blur();
            }
          }
        }}
        placeholder="Search courses, services…"
        autoComplete="off"
        className={
          compact
            ? "min-h-11 w-32 rounded-lg border border-line bg-surface px-3 text-[15px] text-body placeholder:text-muted 2xl:w-44"
            : "min-h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-[15px] text-body placeholder:text-muted"
        }
      />
      <button
        type="submit"
        className="flex min-h-11 shrink-0 items-center rounded-lg bg-brand-dark px-4 text-[15px] font-semibold text-white hover:bg-ink"
      >
        Search
      </button>
    </form>
  );
}
