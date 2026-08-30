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
  skillGroups,
  type Project,
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
          "Press start and explore the levels: skills, missions, projects and achievements of Rithikka N, AI/ML and app developer.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [started, setStarted] = useState(false);
  const [xp, setXp] = useState(0);
  const [active, setActive] = useState("home");
  const [openProject, setOpenProject] = useState<Project | null>(null);
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

  useEffect(() => {
    if (!openProject) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenProject(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openProject]);

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
            <ProjectsLevel onOpen={setOpenProject} />
            <AchievementsLevel />
            <EducationLevel />
            <CertificationsLevel />
            <ContactLevel />
            <footer className="px-4 pb-8 text-center font-pixel text-[0.55rem] text-muted-foreground">
              © 2026 RITHIKKA N — GAME OVER? NO. CONTINUE ▸
            </footer>
          </main>

          {openProject && (
            <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
          )}
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
          <p className="font-pixel text-[0.6rem] text-neon-green">PLAYER 01 · WORLD 2026</p>
          <h1 className="mt-5 animate-glitch text-2xl text-neon-pink sm:text-4xl md:text-5xl">
            RITHIKKA N
          </h1>
          <p className="mt-5 font-pixel text-[0.7rem] leading-6 text-neon-cyan sm:text-sm">
            COMPUTER SCIENCE ENGINEERING GRADUATE
          </p>
          <p className="mt-2 text-xl text-neon-yellow">AI / ML • App Development • UI/UX</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="arcade-btn hover:arcade-btn-hover">
              ▸ ENTER PROJECT WORLD
            </a>
            <a
              href="#contact"
              className="arcade-btn hover:arcade-btn-hover"
              style={{ background: "var(--neon-cyan)" }}
            >
              ✉ FINAL MISSION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayerLevel() {
  const stats = [
    { k: "STATUS", v: "AVAILABLE FOR QUESTS", c: "var(--neon-green)" },
    { k: "ROLE", v: "AI/ML • APP DEV • UI/UX", c: "var(--neon-cyan)" },
    { k: "LOCATION", v: "Chennai, India", c: "var(--neon-yellow)" },
    { k: "EDUCATION", v: "B.E. CSE (AI & ML), 2022—2026", c: "var(--neon-pink)" },
  ];
  return (
    <LevelSection
      id="player"
      label="LEVEL 01"
      title="MEET THE PLAYER"
      accent="var(--neon-pink)"
    >
      <div className="grid gap-6 md:grid-cols-[320px_1fr]">
        <div className="pixel-frame pixel-frame-cyan p-6 text-center">
          <div
            className="mx-auto flex h-32 w-32 items-center justify-center border-4 border-neon-pink font-pixel text-3xl text-neon-pink animate-float-slow"
            style={{ background: "oklch(0.14 0.05 285)" }}
            aria-hidden
          >
            RN
          </div>
          <p className="mt-5 font-pixel text-xs text-neon-cyan">RITHIKKA N</p>
          <p className="mt-2 text-lg text-muted-foreground">CLASS: BUILDER</p>
          <div className="mt-5 space-y-2 text-left">
            {[
              ["HP", 100, "var(--neon-green)"],
              ["CREATIVITY", 92, "var(--neon-pink)"],
              ["PROBLEM SOLVING", 88, "var(--neon-yellow)"],
            ].map(([k, v, c]) => (
              <div key={k as string}>
                <p className="font-pixel text-[0.5rem] text-muted-foreground">{k as string}</p>
                <XPBar value={v as number} color={c as string} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="pixel-frame p-6">
            <p className="font-pixel text-[0.6rem] text-neon-yellow">▸ ABOUT THE PLAYER</p>
            <p className="mt-4 text-xl leading-8 text-foreground/90">
              Computer Science Engineering graduate specializing in Artificial Intelligence and
              Machine Learning with hands-on experience in building AI-driven applications, machine
              learning models, and cross-platform mobile applications. Experienced in Python,
              Flutter, Firebase, and UI/UX design, with a strong foundation in software development
              and problem-solving. Passionate about leveraging AI to build scalable, user-centric
              products and continuously learning emerging technologies.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div
                key={s.k}
                className="pixel-frame p-4 transition-transform duration-150 hover:-translate-y-1"
              >
                <p className="font-pixel text-[0.5rem]" style={{ color: s.c }}>
                  {s.k}
                </p>
                <p className="mt-2 text-lg">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LevelSection>
  );
}

function SkillsLevel() {
  return (
    <LevelSection id="skills" label="LEVEL 02" title="SKILL INVENTORY" accent="var(--neon-cyan)">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div
            key={g.title}
            className="pixel-frame group p-5 transition-all duration-150 hover:-translate-y-1 hover:shadow-none"
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
    </LevelSection>
  );
}

function MissionsLevel() {
  return (
    <LevelSection id="missions" label="LEVEL 03" title="MISSION LOG" accent="var(--neon-green)">
      <div className="space-y-6">
        {missions.map((m) => (
          <article
            key={m.id}
            className="pixel-frame p-6 transition-transform duration-150 hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-pixel text-[0.6rem] text-neon-green">{m.id}</p>
              <span className="border-2 border-neon-green px-2 py-1 font-pixel text-[0.45rem] text-neon-green">
                ✓ COMPLETED
              </span>
            </div>
            <h3 className="mt-4 text-sm text-neon-cyan sm:text-base">{m.org}</h3>
            <p className="mt-2 text-xl text-neon-yellow">{m.role}</p>
            <p className="text-lg text-muted-foreground">{m.duration}</p>
            <ul className="mt-4 space-y-2">
              {m.details.map((d) => (
                <li key={d} className="flex gap-3 text-lg leading-7">
                  <span className="text-neon-pink">▸</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <XPBar value={100} color="var(--neon-green)" />
            </div>
          </article>
        ))}
      </div>
    </LevelSection>
  );
}

function ProjectsLevel({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <LevelSection id="projects" label="LEVEL 04" title="PROJECT WORLD" accent="var(--neon-yellow)">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <button
            key={p.title}
            onClick={() => onOpen(p)}
            className="pixel-frame group relative overflow-hidden p-6 text-left transition-transform duration-150 hover:-translate-y-2"
            style={{ borderColor: p.color }}
          >
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[0.5rem]" style={{ color: p.color }}>
                {p.id}
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
            <p className="mt-2 font-pixel text-[0.5rem] text-muted-foreground">{p.category}</p>
            <p className="mt-4 text-lg leading-7 text-foreground/90">{p.short}</p>
            <div className="mt-4 max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-40">
              <div className="flex flex-wrap gap-2">
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
            </div>
            <span className="arcade-btn mt-6 inline-block group-hover:arcade-btn-hover">
              VIEW PROJECT
            </span>
          </button>
        ))}
      </div>
    </LevelSection>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[oklch(0.08_0.03_285)]/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div
        className="pixel-frame max-h-[85vh] w-full max-w-2xl animate-pop-in overflow-y-auto p-6 sm:p-8"
        style={{ borderColor: project.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-pixel text-[0.5rem]" style={{ color: project.color }}>
              {project.id} · {project.category}
            </p>
            <h3 className="mt-3 text-base leading-7" style={{ color: project.color }}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project"
            className="min-h-11 min-w-11 border-2 border-neon-pink font-pixel text-[0.6rem] text-neon-pink hover:bg-neon-pink hover:text-primary-foreground"
          >
            X
          </button>
        </div>

        <p className="mt-6 text-xl leading-8">{project.long}</p>

        <p className="mt-6 font-pixel text-[0.55rem] text-neon-cyan">▸ FEATURES</p>
        <ul className="mt-3 space-y-2">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3 text-lg">
              <span style={{ color: project.color }}>◆</span>
              {f}
            </li>
          ))}
        </ul>

        <p className="mt-6 font-pixel text-[0.55rem] text-neon-cyan">▸ TECH STACK</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border-2 px-2 py-1 font-pixel text-[0.45rem]"
              style={{ borderColor: project.color, color: project.color }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AchievementsLevel() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
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
          {achievements.map((a, i) => (
            <div
              key={a.title}
              className="pixel-frame p-5 transition-transform duration-150 hover:-translate-y-1"
              style={{
                borderColor: a.color,
                animation: inView ? `pop-in 0.5s steps(6,end) ${i * 0.12}s both` : undefined,
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center border-2 text-xl"
                style={{ borderColor: a.color, color: a.color }}
                aria-hidden
              >
                {a.icon}
              </div>
              <p className="mt-4 font-pixel text-[0.6rem]" style={{ color: a.color }}>
                {a.badge}
              </p>
              <p className="mt-3 text-lg leading-7">{a.title}</p>
              <p className="mt-2 text-base text-muted-foreground">{a.note}</p>
            </div>
          ))}
        </div>
      </div>
    </LevelSection>
  );
}

function EducationLevel() {
  return (
    <LevelSection id="education" label="LEVEL 06" title="TRAINING LOG" accent="var(--neon-blue)">
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
    <LevelSection id="contact" label="LEVEL 08" title="FINAL MISSION" accent="var(--neon-pink)">
      <div className="pixel-frame pixel-frame-pink p-8 text-center sm:p-12">
        <h3 className="text-base text-neon-yellow text-glow sm:text-xl">
          READY TO BUILD SOMETHING?
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-xl leading-8">
          Let's create something meaningful with AI, technology and design.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="arcade-btn hover:arcade-btn-hover"
          >
            GITHUB
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="arcade-btn hover:arcade-btn-hover"
            style={{ background: "var(--neon-cyan)" }}
          >
            LINKEDIN
          </a>
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
