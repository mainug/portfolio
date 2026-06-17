"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const N = 60;

const ALGOS = [
  { id: "bubble",    label: "Bubble Sort",    color: "#7c3aed", hiColor: "#c4b5fd" },
  { id: "insertion", label: "Insertion Sort", color: "#06b6d4", hiColor: "#67e8f9" },
  { id: "merge",     label: "Merge Sort",     color: "#10b981", hiColor: "#6ee7b7" },
  { id: "quick",     label: "Quick Sort",     color: "#f59e0b", hiColor: "#fde68a" },
] as const;

type AlgoId = typeof ALGOS[number]["id"];
type StepType = "cmp" | "swap" | "place";
type Step = { arr: number[]; hi: number[]; type: StepType };

const MEDALS = ["🥇", "🥈", "🥉", "4위"];

// ── Sorting generators ──────────────────────────────────────────────────

function* bubbleSort(a: number[]): Generator<Step> {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      yield { arr: a, hi: [j, j + 1], type: "cmp" };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { arr: a, hi: [j, j + 1], type: "swap" };
      }
    }
  }
}

function* insertionSort(a: number[]): Generator<Step> {
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0) {
      yield { arr: a, hi: [j, j + 1], type: "cmp" };
      if (a[j] > key) { a[j + 1] = a[j]; yield { arr: a, hi: [j + 1], type: "swap" }; j--; }
      else break;
    }
    a[j + 1] = key;
    yield { arr: a, hi: [j + 1], type: "place" };
  }
}

function* mergeSort(a: number[]): Generator<Step> {
  const n = a.length;
  for (let size = 1; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size, n);
      const right = Math.min(left + 2 * size, n);
      if (mid >= right) continue;
      const L = a.slice(left, mid), R = a.slice(mid, right);
      let i = 0, j = 0, k = left;
      while (i < L.length && j < R.length) {
        a[k] = L[i] <= R[j] ? L[i++] : R[j++];
        yield { arr: a, hi: [k++], type: "place" };
      }
      while (i < L.length) { a[k] = L[i++]; yield { arr: a, hi: [k++], type: "place" }; }
      while (j < R.length) { a[k] = R[j++]; yield { arr: a, hi: [k++], type: "place" }; }
    }
  }
}

