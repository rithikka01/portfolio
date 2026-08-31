import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  achievements,
  certifications,
  education,
  links,
  missions,
  navItems,
  projects,
  toolLogos,
} from "@/lib/portfolio-data";
import { CRT, LevelSection, PixelStars, XPBar, useInView } from "@/components/game/primitives";
import { GameNav, HUD, StartScreen } from "@/components/game/shell";
import { useChiptune } from "@/components/game/use-chiptune";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rithikka N — 2026 Portfolio | AI/ML & App Developer" },
      {
        name: "description",
        content:
          "Retro arcade portfolio of Rithikka N, CSE (AI & ML) graduate from Chennai building AI-driven apps, ML models and Flutter experiences.",
      },
      { property: "og:title", content: "Rithikka N — 2026 Portfolio" },
      {
        property: "og:description",
        content:
          "Press start and explore: skills, experience, projects and achievements of Rithikka N, AI/ML and app developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [started, setStarted] = useState(false);
  const [xp, setXp] = useState(0);
  const [active, setActive] = useState("home");
  const { muted, toggle } = useChiptune();

  const handleStart = useCallback(() => setStarted(true), []);

  useEffect(() => {
    if (!started) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setXp(max > 0 ? Math.min(100, Math.round((h.scrollTop / max) * 100)) : 0);

      let current = "home";
      for (const n of navItems) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 180) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [started]);

  const levelIndex = Math.max(1, navItems.findIndex((n) => n.id === active));

  return (
    <>
      <PixelStars />
      <CRT />
      {!started && <StartScreen onStart={handleStart} />}

      {started && (
        <>
          <HUD level={levelIndex} xp={xp} muted={muted} onToggleMute={toggle} />
          <GameNav active={active} />

          <main className="pt-[100px] pb-24 md:pb-10">
            <Hero />
            <PlayerLevel />
            <SkillsLevel />
            <MissionsLevel />
            <ProjectsLevel />
            <AchievementsLevel />
            <EducationLevel />
            <CertificationsLevel />
            <ContactLevel />
            <footer className="px-4 pb-8 text-center font-pixel text-[0.55rem] text-muted-foreground">
              © 2026 RITHIKKA N — GAME OVER? NO. CONTINUE ▸
            </footer>
          </main>
        </>
      )}
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="scroll-mt-28 px-4 pt-8 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="pixel-frame pixel-frame-pink relative overflow-hidden p-6 sm:p-12">
          <div className="pointer-events-none absolute -right-6 -top-6 animate-float-slow font-pixel text-4xl text-neon-purple/40">
            ☁
          </div>
          <div className="pointer-events-none absolute bottom-4 right-8 animate-float-slow font-pixel text-2xl text-neon-cyan/40">
            ☁
          </div>
          <h1 className="animate-glitch text-xl text-neon-pink sm:text-3xl md:text-4xl">
            Hey, I&apos;m Rithikka 👋
          </h1>
          <p className="mt-6 font-pixel text-[0.65rem] leading-6 text-neon-cyan sm:text-sm">
            CSE (AI &amp; ML) GRADUATE | SOFTWARE DEVELOPER | AI &amp; ML ENTHUSIAST
          </p>
          <p className="mt-4 max-w-3xl text-xl leading-8 text-foreground/90">
            Building practical applications and AI-driven solutions with a passion for learning,
            problem-solving, and technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${links.email}`}
              className="arcade-btn hover:arcade-btn-hover"
            >
              HIRE ME
            </a>
            <a
              href="#contact"
              className="arcade-btn hover:arcade-btn-hover"
              style={{ background: "var(--neon-cyan)" }}
            >
              LET&apos;S CONNECT!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayerLevel() {
  const hobbies = [
    { icon: "🎨", text: "Exploring creative design & UI/UX" },
    { icon: "🎵", text: "Music & singing" },
    { icon: "✈️", text: "Travelling" },
  ];
  return (
    <LevelSection id="player" label="LEVEL 01" title="ABOUT ME" accent="var(--neon-pink)">
      <div className="pixel-frame p-6 sm:p-8">
        <h3 className="text-sm text-neon-yellow sm:text-base">Hey there! 👋 I&apos;m Rithikka</h3>
        <div className="mt-6 space-y-5 text-xl leading-8 text-foreground/90">
          <p>
            I&apos;m a CSE (AI &amp; ML) graduate, a software developer by passion, and a curious
            learner who enjoys turning ideas into practical solutions. My journey into technology has
            taken me through software development, web applications, AI &amp; machine learning, and
            UI/UX, where I&apos;ve enjoyed exploring how technology can solve real-world problems.
          </p>
          <p>
            I love building things that are not just functional, but also simple, intuitive, and
            meaningful for the people using them. From developing applications to exploring AI-driven
            solutions, I&apos;m always excited to learn, experiment, and take on new challenges.
          </p>
          <p>
            My goal is to grow as a software developer while combining my knowledge of computer
            science, AI &amp; ML, and application development to build useful and impactful products.
          </p>
        </div>

        <p className="mt-8 font-pixel text-[0.55rem] text-neon-cyan">▸ APART FROM CODING, I LOVE</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {hobbies.map((h) => (
            <div
              key={h.text}
              className="pixel-frame p-4 text-lg transition-transform duration-150 hover:-translate-y-1"
            >
              <span className="mr-2 text-2xl">{h.icon}</span>
              {h.text}
            </div>
          ))}
        </div>

        <p className="mt-8 border-l-4 border-neon-pink pl-4 text-xl italic leading-8 text-neon-yellow">
          &ldquo;You can always do more than you know — never stop learning.&rdquo;
        </p>
      </div>
    </LevelSection>
  );
}

function SkillsLevel() {
  return (
    <LevelSection
      id="skills"
      label="LEVEL 02"
      title="PROFESSIONAL SKILLS"
      accent="var(--neon-cyan)"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div
            key={g.title}
            className="pixel-frame group p-5 transition-all duration-150 hover:-translate-y-1"
            style={{ borderColor: g.color }}
          >
            <p className="font-pixel text-[0.55rem]" style={{ color: g.color }}>
              <span className="mr-2 text-base">{g.icon}</span>
              {g.title}
            </p>
            <ul className="mt-4 space-y-3">
              {g.items.map((it) => (
                <li key={it.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-lg">{it.name}</span>
                    {it.tag && (
                      <span className="font-pixel text-[0.45rem] text-muted-foreground">
                        {it.tag}
                      </span>
                    )}
                  </div>
                  <XPBar value={it.level} color={g.color} />
                </li>
              ))}
            </ul>
            <p className="mt-4 font-pixel text-[0.45rem] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              ★ ABILITY UNLOCKED
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <p className="font-pixel text-[0.6rem] text-neon-yellow">▸ TOOLS I USE</p>
        <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {toolLogos.map((t) => (
            <div
              key={t.name}
              title={t.name}
              className="pixel-frame flex flex-col items-center gap-2 p-3 transition-transform duration-150 hover:-translate-y-1"
            >
              <img
                src={`https://cdn.simpleicons.org/${t.slug}`}
                alt={`${t.name} logo`}
                loading="lazy"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                style={{ imageRendering: "auto" }}
              />
              <span className="text-center text-sm leading-5 text-muted-foreground">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </LevelSection>
  );
}

