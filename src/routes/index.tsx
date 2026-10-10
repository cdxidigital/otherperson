import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteBottomNav } from "@/components/site-bottom-nav";

export const Route = createFileRoute("/")({ component: Home });

const episodes = [
  { n: "01", title: "Sarah & the Clipboard", who: "Sarah", with: "Anxiety", line: "You've put the chair there again.", live: true },
  { n: "02", title: "The Landlord", who: "Marcus", with: "Depression", line: "Tired was the cover story. The lease was already signed." },
  { n: "03", title: "The Security Guard", who: "Elena", with: "Trauma", line: "People who say I'm still here are usually about to stop checking." },
  { n: "04", title: "The Weather", who: "David", with: "Bipolar", line: "You don't apologise for electricity." },
  { n: "05", title: "The Endless Play", who: "Priya", with: "OCD", line: "Forty seconds of safety is still safety." },
  { n: "06", title: "The Ex Who Still Has a Key", who: "Tom", with: "Addiction", line: "I can wait. I have excellent timing." },
  { n: "07", title: "National Emergency", who: "Aisha", with: "Panic", line: "Your schedule is not my problem." },
  { n: "08", title: "Advanced Pattern Recognition", who: "Liam", with: "Rejection sensitivity", line: "A strong bias toward survival." },
  { n: "09", title: "The Hostile Witness", who: "Sophie", with: "Dysmorphia", line: "The measurements do not lie. Kindness does." },
  { n: "10", title: "The Space That Won't Vacate", who: "Jordan", with: "Grief", line: "I do not leave. That is the job." },
  { n: "11", title: "The Thermostat", who: "Mei", with: "Social anxiety", line: "Better to say nothing than to say the thing that makes them leave." },
];

