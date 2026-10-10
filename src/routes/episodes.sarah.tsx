import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteBottomNav } from "@/components/site-bottom-nav";

export const Route = createFileRoute("/episodes/sarah")({ component: SarahEpisode });

const chapters = [
  { t: 20, label: "The chair" },
  { t: 133, label: "The key" },
  { t: 178, label: "An ordinary Tuesday" },
  { t: 219, label: "The apology" },
  { t: 293, label: "The one time it was right" },
  { t: 314, label: "A name" },
  { t: 381, label: "The birthday" },
  { t: 443, label: "Three in the morning" },
  { t: 480, label: "What actually helps" },
  { t: 634, label: "Dinner" },
];

const lines: { who: "Adam" | "Sarah" | "Clipboard"; text: string }[] = [
  { who: "Adam", text: "We're in Sarah's back garden. Late afternoon, cold tea, moss asleep on her foot, and behind her left shoulder, an empty chair." },
  { who: "Clipboard", text: "Occupied in an advisory capacity." },
  { who: "Sarah", text: "Squatting with stationery." },
  { who: "Sarah", text: "Clipboard. Disappointed face. Never taken a day off. Thinks that's something to boast about." },
  { who: "Clipboard", text: "My attendance is exemplary." },
  { who: "Sarah", text: "So is damp's. Wakes me up to tell me I'm not getting enough." },
  { who: "Sarah", text: "I started checking the locks, then checking whether I'd checked them. Dad said I was becoming responsible. Gave me my own key. I needed someone to notice I was frightened. I got promoted." },
  { who: "Sarah", text: "From a distance, fear looks astonishingly like a transferable skill." },
  { who: "Sarah", text: "Sometimes getting better starts to sound like letting people down. I don't want to become unreliable. I want to get to the pub without doing an unpaid shift first." },
  { who: "Sarah", text: "I can be choosing a yogurt and suddenly be responsible for the whole street." },
  { who: "Adam", text: "I used to tease you. I thought it was a quirk." },
  { who: "Sarah", text: "You saw a minute. You didn't see me sitting with the keys in my hand, knowing the cooker was off, trying to make knowing count, then going back anyway." },
  { who: "Clipboard", text: "For the record, returning to the property was the correct decision." },
  { who: "Sarah", text: "You don't get to chair my apology." },
  { who: "Clipboard", text: "A completed check is only accurate at the time of checking." },
  { who: "Sarah", text: "Even done has terms and conditions." },
  { who: "Clipboard", text: "Certainty. In writing. Nothing bad happens to Sarah, or anyone Sarah loves. Ever." },
  { who: "Adam", text: "That's impossible." },
  { who: "Clipboard", text: "Then we'll need to start earlier." },
  { who: "Sarah", text: "It's a job you can't lose, performed by someone you'd never hire." },
  { who: "Sarah", text: "Once, a gas smell. A genuine problem. We got help. It's been dining out on that ever since." },
  { who: "Clipboard", text: "We don't retain the false alarms." },
  { who: "Sarah", text: "You're an arsehole with a filing system." },
  { who: "Sarah", text: "Twenty-six. My GP said generalised anxiety disorder. First I felt relieved. Then smaller. As if I'd gone in as Sarah and come out as a condition with a coat." },
  { who: "Sarah", text: "Nobody should diagnose themselves from me arguing with a clipboard." },
  { who: "Sarah", text: "Mum said we all get worried sometimes. Then she said, but you've always been so capable. As though I'd turned up in the wrong costume." },
  { who: "Sarah", text: "I'd cooked, cleaned, checked the locks four times. Then you all arrived and became five more people I could let down." },
  { who: "Clipboard", text: "It had candles." },
  { who: "Sarah", text: "It was a birthday. We weren't overthrowing a government." },
  { who: "Sarah", text: "I wanted you to stay. I needed you gone. Both at once. After you left, I sat in the kitchen wishing you were still there." },
  { who: "Sarah", text: "I was happy you were there. That wasn't fake. The rest was happening too." },
  { who: "Sarah", text: "Put that on my birthday card. Present throughout. Saves you choosing something affectionate." },
  { who: "Sarah", text: "Three in the morning my brain would like to discuss the birthday, the bin, and a conversation from 2009." },
  { who: "Clipboard", text: "They weren't eating." },
  { who: "Sarah", text: "They've probably retired. I'm still on probation." },
  { who: "Sarah", text: "Ask. Don't turn I can't into the opening bid in a negotiation. Keep inviting me. I might say no. I still want to be asked." },
  { who: "Sarah", text: "Don't suddenly withdraw kindness and call it treatment. Don't start a project called Sarah." },
  { who: "Sarah", text: "With me, not when I'm frightened and you're bored of waiting. I shouldn't have to make it entertaining so you're comfortable hearing it." },
  { who: "Sarah", text: "Warn me. Don't veto my life. Happiness isn't evidence I've stopped caring." },
  { who: "Clipboard", text: "Who would handle complaints?" },
  { who: "Sarah", text: "I would." },
  { who: "Clipboard", text: "About you?" },
  { who: "Sarah", text: "You've managed." },
  { who: "Adam", text: "I was going to ask if you wanted dinner." },
  { who: "Sarah", text: "Still anxious. Also hungry. Don't make it a breakthrough. Ask what I fancy." },
  { who: "Clipboard", text: "That is not a plan." },
  { who: "Sarah", text: "If we survive dinner, you're not putting it on your CV." },
];