function MissionsLevel() {
  return (
    <LevelSection id="missions" label="LEVEL 03" title="EXPERIENCE" accent="var(--neon-green)">
      <div className="relative space-y-8 border-l-4 border-neon-green/60 pl-6 sm:pl-10">
        {missions.map((m) => (
          <article key={m.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[34px] top-4 h-4 w-4 border-2 border-neon-green bg-background sm:-left-[50px]"
            />
            <div className="pixel-frame p-6 transition-transform duration-150 hover:-translate-y-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-pixel text-[0.6rem] text-neon-green">{m.id}</p>
                <span className="border-2 border-neon-green px-2 py-1 font-pixel text-[0.45rem] text-neon-green">
                  🗓 {m.duration}
                </span>
              </div>
              <h3 className="mt-4 text-sm text-neon-cyan sm:text-base">{m.org}</h3>
              <p className="mt-3 text-xl text-neon-pink">PROJECT: {m.project}</p>
              <p className="text-xl text-neon-yellow">ROLE: {m.role}</p>
              <ul className="mt-4 space-y-2">
                {m.details.map((d) => (
                  <li key={d} className="flex gap-3 text-lg leading-7">
                    <span className="text-neon-pink">▸</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </LevelSection>
  );
}

function ProjectsLevel() {
  return (
    <LevelSection id="projects" label="LEVEL 04" title="PROJECTS" accent="var(--neon-yellow)">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="pixel-frame group relative block overflow-hidden p-6 transition-transform duration-150 hover:-translate-y-2"
            style={{ borderColor: p.color }}
          >
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[0.5rem]" style={{ color: p.color }}>
                {p.category}
              </span>
              <span className="font-pixel text-[0.45rem] text-neon-pink opacity-0 transition-opacity group-hover:opacity-100">
                ▶ MISSION READY
              </span>
            </div>
            <h3
              className="mt-4 text-sm leading-6 group-hover:animate-glitch sm:text-base"
              style={{ color: p.color }}
            >
              {p.title}
            </h3>
            <p className="mt-4 text-lg leading-7 text-foreground/90">{p.short}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="border-2 px-2 py-1 font-pixel text-[0.45rem]"
                  style={{ borderColor: p.color, color: p.color }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="arcade-btn inline-block group-hover:arcade-btn-hover">
                VIEW CODE ▸
              </span>
              {p.demo && (
                <span
                  className="arcade-btn inline-block"
                  style={{ background: "var(--neon-cyan)" }}
                >
                  LIVE DEMO
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </LevelSection>
  );
}

function AchievementsLevel() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [open, setOpen] = useState<string | null>(null);
  return (
    <LevelSection
      id="achievements"
      label="LEVEL 05"
      title="ACHIEVEMENTS UNLOCKED"
      accent="var(--neon-purple)"
    >
      <div ref={ref}>
        {inView && (
          <p className="mb-6 animate-pop-in font-pixel text-[0.6rem] text-neon-yellow text-glow">
            ★ ACHIEVEMENT UNLOCKED!
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const isOpen = open === a.title;
            return (
              <button
                key={a.title}
                onClick={() => setOpen(isOpen ? null : a.title)}
                aria-expanded={isOpen}
                className="pixel-frame p-5 text-left transition-transform duration-150 hover:-translate-y-1"
                style={{
                  borderColor: a.color,
                  animation: inView ? `pop-in 0.5s steps(6,end) ${i * 0.12}s both` : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center border-2 text-xl"
                    style={{ borderColor: a.color, color: a.color }}
                    aria-hidden
                  >
                    {a.icon}
                  </div>
                  <span className="font-pixel text-[0.5rem] text-muted-foreground">
                    {isOpen ? "▲ CLOSE" : "▼ DETAILS"}
                  </span>
                </div>
                <p className="mt-4 font-pixel text-[0.6rem]" style={{ color: a.color }}>
                  {a.badge}
                </p>
                <p className="mt-3 text-lg leading-7">{a.title}</p>
                <p className="mt-2 text-base text-muted-foreground">{a.note}</p>
                {isOpen && (
                  <p className="mt-4 animate-pop-in border-t-2 border-border pt-4 text-lg leading-7 text-foreground/90">
                    {a.detail}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </LevelSection>
  );
}

function EducationLevel() {
  return (
    <LevelSection
      id="education"
      label="LEVEL 06"
      title="EDUCATION JOURNEY"
      accent="var(--neon-blue)"
    >
      <div className="space-y-5">
        {education.map((e) => (
          <div
            key={e.title}
            className="pixel-frame p-6 transition-transform duration-150 hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xs leading-6 text-neon-blue sm:text-sm">{e.title}</h3>
              <span className="font-pixel text-[0.5rem] text-neon-yellow">{e.score}</span>
            </div>
            <p className="mt-3 text-xl">{e.place}</p>
            <p className="text-lg text-muted-foreground">{e.period}</p>
            <div className="mt-4">
              <XPBar value={e.progress} color="var(--neon-blue)" />
            </div>
          </div>
        ))}
      </div>
    </LevelSection>
  );
}

function CertificationsLevel() {
  return (
    <LevelSection
      id="certifications"
      label="LEVEL 07"
      title="CERTIFICATION VAULT"
      accent="var(--neon-green)"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((c) => (
          <div key={c.issuer} className="pixel-frame p-5" style={{ borderColor: c.color }}>
            <p className="font-pixel text-[0.55rem]" style={{ color: c.color }}>
              ▸ {c.issuer}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {c.items.map((it) => (
                <div
                  key={it}
                  className="border-2 p-3 text-center text-base transition-transform duration-150 hover:-translate-y-1"
                  style={{ borderColor: c.color }}
                >
                  <span className="block font-pixel text-[0.5rem]" style={{ color: c.color }}>
                    ◈
                  </span>
                  <span className="mt-2 block leading-6">{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LevelSection>
  );
}

function ContactLevel() {
  return (
    <LevelSection id="contact" label="LEVEL 08" title="LET'S CONNECT" accent="var(--neon-pink)">
      <div className="pixel-frame pixel-frame-pink mx-auto max-w-2xl p-8 text-center sm:p-12">
        <h3 className="text-base text-neon-yellow text-glow sm:text-xl">LET&apos;S CONNECT</h3>
        <p className="mx-auto mt-5 max-w-xl text-xl leading-8">
          I&apos;m currently open to new opportunities — my inbox is always open. Whether you have a
          question or just want to say hi, I&apos;ll do my best to get back to you!
        </p>

        <div className="mt-8 flex justify-center gap-5">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-14 w-14 items-center justify-center border-4 border-neon-cyan text-neon-cyan transition-transform hover:-translate-y-1"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18a4.65 4.65 0 0 1 1.24 3.24c0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-14 w-14 items-center justify-center border-4 border-neon-blue text-neon-blue transition-transform hover:-translate-y-1"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.95-3.07-1.96 0-2.26 1.46-2.26 2.97V21h-4V9Z" />
            </svg>
          </a>
          <a
            href={`mailto:${links.email}`}
            aria-label="Send an email"
            className="flex h-14 w-14 items-center justify-center border-4 border-neon-yellow text-neon-yellow transition-transform hover:-translate-y-1"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
              <path d="M2 5h20v14H2V5Zm2.4 2L12 12.3 19.6 7H4.4Zm15.6 2.3-8 5.6-8-5.6V17h16V9.3Z" />
            </svg>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${links.email}`}
            className="arcade-btn hover:arcade-btn-hover"
            style={{ background: "var(--neon-yellow)" }}
          >
            EMAIL ME
          </a>
        </div>
        <p className="mt-8 text-lg text-muted-foreground">{links.email} · Chennai, India</p>
      </div>
    </LevelSection>
  );
}
