import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteBottomNav } from "@/components/site-bottom-nav";

export const Route = createFileRoute("/release")({ component: ReleasePage });

type Fields = {
  legalName: string;
  credit: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  session: string;
  signature: string;
  adult: boolean;
  volunteer: boolean;
  read: boolean;
};

const empty: Fields = {
  legalName: "",
  credit: "",
  email: "",
  phone: "",
  address: "",
  role: "",
  session: "",
  signature: "",
  adult: false,
  volunteer: false,
  read: false,
};

const roles = [
  "Voice of Anxiety, Episode 1, Sarah",
  "Voice of Depression, Episode 2, Marcus",
  "Voice of Trauma, Episode 3, Elena",
  "Voice of Bipolar, Episode 4, David",
  "Voice of OCD, Episode 5, Priya",
  "Voice of Addiction, Episode 6, Tom",
  "Voice of Panic, Episode 7, Aisha",
  "Voice of Rejection sensitivity, Episode 8, Liam",
  "Voice of Dysmorphia, Episode 9, Sophie",
  "Voice of Grief, Episode 10, Jordan",
  "Voice of Social anxiety, Episode 11, Mei",
  "Host read, or another role",
];

function today() {
  return new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function problems(f: Fields) {
  const notes: string[] = [];
  if (f.legalName.trim().length < 2) notes.push("Add your legal name.");
  if (f.address.trim().length < 5) notes.push("Add the address the Producer should keep on the release.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) notes.push("Add an email that can take a reply.");
  if (f.role.trim().length < 2) notes.push("Name the role or episode.");
  if (!f.adult) notes.push("This release is for adults. Under 18, do not use this form.");
  if (!f.volunteer) notes.push("Confirm you are volunteering for no financial reward.");
  if (!f.read) notes.push("Confirm you have read the copyright, moral rights, and Western Australian law terms.");
  if (f.signature.trim().toLowerCase() !== f.legalName.trim().toLowerCase() || f.signature.trim().length < 2) {
    notes.push("Type your legal name again, exactly, as the signature.");
  }
  return notes;
}

function documentText(f: Fields, signedOn: string) {
  const credit = f.credit.trim() || "No public credit";
  const session = f.session.trim() || "dates to be agreed";
  return `VOLUNTEER PERFORMER RELEASE
The Other Person in the Room
Draft for a Western Australian volunteer voice contribution. Not legal advice.

Date of signing: ${signedOn}

PARTIES
Performer: ${f.legalName.trim()}
Address: ${f.address.trim()}
Email: ${f.email.trim()}
Phone: ${f.phone.trim() || "Not given"}
Credit name: ${credit}

Producer: Adam James, host of the podcast The Other Person in the Room, Perth, Western Australia.

1. VOLUNTEER — NO FINANCIAL REWARD
The Performer takes part of their own free will, as a volunteer. There is no fee, wage, salary, superannuation, royalty, profit share, gift, or other financial reward for the performance or for signing this release. Nothing in this release creates employment, a contract for services, or a right to payment under the Fair Work Act 2009 (Cth) or any other law. The Performer may stop volunteering for future sessions at any time. Recordings already made, and this release, continue to apply to those recordings.

A receipted out-of-pocket expense is payable only if the Producer agrees to it in writing before the expense is incurred. Repayment of that expense is not a fee for the performance.

2. WHAT IS BEING RECORDED
The Performer will give a voice performance for The Other Person in the Room.
Role or episode: ${f.role.trim()}
Session: ${session}
If a session is also filmed, this release covers the Performer's image in that recording to the same extent as the voice.

3. COPYRIGHT — COPYRIGHT ACT 1968 (CTH)
Copyright in material an unpaid contributor creates stays with them unless it is assigned in writing. By signing, the Performer assigns to the Producer all copyright the Performer holds in the performance and in the sound recording of it, and all performers' rights in the performance that the Act allows to be dealt with, throughout the world, for the full term of those rights, including renewals. To the extent the Act allows future copyright to be assigned in writing, this assignment includes future copyright in the performance and recording.

The Producer may reproduce, edit, adapt, abridge, fictionalise, communicate, publish, and promote the recording in the podcast, the book, transcripts, excerpts, and publicity, including formats not yet in use.

If any part of that assignment is held not to pass, the Performer grants the Producer an exclusive, irrevocable, worldwide, royalty-free licence to use that part for the same purposes, for the full term of the right.

4. MORAL RIGHTS — CONSENT, NOT A WAIVER
Moral rights under the Copyright Act 1968 (Cth), including a performer's moral rights in a recorded performance, cannot be assigned or sold. They remain with the Performer. A waiver is not what this clause relies on.

The Performer consents in writing to the Producer, and anyone the Producer authorises, doing the following, including where the act would otherwise infringe those moral rights:
(a) not attributing the Performer, or attributing the Performer only by the credit name above;
(b) editing, shortening, rearranging, and placing the performance beside other voices, including a voice written as an illness, wound, or other presence;
(c) using the performance in the project and its promotion even if the Performer later objects to the context.

The consent is genuine, and it is limited to this project and promotion of this project.

5. PROMISES
The Performer confirms they are 18 or older and have capacity to sign. The voice is their own. They will not perform material that belongs to someone else unless the Producer has cleared it. They have been given time to read this release and may take it away before signing.

6. PRIVACY
The Producer will use the Performer's name and contact details only to administer this release and the recording, and will keep the signed copy reasonably secure. Completing the form on the project website does not send it anywhere. The Performer downloads or prints it, and gives the signed copy to Adam James themselves.

7. GOVERNING LAW
This release is governed by the laws of Western Australia and the applicable laws of the Commonwealth of Australia. The courts of Western Australia have exclusive jurisdiction.

8. WHAT THIS DRAFT DOES NOT DO
This document is a project draft for volunteer voice contributors. It is not legal advice and it is not a ruling that the production is a community organisation. The Volunteers and Food and Other Donors (Protection from Liability) Act 2002 (WA) is not stated to apply. A solicitor admitted in Western Australia should review this release before anyone relies on it.

The typed name is the Performer's electronic signature for this draft. The copy kept by the Producer should also carry a wet-ink signature, or another electronic signature the parties agree to use.

SIGNED by the Performer as a volunteer, for no financial reward.

Electronic signature: ${f.signature.trim()}
Legal name: ${f.legalName.trim()}
Date: ${signedOn}

Wet-ink signature: _______________________________

Witness name (optional): _______________________________
Witness signature: _______________________________
`;
}

function esc(s: string) {
  return s
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

function documentHtml(text: string) {
  const body = esc(text)
    .split("\n")
    .map((line) => (line.trim() ? `<p>${line}</p>` : "<br>"))
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Volunteer performer release</title>
    <style>
      body{font-family:Georgia,serif;color:#14110c;max-width:40rem;margin:2.5rem auto;line-height:1.45;padding:0 1.25rem}
      p{margin:0 0 .35rem}
    </style></head><body>${body}</body></html>`;
}

function fileSlug(name: string) {
  const slug = name.trim().replace(/[^\w\-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return slug || "performer";
}

function saveFile(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function ReleasePage() {
  const [fields, setFields] = useState<Fields>(empty);
  const [customRole, setCustomRole] = useState(false);
  const [doc, setDoc] = useState<string | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const paper = useRef<HTMLElement>(null);
  const signedOn = useMemo(() => today(), []);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function generate(e: React.FormEvent) {
    e.preventDefault();
    const found = problems(fields);
    setNotes(found);
    if (found.length) {
      setDoc(null);
      return;
    }
    setDoc(documentText(fields, signedOn));
    requestAnimationFrame(() => paper.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function download() {
    if (!doc) return;
    const slug = fileSlug(fields.legalName);
    saveFile(`OPITR-volunteer-release-${slug}.html`, documentHtml(doc), "text/html;charset=utf-8");
  }

  function printDoc() {
    if (!doc) return;
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) {
      setNotes(["The print window was blocked. Download the release and print that file."]);
      return;
    }
    w.document.write(documentHtml(doc));
    w.document.close();
    w.focus();
    w.print();
  }

  return (
    <main className="min-h-screen bg-[#0c0b09] pb-24 text-[#e7e1d4]">
      <SiteHeader />

      <section className="grid gap-12 px-5 py-12 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#c4a574]">Western Australia · Volunteer · No fee</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.9] md:text-6xl">A release for the voice, not a wage.</h1>
          <p className="mt-6 text-[#e7e1d4]/75">For adults lending a voice to Adam James. No financial reward. Copyright is assigned in writing, because a volunteer otherwise keeps it. Moral rights stay with the performer. The consent is a consent, not a waiver.</p>
          <p className="mt-4 text-sm text-[#e7e1d4]/55">The release is made on this device. It is not uploaded. It is a project draft, not legal advice. Have a Western Australian solicitor read it before anyone relies on it. Under 18: stop here.</p>
        </div>

        <form onSubmit={generate} className="space-y-4 md:col-span-7" noValidate>
          <Field id="legal-name" label="Legal name" value={fields.legalName} onChange={(v) => set("legalName", v)} autoComplete="name" />
          <Field id="credit" label="Credit name. Leave blank for no public credit." value={fields.credit} onChange={(v) => set("credit", v)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="email" label="Email" type="email" value={fields.email} onChange={(v) => set("email", v)} autoComplete="email" />
            <Field id="phone" label="Phone, if you want one on the form" value={fields.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
          </div>
          <Field id="address" label="Address" value={fields.address} onChange={(v) => set("address", v)} autoComplete="street-address" />
          <label className="block text-sm" htmlFor="role">
            <span className="mb-1 block text-[#e7e1d4]/70">Role</span>
            <select
              id="role"
              value={customRole ? "other" : fields.role}
              onChange={(e) => {
                if (e.target.value === "other") {
                  setCustomRole(true);
                  set("role", "");
                } else {
                  setCustomRole(false);
                  set("role", e.target.value);
                }
              }}
              className="min-h-11 w-full border border-[#e7e1d4]/20 bg-[#0c0b09] px-3 text-[#e7e1d4]"
            >
              <option value="">Choose a role</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
              <option value="other">Another role, typed below</option>
            </select>
          </label>
          {customRole && (
            <Field id="role-other" label="Type the role" value={fields.role} onChange={(v) => set("role", v)} />
          )}
          <Field id="session" label="Session date, if known" value={fields.session} onChange={(v) => set("session", v)} />
          <Check checked={fields.adult} onChange={(v) => set("adult", v)} label="I am 18 or older. This form is not for a child." />
          <Check checked={fields.volunteer} onChange={(v) => set("volunteer", v)} label="I am volunteering. I am not being paid, and I am not promised pay, a royalty, or a gift for this performance." />
          <Check checked={fields.read} onChange={(v) => set("read", v)} label="I have read that copyright is assigned, that moral rights stay with me, and that Western Australian law governs the release." />
          <Field id="signature" label="Type your legal name as your signature" value={fields.signature} onChange={(v) => set("signature", v)} />
          {notes.length > 0 && (
            <ul className="space-y-1 text-sm text-[#c4a574]" role="alert">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
          <button type="submit" className="min-h-11 bg-[#e7e1d4] px-5 text-xs uppercase tracking-[0.18em] text-[#14110c]">
            Generate the release
          </button>
        </form>
      </section>

      {doc && (
        <section ref={paper} className="border-t border-[#e7e1d4]/10 px-5 py-12 md:px-10">
          <p className="max-w-xl text-sm text-[#e7e1d4]/65">Download this and send the file to Adam James, or print it and sign the wet-ink line. The site does not keep a copy.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={download} className="min-h-11 bg-[#c4a574] px-5 text-xs uppercase tracking-[0.18em] text-[#14110c]">
              Download release
            </button>
            <button type="button" onClick={printDoc} className="min-h-11 border border-[#e7e1d4]/30 px-5 text-xs uppercase tracking-[0.18em]">
              Print release
            </button>
          </div>
          <pre className="mt-6 max-w-3xl whitespace-pre-wrap bg-[#e7e1d4] p-6 font-display text-sm leading-relaxed text-[#14110c]">{doc}</pre>
        </section>
      )}
      <SiteBottomNav />
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="mb-1 block text-[#e7e1d4]/70">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full border border-[#e7e1d4]/20 bg-transparent px-3 text-[#e7e1d4] outline-none"
      />
    </label>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 items-start gap-3 text-sm leading-snug text-[#e7e1d4]/80">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-4 accent-[#c4a574]"
      />
      <span>{label}</span>
    </label>
  );
}
