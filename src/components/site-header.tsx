import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { href: "/#episodes", label: "Episodes" },
  { href: "/episodes/sarah", label: "Listen" },
  { href: "/#book", label: "The book" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#e7e1d4]/10 bg-[#0c0b09]/95 backdrop-blur">
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <Link to="/" className="font-display text-sm tracking-wide" onClick={() => setOpen(false)}>
          The other person
        </Link>
        <button
          type="button"
          className="min-h-11 px-2 text-xs uppercase tracking-[0.22em] md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav className="hidden gap-7 text-[11px] uppercase tracking-[0.22em] text-[#e7e1d4]/80 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-[#e7e1d4]/10 px-5 py-3 md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="min-h-11 py-3 text-sm uppercase tracking-[0.18em]" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
