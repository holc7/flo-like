"use client";

/**
 * Sova — Cikel's AI companion.
 * Warm, quiet, older-sister tone. Scripted responses, on-device framing.
 *
 * Usage:
 *   <SovaCard kind="morning" />
 *   <SovaCard kind="pattern" />
 *   <SovaFloating />   // floating button + chat panel
 */

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { X, Send } from "lucide-react";

type Locale = "sl" | "en" | "hr";

const SOVA_STRINGS = {
  sl: {
    name: "Sova",
    tagline: "Tvoja tiha spremljevalka",
    onDevice: "Deluje na tvoji napravi",
    thinking: "Sova razmišlja…",
    ask: "Vprašaj Sovo",
    askPh: "Vprašaj me karkoli…",
    chip_period: "Kdaj bo menstruacija?",
    chip_cramps: "Zakaj imam krče?",
    chip_mood: "Zakaj sem tečna?",
    chip_sleep: "Nasvet za spanec",
    close: "Zapri",
    noticed: "Sova je opazila",
    morning: "Jutranji šepet",
    intro: "Hej. Sem Sova. Tu sem, da te poslušam — brez sodbe, brez oblaka.",
    r_period: "Glede na tvoj zadnji cikel pričakujem menstruacijo čez približno 14 dni. A telesa niso stroji — lahko se zamakne za dan ali dva.",
    r_cramps: "Krči v tej fazi so pogosti — prostaglandini spodbudijo maternico, da se skrči. Topla termofor ali sprehod pogosto pomaga.",
    r_mood: "Če si v lutealni fazi, je razdražljivost običajna — estrogen pada. To ni \"v tvoji glavi\". Bodi nežna do sebe.",
    r_sleep: "V lutealni fazi se telesna temperatura dvigne in spanje je lahko krhkejše. Hladnejša soba, brez ekranov 30 min pred spanjem.",
    r_default: "Ne znam vedno odgovoriti, a znam poslušati. Povej mi več — kako se počutiš danes?",
    noticed_pattern: "Zadnja 2 cikla sem zabeležila glavobole okoli 24. dne. Vzorec? Vredno opazovati.",
    morning_whisper: "Danes je lunarni polni trenutek tvojega cikla — oviluacija je blizu. Popij malo več vode, pojdi ven.",
  },
  en: {
    name: "Sova",
    tagline: "Your quiet companion",
    onDevice: "Runs on your device",
    thinking: "Sova is thinking…",
    ask: "Ask Sova",
    askPh: "Ask me anything…",
    chip_period: "When is my period?",
    chip_cramps: "Why do I have cramps?",
    chip_mood: "Why am I irritable?",
    chip_sleep: "Sleep tip",
    close: "Close",
    noticed: "Sova noticed",
    morning: "Morning whisper",
    intro: "Hi. I'm Sova. I'm here to listen — no judgement, no cloud.",
    r_period: "Based on your last cycle, I'd expect your period in about 14 days. Bodies aren't machines — it can shift a day or two.",
    r_cramps: "Cramps in this phase are common — prostaglandins signal the uterus to contract. A warm pad or a walk often helps.",
    r_mood: "If you're in the luteal phase, irritability is typical — estrogen is falling. It's not in your head. Be gentle with yourself.",
    r_sleep: "In the luteal phase body temperature rises and sleep can be lighter. Cooler room, no screens 30 min before bed.",
    r_default: "I don't always know the answer, but I know how to listen. Tell me more — how are you feeling today?",
    noticed_pattern: "I noticed headaches logged around day 24 in your last 2 cycles. A pattern? Worth watching.",
    morning_whisper: "Today is the full-moon moment of your cycle — ovulation is near. Drink a little more water, get outside.",
  },
  hr: {
    name: "Sova",
    tagline: "Tvoja tiha pratilja",
    onDevice: "Radi na tvom uređaju",
    thinking: "Sova razmišlja…",
    ask: "Pitaj Sovu",
    askPh: "Pitaj me bilo što…",
    chip_period: "Kad mi je menstruacija?",
    chip_cramps: "Zašto imam grčeve?",
    chip_mood: "Zašto sam razdražljiva?",
    chip_sleep: "Savjet za san",
    close: "Zatvori",
    noticed: "Sova je primijetila",
    morning: "Jutarnji šapat",
    intro: "Bok. Ja sam Sova. Tu sam da te slušam — bez osude, bez oblaka.",
    r_period: "Prema tvom zadnjem ciklusu, menstruaciju očekujem za otprilike 14 dana. Tijela nisu strojevi — može se pomaknuti dan-dva.",
    r_cramps: "Grčevi u ovoj fazi su česti — prostaglandini potiču maternicu na kontrakcije. Topli termofor ili šetnja često pomažu.",
    r_mood: "Ako si u lutealnoj fazi, razdražljivost je uobičajena — estrogen opada. Nije \"u tvojoj glavi\". Budi nježna prema sebi.",
    r_sleep: "U lutealnoj fazi tjelesna temperatura se povisi i san može biti lakši. Hladnija soba, bez ekrana 30 min prije spavanja.",
    r_default: "Ne znam uvijek odgovor, ali znam slušati. Reci mi više — kako se osjećaš danas?",
    noticed_pattern: "Primijetila sam glavobolje oko 24. dana u zadnja 2 ciklusa. Obrazac? Vrijedno promatrati.",
    morning_whisper: "Danas je trenutak punog mjeseca tvog ciklusa — ovulacija je blizu. Popij malo više vode, izađi van.",
  },
} as const;