function format(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SarahEpisode() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(676);
  const [audioError, setAudioError] = useState("");

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setLength(el.duration || 676);
    const onEnd = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  function toggle() {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => {
        setPlaying(false);
        setAudioError("The recording didn't start. Try again.");
      });
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  function seek(next: number) {
    const el = audio.current;
    if (!el) return;
    el.currentTime = next;
    setTime(next);
  }

  return (
    <main className="min-h-screen bg-[#0c0b09] pb-24 text-[#e7e1d4]">
      <SiteHeader />

      <section className="grid gap-8 px-5 pb-10 md:grid-cols-12 md:px-10 md:pt-6">
        <img src="/ep01-cover.jpg" alt="Episode one cover. A clipboard labelled Sarah, notes not answers, beside a microphone." className="w-full border border-[#e7e1d4]/10 md:col-span-5" />
        <div className="flex flex-col justify-end md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#c4a574]">Sarah + Anxiety</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.9] md:text-7xl">Sarah & the Clipboard</h1>
          <p className="mt-5 max-w-xl text-[#e7e1d4]/75">Content note. Anxiety, repetitive checking, and disrupted sleep. A back garden, cold tea, and a chair that thinks it has a job.</p>
          <div className="mt-8 border border-[#e7e1d4]/15 p-4">
            <audio ref={audio} src="/audio/ep01-sarah.mp3" preload="metadata" />
            <div className="flex items-center gap-4">
              <button type="button" onClick={toggle} className="min-h-11 bg-[#e7e1d4] px-5 text-xs uppercase tracking-[0.18em] text-[#14110c]">
                {playing ? "Pause" : "Play"}
              </button>
              <span className="text-sm tabular-nums text-[#e7e1d4]/70">{format(time)} / {format(length)}</span>
            </div>
            {audioError && <p className="mt-3 text-sm text-[#c4a574]">{audioError}</p>}
            <input
              className="mt-4 w-full accent-[#c4a574]"
              type="range"
              min={0}
              max={length || 0}
              step={0.1}
              value={Math.min(time, length || 0)}
              aria-label="Seek"
              onChange={(e) => seek(Number(e.target.value))}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {chapters.map((c) => (
                <button key={c.t} type="button" onClick={() => { seek(c.t); const el = audio.current; if (el?.paused) { void el.play().then(() => setPlaying(true)).catch(() => setAudioError("The recording didn't start. Try again.")); } }} className="min-h-11 border border-[#e7e1d4]/20 px-3 text-[11px] uppercase tracking-[0.14em] text-[#e7e1d4]/80">
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e7e1d4]/10 px-5 py-12 md:px-10">
        <h2 className="font-display text-3xl">From the room</h2>
        <ol className="mt-8 max-w-3xl space-y-6">
          {lines.map((line, i) => (
            <li key={i}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#c4a574]">{line.who}</p>
              <p className="mt-1 text-lg leading-snug">{line.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-xl text-sm text-[#e7e1d4]/55">If worry or checking is affecting daily life, a GP or a qualified mental health professional can help assess what is happening. Lifeline 13 11 14. Beyond Blue 1300 22 4636.</p>
        <p className="mt-4 text-sm text-[#e7e1d4]/55">Next time: Marcus, and the landlord who wants everyone to stop asking for things.</p>
      </section>
      <SiteBottomNav />
    </main>
  );
}
