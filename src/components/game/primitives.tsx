import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Immediate check so above-the-fold content is never stuck hidden.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) setInView(true);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}


export function LevelSection({
  id,
  label,
  title,
  accent = "var(--neon-cyan)",
  children,
}: {
  id: string;
  label: string;
  title: string;
  accent?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.08);
  return (
    <section
      id={id}
      ref={ref}
      className="scroll-mt-28 px-4 py-16 sm:px-6 md:py-24"
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={`mb-10 transition-all duration-500 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p
            className="font-pixel text-[0.6rem] tracking-widest"
            style={{ color: accent }}
          >
            ▸ {label}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 text-lg text-glow sm:text-2xl md:text-3xl"
            style={{ color: accent }}
          >
            {title}
          </h2>
          <div
            className="mt-4 h-1 w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 8px, transparent 8px 16px)`,
            }}
          />
        </div>
        <div
          className={`transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export function XPBar({ value, color }: { value: number; color: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  return (
    <div
      ref={ref}
      className="h-3 w-full border-2 border-border bg-[oklch(0.14_0.05_285)] p-[2px]"
    >
      <div
        className="h-full transition-[width] duration-1000 ease-out"
        style={{ width: inView ? `${value}%` : "0%", backgroundColor: color }}
      />
    </div>
  );
}

export function PixelStars() {
  const stars = Array.from({ length: 42 }, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 61) % 100,
    size: i % 3 === 0 ? 3 : 2,
    delay: (i % 7) * 0.4,
  }));
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-pulse bg-foreground/60"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CRT() {
  return (
    <>
      <div aria-hidden className="crt-overlay fixed inset-0 z-[60] opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-24 animate-scan bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--neon-cyan)_10%,transparent)] to-transparent"
      />
    </>
  );
}