function Home() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem("opitr-list");
    if (existing) setSaved(true);
  }, []);

  function join(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    localStorage.setItem("opitr-list", email);
    setSaved(true);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0c0b09] pb-24 text-[#e7e1d4]">
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>\")" }} />

      <SiteHeader />

      <section id="top" className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end px-5 pb-16 pt-16 md:px-10 md:pb-20">
        <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#c4a574]">Podcast · Literary release · Perth</p>
        <h1 className="max-w-5xl font-display text-[14vw] leading-[0.86] font-medium tracking-[-0.03em] md:text-[7.4rem]">
          The other person in the room
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg leading-snug text-[#e7e1d4]/80">
            Everybody has something sitting in the room with them. This is a conversation with the person, and with the thing.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/episodes/sarah" className="bg-[#e7e1d4] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#14110c]">Play episode one</a>
            <a href="#book" className="border border-[#c4a574]/50 px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#c4a574]">The book</a>
          </div>
        </div>
        <Chair className="pointer-events-none absolute right-6 bottom-24 hidden w-40 opacity-80 md:block" />
      </section>

      <section className="border-t border-[#e7e1d4]/10 px-5 py-24 md:px-10">
        <p className="max-w-3xl font-display text-3xl leading-tight md:text-5xl">
          Most conversations ask what is wrong with you. This one asks what it is like to live with you.
        </p>
      </section>

      <section id="device" className="grid gap-12 border-t border-[#e7e1d4]/10 px-5 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#c4a574]">The device</p>
          <h2 className="mt-4 font-display text-4xl">Three voices. One chair left empty.</h2>
        </div>
        <div className="space-y-8 text-[#e7e1d4]/80 md:col-span-7 md:col-start-6">
          <p>Hosted by Adam James. Each episode sits with a friend, then with the illness they have been living with — not as a monster, and not as a diagnosis read aloud.</p>
          <p>Anxiety keeps a clipboard. Depression collects rent. Trauma will not clock off. The humour is on the system. The cost stays with the person.</p>
          <p className="text-[#e7e1d4]">Funny until it isn't. Hard, without spectacle. Not a smear.</p>
        </div>
      </section>

      <section id="episodes" className="border-t border-[#e7e1d4]/10 px-5 py-20 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-4xl md:text-6xl">Season one</h2>
          <p className="hidden text-[11px] uppercase tracking-[0.22em] text-[#e7e1d4]/50 md:block">Eleven rooms.</p>
        </div>
        <ul className="divide-y divide-[#e7e1d4]/10 border-y border-[#e7e1d4]/10">
          {episodes.map((ep) => (
            <li key={ep.n}>
              {"live" in ep && ep.live ? (
                <Link to="/episodes/sarah" className="grid w-full grid-cols-12 items-baseline gap-3 py-5 text-left">
                  <span className="col-span-2 text-[#c4a574] md:col-span-1">{ep.n}</span>
                  <span className="col-span-10 font-display text-2xl md:col-span-5">{ep.title}</span>
                  <span className="col-span-12 text-sm text-[#e7e1d4]/55 md:col-span-4">{ep.who} + {ep.with}</span>
                  <span className="col-span-12 text-right text-[11px] uppercase tracking-[0.18em] text-[#c4a574] md:col-span-2">Listen · 11 min</span>
                </Link>
              ) : (
                <div className="grid w-full grid-cols-12 items-baseline gap-3 py-5 text-left">
                  <span className="col-span-2 text-[#c4a574] md:col-span-1">{ep.n}</span>
                  <span className="col-span-10 font-display text-2xl md:col-span-5">{ep.title}</span>
                  <span className="col-span-12 text-sm text-[#e7e1d4]/55 md:col-span-4">{ep.who} + {ep.with}</span>
                  <span className="col-span-12 text-right text-[11px] uppercase tracking-[0.18em] text-[#e7e1d4]/45 md:col-span-2">Coming soon</span>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-xl text-sm text-[#e7e1d4]/50">Content notes sit at the top of every episode. No methods. No graphic detail. If a room is too much, leave it.</p>
      </section>

      <section id="book" className="grid items-end gap-10 border-t border-[#e7e1d4]/10 px-5 py-24 md:grid-cols-2 md:px-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#c4a574]">Forthcoming</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl">The book keeps the third chair.</h2>
          <p className="mt-6 max-w-md text-[#e7e1d4]/75">Literary non-fiction. Interview. Personal essay. The diagnosis describes the experience. It does not get to become the identity.</p>
        </div>
        <div className="border border-[#e7e1d4]/15 p-6 md:p-10">
          <p className="font-display text-2xl">The Other Person in the Room</p>
          <p className="mt-2 text-sm text-[#e7e1d4]/60">Hosted by Adam James</p>
          <dl className="mt-8 grid grid-cols-2 gap-y-4 text-sm">
            <dt className="text-[#e7e1d4]/45">Form</dt>
            <dd>Conversations</dd>
            <dt className="text-[#e7e1d4]/45">Length</dt>
            <dd>70–90,000 words</dd>
            <dt className="text-[#e7e1d4]/45">Release</dt>
            <dd>In preparation</dd>
          </dl>
          <p className="mt-8 font-display text-xl leading-snug">They may rearrange the furniture. They don't get to decide who lives there.</p>
        </div>
      </section>

      <section id="list" className="border-t border-[#e7e1d4]/10 px-5 py-20 md:px-10">
        <h2 className="font-display text-4xl md:text-5xl">The next rooms.</h2>
        <p className="mt-3 max-w-md text-[#e7e1d4]/65">Episode one is up. Leave an email on this device if you want a reminder for yourself. It is not sent anywhere.</p>
        {saved ? (
          <p className="mt-8 font-display text-2xl text-[#c4a574]">Saved in this browser only.</p>
        ) : (
          <form onSubmit={join} className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="flex-1 border border-[#e7e1d4]/20 bg-transparent px-4 py-3 text-[#e7e1d4] outline-none placeholder:text-[#e7e1d4]/35" />
            <button type="submit" className="bg-[#c4a574] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#14110c]">Keep a seat</button>
          </form>
        )}
      </section>

      <footer className="border-t border-[#e7e1d4]/10 px-5 py-10 text-sm text-[#e7e1d4]/50 md:px-10">
        <p>If a conversation lands heavily: Lifeline 13 11 14 · Beyond Blue 1300 22 4636.</p>
        <p className="mt-3">Adam James, host. Perth.</p>
      </footer>
      <SiteBottomNav />
    </main>
  );
}

function Chair({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 200" fill="none" aria-hidden="true">
      <path d="M28 36h18v110H28zM114 28h18v118h-18z" fill="#c4a574" />
      <path d="M28 146h104v10H28z" fill="#e7e1d4" />
      <path d="M40 156v28M108 156v28" stroke="#e7e1d4" strokeWidth="8" />
    </svg>
  );
}