function* quickSort(a: number[]): Generator<Step> {
  const stack: [number, number][] = [[0, a.length - 1]];
  while (stack.length) {
    const [lo, hi] = stack.pop()!;
    if (lo >= hi) continue;
    const pivot = a[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      yield { arr: a, hi: [j, hi], type: "cmp" };
      if (a[j] <= pivot) {
        i++;
        if (i !== j) { [a[i], a[j]] = [a[j], a[i]]; yield { arr: a, hi: [i, j], type: "swap" }; }
      }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    yield { arr: a, hi: [i + 1], type: "place" };
    stack.push([lo, i], [i + 2, hi]);
  }
}

const GEN_MAP: Record<AlgoId, (a: number[]) => Generator<Step>> = {
  bubble: bubbleSort, insertion: insertionSort, merge: mergeSort, quick: quickSort,
};

// ── Component ────────────────────────────────────────────────────────────

export default function SortRace() {
  const [status, setStatus]   = useState<"idle" | "running" | "done">("idle");
  const [speed, setSpeed]     = useState(6);
  const [, forceTick]         = useState(0);

  // Animation state — all in refs to avoid stale closures
  const gensRef     = useRef<Generator<Step>[]>([]);
  const snapRefs    = useRef<number[][]>([]);
  const hiRefs      = useRef<number[][]>([]);
  const typeRefs    = useRef<StepType[]>([]);
  const doneRefs    = useRef<boolean[]>([]);
  const compRefs    = useRef<number[]>([]);
  const opRefs      = useRef<number[]>([]);
  const rankRefs    = useRef<(number | null)[]>([]);
  const rankCounter = useRef(0);
  const rafRef      = useRef<number>(0);
  const runningRef  = useRef(false);
  const speedRef    = useRef(speed);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  const buildRace = useCallback(() => {
    const base = Array.from({ length: N }, (_, i) => i + 1);
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    gensRef.current  = [];
    snapRefs.current = [];
    hiRefs.current   = [];
    typeRefs.current = [];
    doneRefs.current = [];
    compRefs.current = [];
    opRefs.current   = [];
    rankRefs.current = [];
    rankCounter.current = 0;

    ALGOS.forEach(algo => {
      const arr = [...base];
      gensRef.current.push(GEN_MAP[algo.id](arr));
      snapRefs.current.push([...arr]);
      hiRefs.current.push([]);
      typeRefs.current.push("cmp");
      doneRefs.current.push(false);
      compRefs.current.push(0);
      opRefs.current.push(0);
      rankRefs.current.push(null);
    });
  }, []);

  useEffect(() => { buildRace(); }, [buildRace]);

  const animate = useCallback(() => {
    if (!runningRef.current) return;

    let allDone = true;

    for (let idx = 0; idx < ALGOS.length; idx++) {
      if (doneRefs.current[idx]) continue;
      allDone = false;

      const gen = gensRef.current[idx];
      for (let s = 0; s < speedRef.current; s++) {
        const result = gen.next();
        if (result.done) {
          doneRefs.current[idx] = true;
          rankRefs.current[idx] = ++rankCounter.current;
          hiRefs.current[idx]   = [];
          break;
        }
        const { arr, hi, type } = result.value;
        snapRefs.current[idx] = [...arr];
        hiRefs.current[idx]   = hi;
        typeRefs.current[idx] = type;
        if (type === "cmp") compRefs.current[idx]++;
        else opRefs.current[idx]++;
      }
    }

    forceTick(t => t + 1);

    if (allDone) {
      runningRef.current = false;
      setStatus("done");
    } else {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const start = useCallback(() => {
    runningRef.current = true;
    setStatus("running");
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current!);
    runningRef.current = false;
    buildRace();
    setStatus("idle");
    forceTick(t => t + 1);
  }, [buildRace]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current!), []);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col px-6 py-10 gap-8">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-5 max-w-6xl mx-auto w-full">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] mb-1">Lab</p>
          <h1 className="text-xl font-bold">정렬 알고리즘 레이스</h1>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--muted)]">속도</span>
          <input
            type="range" min={1} max={40} value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            disabled={status === "running"}
            className="w-28 accent-violet-500 cursor-pointer disabled:opacity-40"
          />
          <span className="text-xs text-[var(--muted)] w-8 tabular-nums">{speed}×</span>
        </div>

        {status === "running" ? (
          <button onClick={reset}
            className="px-5 py-2 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10 transition-colors">
            ↺ 리셋
          </button>
        ) : (
          <button onClick={status === "done" ? reset : start}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-semibold hover:opacity-90 transition-opacity">
            {status === "done" ? "↺ 다시하기" : "▶ 시작"}
          </button>
        )}
      </div>

      {/* Race panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 max-w-6xl mx-auto w-full">
        {ALGOS.map((algo, idx) => {
          const snapshot = snapRefs.current[idx] ?? [];
          const hi       = new Set(hiRefs.current[idx] ?? []);
          const stepType = typeRefs.current[idx] ?? "cmp";
          const done     = doneRefs.current[idx] ?? false;
          const comps    = compRefs.current[idx]  ?? 0;
          const ops      = opRefs.current[idx]    ?? 0;
          const rank     = rankRefs.current[idx]  ?? null;

          return (
            <div key={algo.id}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 flex flex-col gap-3 relative transition-colors duration-500"
              style={done ? { borderColor: algo.color + "50", backgroundColor: algo.color + "06" } : {}}>

              {/* Rank badge */}
              {rank !== null && (
                <span className="absolute top-3 right-4 text-xl leading-none">
                  {MEDALS[rank - 1] ?? `${rank}위`}
                </span>
              )}

              {/* Header */}
              <div className="flex items-center gap-2 pr-8">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: algo.color }} />
                <span className="text-sm font-semibold">{algo.label}</span>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-px rounded-lg overflow-hidden bg-[#0d0d18]" style={{ height: 150 }}>
                {snapshot.map((v, i) => {
                  const isHi = hi.has(i);
                  const bg = done
                    ? algo.color
                    : isHi
                      ? (stepType === "cmp" ? algo.hiColor : algo.color)
                      : "#1a1a2e";
                  return (
                    <div key={i} style={{ flex: 1, height: `${(v / N) * 100}%`, backgroundColor: bg, minWidth: 1 }} />
                  );
                })}
              </div>

              {/* Stats */}
              <div className="flex gap-5 text-xs text-[var(--muted)] tabular-nums">
                <span>비교 <span className="text-white font-mono">{comps.toLocaleString()}</span></span>
                <span>조작 <span className="text-white font-mono">{ops.toLocaleString()}</span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