function route(question: string, locale: Locale): string {
  const s = SOVA_STRINGS[locale];
  const q = question.toLowerCase();
  if (/period|menstruaci|krvav|mesečni/.test(q)) return s.r_period;
  if (/cramp|krč|bol|grčev/.test(q)) return s.r_cramps;
  if (/mood|razpolož|tečna|razdraž|irritab/.test(q)) return s.r_mood;
  if (/sleep|spanj|spanec|san/.test(q)) return s.r_sleep;
  return s.r_default;
}

function SovaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-4.5 0-8 3.5-8 8 0 3 1.5 5.5 4 7v2h8v-2c2.5-1.5 4-4 4-7 0-4.5-3.5-8-8-8z" />
      <circle cx="9" cy="10" r="1.8" fill="currentColor" />
      <circle cx="15" cy="10" r="1.8" fill="currentColor" />
      <path d="M12 12.5l-1 1.5h2l-1-1.5z" fill="currentColor" />
    </svg>
  );
}

export function SovaCard({ kind = "pattern", compact = false }: { kind?: "pattern" | "morning"; compact?: boolean }) {
  const locale = useLocale() as Locale;
  const s = SOVA_STRINGS[locale] ?? SOVA_STRINGS.sl;
  const body = kind === "morning" ? s.morning_whisper : s.noticed_pattern;
  const label = kind === "morning" ? s.morning : s.noticed;

  return (
    <div
      className="flex gap-3 rounded-2xl border p-5"
      style={{
        background: "color-mix(in oklab, var(--accent-soft) 55%, var(--surface))",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full border"
        style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--accent)" }}
      >
        <SovaIcon size={compact ? 18 : 22} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
            {label}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--accent)" }}
          >
            <span className="size-[5px] rounded-full" style={{ background: "var(--fertile)" }} />
            {s.onDevice}
          </span>
        </div>
        <div
          className="italic leading-snug"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: compact ? 14 : 16,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
          }}
        >
          &ldquo;{body}&rdquo;
        </div>
      </div>
    </div>
  );
}

export function SovaFloating() {
  const locale = useLocale() as Locale;
  const s = SOVA_STRINGS[locale] ?? SOVA_STRINGS.sl;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "me" | "sova"; text: string }[]>([{ from: "sova", text: s.intro }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ from: "sova", text: s.intro }]);
  }, [locale, s.intro]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "me", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "sova", text: route(text, locale) }]);
      setThinking(false);
    }, 900);
  };

  const chips = [s.chip_period, s.chip_cramps, s.chip_mood, s.chip_sleep];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg"
        style={{ background: "var(--ink)", color: "var(--bg)" }}
      >
        <SovaIcon size={20} />
        <span className="text-sm font-medium">{s.ask}</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col overflow-hidden rounded-3xl border shadow-2xl"
      style={{
        width: "min(380px, calc(100vw - 40px))",
        height: "min(560px, calc(100vh - 40px))",
        background: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--ink)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4" style={{ borderColor: "var(--border)" }}>
        <div
          className="flex size-10 items-center justify-center rounded-full"
          style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
        >
          <SovaIcon size={22} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">{s.name}</div>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--ink-muted)" }}>
            <span className="size-1.5 rounded-full" style={{ background: "var(--fertile)" }} />
            {s.onDevice}
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="flex size-8 items-center justify-center rounded-lg"
          style={{ color: "var(--ink-muted)" }}
          aria-label={s.close}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${m.from === "me" ? "self-end" : "self-start italic"}`}
            style={{
              background: m.from === "me" ? "var(--accent)" : "var(--surface-alt)",
              color: m.from === "me" ? "var(--accent-ink)" : "var(--ink)",
              fontFamily: m.from === "sova" ? "var(--font-serif)" : "var(--font-sans)",
            }}
          >
            {m.text}
          </div>
        ))}
        {thinking && (
          <div
            className="flex items-center gap-1.5 self-start rounded-2xl px-3.5 py-2.5"
            style={{ background: "var(--surface-alt)", color: "var(--ink-muted)" }}
          >
            <span className="size-1.5 rounded-full" style={{ background: "var(--ink-muted)", animation: "sovaPulse 1.2s infinite" }} />
            <span className="size-1.5 rounded-full" style={{ background: "var(--ink-muted)", animation: "sovaPulse 1.2s infinite 0.15s" }} />
            <span className="size-1.5 rounded-full" style={{ background: "var(--ink-muted)", animation: "sovaPulse 1.2s infinite 0.3s" }} />
          </div>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5 px-3.5 pt-1">
        {chips.map((c, i) => (
          <button
            key={i}
            onClick={() => send(c)}
            className="rounded-full border px-2.5 py-1 text-[11px]"
            style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mt-2 flex gap-2 border-t p-3" style={{ borderColor: "var(--border)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
          placeholder={s.askPh}
          className="flex-1 rounded-full border px-3.5 py-2 text-sm outline-none"
          style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
        />
        <button
          onClick={() => send(input)}
          className="flex size-10 items-center justify-center rounded-full"
          style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
