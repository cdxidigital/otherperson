import { Link } from "@tanstack/react-router";

export function SiteBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e7e1d4]/10 bg-[#0c0b09]/95 backdrop-blur" aria-label="Bottom">
      <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#e7e1d4]/50">Voice actors</p>
        <Link to="/release" className="inline-flex min-h-11 items-center bg-[#e7e1d4] px-5 text-xs uppercase tracking-[0.18em] text-[#14110c]">
          Voices
        </Link>
      </div>
    </nav>
  );
}
