import { useCallback, useEffect, useRef, useState } from "react";

/** Tiny procedural 8-bit loop (square-wave arpeggio) — no audio files needed. */
export function useChiptune() {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    void ctxRef.current?.suspend();
  }, []);

  const start = useCallback(() => {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    if (!ctxRef.current) {
      const ctx = new Ctx();
      const gain = ctx.createGain();
      gain.gain.value = 0.04;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = gain;
    }
    const ctx = ctxRef.current;
    void ctx.resume();

    const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 783.99, 880, 659.25];
    let i = 0;
    const play = () => {
      const c = ctxRef.current;
      const g = gainRef.current;
      if (!c || !g) return;
      const osc = c.createOscillator();
      const env = c.createGain();
      osc.type = "square";
      const freq = notes[i % notes.length] ?? 523.25;
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0.0001, c.currentTime);
      env.gain.exponentialRampToValueAtTime(1, c.currentTime + 0.01);
      env.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.24);
      osc.connect(env);
      env.connect(g);
      osc.start();
      osc.stop(c.currentTime + 0.26);

      const bass = c.createOscillator();
      const benv = c.createGain();
      bass.type = "triangle";
      bass.frequency.value = freq / 4;
      benv.gain.setValueAtTime(0.6, c.currentTime);
      benv.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.3);
      bass.connect(benv);
      benv.connect(g);
      bass.start();
      bass.stop(c.currentTime + 0.32);
      i++;
    };
    play();
    timerRef.current = window.setInterval(play, 280);
  }, []);

  const toggle = useCallback(() => {
    setMuted((m) => {
      if (m) start();
      else stop();
      return !m;
    });
  }, [start, stop]);

  useEffect(() => () => stop(), [stop]);

  return { muted, toggle };
}
