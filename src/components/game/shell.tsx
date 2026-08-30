import { useEffect, useState } from "react";
import { navItems } from "@/lib/portfolio-data";

const bootLines = [
  "BOOTING RITHIKKA OS...",
  "LOADING ASSETS.........",
  "LOADING PORTFOLIO......",
  "PLAYER READY",
];

export function StartScreen({ onStart }: { onStart: () => void }) {
  const [phase, setPhase] = useState<"title" | "booting">("title");
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (phase !== "booting") return;
    const t = window.setInterval(() => {
      setLineCount((c) => {
        if (c >= bootLines.length) {
          window.clearInterval(t);
          window.setTimeout(onStart, 550);
          return c;
        }
        return c + 1;
      });
    }, 480);
    return () => window.clearInterval(t);
  }, [phase, onStart]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background px-4">
      <div className="crt-overlay pointer-events-none absolute inset-0 opacity-70" />
      {phase === "title" ? (
        <div className="relative w-full max-w-2xl text-center">
          <p className="font-pixel text-[0.6rem] text-neon-green">PLAYER 01</p>
          <p className="mt-6 font-pixel text-2xl text-neon-yellow text-glow sm:text-4xl">2026</p>
          <h1 className="mt-6 animate-glitch text-xl text-neon-pink sm:text-3xl md:text-5xl">
            RITHIKKA N
          </h1>
          <p className="mt-4 font-pixel text-sm text-neon-cyan text-glow sm:text-xl">PORTFOLIO</p>

          <button
            onClick={() => setPhase("booting")}
            className="arcade-btn mt-12 animate-pulse hover:arcade-btn-hover focus-visible:outline-2 focus-visible:outline-neon-cyan"
          >
            [ PRESS START ]
          </button>

          <div className="mt-12 space-y-2 text-base text-muted-foreground sm:text-lg">
            <p>
              <span className="text-neon-green">PLAYER 01</span> · INSERT CURIOSITY
            </p>
            <p>
              XP: <span className="text-neon-cyan">AI / ML / APP DEV</span>
            </p>
            <p>
              MISSION: <span className="text-neon-pink">BUILD • CREATE • LEARN</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-lg">
          <div className="pixel-frame pixel-frame-cyan p-6">
            {bootLines.slice(0, lineCount).map((l) => (
              <p key={l} className="text-lg text-neon-green">
                &gt; {l}
              </p>
            ))}
            <span className="inline-block h-4 w-2 animate-blink bg-neon-green align-middle" />
            <div className="mt-6 h-4 w-full border-2 border-neon-cyan p-[2px]">
              <div
                className="h-full bg-neon-cyan transition-[width] duration-500"
                style={{ width: `${(lineCount / bootLines.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HUD({
  level,
  xp,
  muted,
  onToggleMute,
}: {
  level: number;
  xp: number;
  muted: boolean;
  onToggleMute: () => void;
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b-4 border-border bg-[oklch(0.14_0.05_285)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
        <span className="font-pixel text-[0.55rem] text-neon-green">PLAYER 01</span>
        <span className="hidden font-pixel text-[0.55rem] text-neon-yellow sm:inline">
          LEVEL {String(level).padStart(2, "0")}
        </span>
        <div className="flex flex-1 items-center gap-2">
          <span className="font-pixel text-[0.55rem] text-neon-cyan">XP</span>
          <div className="h-3 flex-1 border-2 border-border p-[2px]">
            <div
              className="h-full bg-neon-pink transition-[width] duration-300"
              style={{ width: `${xp}%` }}
            />
          </div>
          <span className="font-pixel text-[0.55rem] text-neon-pink">{xp}%</span>
        </div>
        <button
          onClick={onToggleMute}
          aria-label={muted ? "Unmute retro music" : "Mute retro music"}
          className="border-2 border-neon-cyan px-2 py-1 font-pixel text-[0.55rem] text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-primary-foreground"
        >
          {muted ? "♪ OFF" : "♪ ON"}
        </button>
      </div>
    </div>
  );
}

export function GameNav({ active }: { active: string }) {
  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 top-[41px] z-40 hidden border-b-4 border-border bg-[oklch(0.18_0.06_286)]/95 backdrop-blur md:block"
      >
        <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1 px-3 py-2">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`block border-2 px-2 py-1 font-pixel text-[0.55rem] transition-all ${
                  active === n.id
                    ? "border-neon-pink bg-neon-pink text-primary-foreground"
                    : "border-transparent text-muted-foreground hover:border-neon-cyan hover:text-neon-cyan"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-border bg-[oklch(0.14_0.05_285)]/97 backdrop-blur md:hidden"
      >
        <ul className="flex overflow-x-auto px-2 py-2">
          {navItems.map((n) => (
            <li key={n.id} className="shrink-0">
              <a
                href={`#${n.id}`}
                className={`block min-h-11 border-2 px-3 py-2 font-pixel text-[0.5rem] ${
                  active === n.id
                    ? "border-neon-pink text-neon-pink"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {n.short}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
