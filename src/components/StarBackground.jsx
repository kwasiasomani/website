import { useEffect, useRef, useState } from "react";

const COLORS = [
  { c: "rgba(56,189,248,0.95)", w: 0.34 }, // cyan
  { c: "rgba(45,212,191,0.95)", w: 0.28 }, // teal
  { c: "rgba(249,115,22,0.95)", w: 0.18 }, // orange
  { c: "rgba(250,204,21,0.90)", w: 0.10 }, // yellow
  { c: "rgba(167,139,250,0.90)", w: 0.07 }, // purple
  { c: "rgba(248,250,252,0.85)", w: 0.03 }, // near-white
];

const r = (min, max) => Math.random() * (max - min) + min;
const ri = (min, max) => Math.floor(r(min, max + 1));
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function pickWeightedColor() {
  const total = COLORS.reduce((s, x) => s + x.w, 0);
  let t = Math.random() * total;
  for (const x of COLORS) {
    t -= x.w;
    if (t <= 0) return x.c;
  }
  return COLORS[0].c;
}

export const StarBackground = () => {
  const wrapRef = useRef(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ px: 0, py: 0 });

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const tick = () => {
      const el = wrapRef.current;
      if (!el) return;

      // smooth follow
      const curPx = parseFloat(el.style.getPropertyValue("--px") || "0");
      const curPy = parseFloat(el.style.getPropertyValue("--py") || "0");
      const nextPx = curPx + (targetRef.current.px - curPx) * 0.08;
      const nextPy = curPy + (targetRef.current.py - curPy) * 0.08;

      el.style.setProperty("--px", nextPx.toFixed(4));
      el.style.setProperty("--py", nextPy.toFixed(4));

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (prefersReduced) return;
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w) * 2 - 1; // -1..1
      const y = (e.clientY / h) * 2 - 1; // -1..1
      targetRef.current.px = clamp(x, -1, 1);
      targetRef.current.py = clamp(y, -1, 1);
    };

    const onLeave = () => {
      targetRef.current.px = 0;
      targetRef.current.py = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const generate = () => {
      const area = window.innerWidth * window.innerHeight;

      // constellation clusters (screenshot-style)
      const constellationCount = Math.max(10, Math.floor(area / 65000));
      const singlesCount = Math.max(12, Math.floor(area / 90000));

      const nextNodes = [];
      const nextEdges = [];
      let id = 0;

      for (let c = 0; c < constellationCount; c++) {
        const cx = r(4, 96);
        const cy = r(6, 94);
        const n = ri(3, 6);
        const spread = r(6, 12);

        const cluster = [];
        for (let i = 0; i < n; i++) {
          const x = clamp(cx + r(-spread, spread), 0, 100);
          const y = clamp(cy + r(-spread, spread), 0, 100);

          const node = {
            id: id++,
            x,
            y,
            rr: r(1.6, 3.4),
            o: r(0.75, 1.0),
            color: pickWeightedColor(),
          };
          cluster.push(node);
          nextNodes.push(node);
        }

        cluster.sort((a, b) => a.x - b.x);
        for (let i = 0; i < cluster.length - 1; i++) {
          const a = cluster[i];
          const b = cluster[i + 1];
          nextEdges.push({
            id: `e-${a.id}-${b.id}`,
            x1: a.x, y1: a.y,
            x2: b.x, y2: b.y,
            o: r(0.06, 0.14),
            w: r(0.6, 1.1),
          });
        }

        if (Math.random() < 0.55 && cluster.length >= 4) {
          const a = cluster[ri(0, cluster.length - 2)];
          const b = cluster[ri(1, cluster.length - 1)];
          nextEdges.push({
            id: `e2-${a.id}-${b.id}`,
            x1: a.x, y1: a.y,
            x2: b.x, y2: b.y,
            o: r(0.05, 0.11),
            w: r(0.6, 1.0),
          });
        }
      }

      for (let i = 0; i < singlesCount; i++) {
        nextNodes.push({
          id: id++,
          x: r(0, 100),
          y: r(0, 100),
          rr: r(1.4, 3.0),
          o: r(0.6, 1.0),
          color: pickWeightedColor(),
        });
      }

      setNodes(nextNodes);
      setEdges(nextEdges);
    };

    generate();
    window.addEventListener("resize", generate);
    return () => window.removeEventListener("resize", generate);
  }, []);

  return (
    <div ref={wrapRef} className="starbg-wrap">
      <div className="absolute inset-0 space-gradient" />
      <div className="absolute left-0 right-0 top-6 h-px space-topline opacity-40" />

      <svg className="absolute inset-0 w-full h-full">
        {edges.map((e) => (
          <line
            key={e.id}
            x1={`${e.x1}%`}
            y1={`${e.y1}%`}
            x2={`${e.x2}%`}
            y2={`${e.y2}%`}
            stroke="rgba(148, 163, 184, 1)"
            strokeOpacity={e.o}
            strokeWidth={e.w}
            strokeLinecap="round"
          />
        ))}

        {nodes.map((n) => (
          <circle
            key={n.id}
            cx={`${n.x}%`}
            cy={`${n.y}%`}
            r={n.rr}
            fill={n.color}
            fillOpacity={n.o}
            className="node-glow"
          />
        ))}
      </svg>

      {/* BIG bubbles/planets (parallax) */}
      <div
        className="planet planet-teal"
        style={{
          left: "30%",
          top: "58%",
          width: "clamp(320px, 34vw, 560px)",
          height: "clamp(320px, 34vw, 560px)",
          ["--dx"]: "28px",
          ["--dy"]: "18px",
        }}
      />

      <div
        className="planet planet-rainbow"
        style={{
          right: "16%",
          top: "18%",
          width: "clamp(260px, 24vw, 420px)",
          height: "clamp(260px, 24vw, 420px)",
          ["--dx"]: "36px",
          ["--dy"]: "26px",
        }}
      >
        <div className="planet-rainbow-band" />
      </div>

      <div
        className="planet planet-purple"
        style={{
          right: "6%",
          bottom: "24%",
          width: "clamp(220px, 20vw, 340px)",
          height: "clamp(220px, 20vw, 340px)",
          ["--dx"]: "18px",
          ["--dy"]: "14px",
        }}
      />

      {/* huge brown one partially visible */}
      <div
        className="planet planet-brown"
        style={{
          right: "-8%",
          bottom: "-18%",
          width: "clamp(420px, 40vw, 760px)",
          height: "clamp(420px, 40vw, 760px)",
          ["--dx"]: "14px",
          ["--dy"]: "10px",
        }}
      />
    </div>
  );
};
