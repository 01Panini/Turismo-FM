type SoundBarsProps = {
  className?: string;
  /** Quando true, as barras animam; quando false, ficam baixas e fixas. */
  active?: boolean;
};

// Cada barra tem duração e atraso próprios, dando um movimento irregular
// (como um equalizador real de música ao vivo).
const BARS = [
  { duration: "0.9s", delay: "-0.10s" },
  { duration: "1.4s", delay: "-0.60s" },
  { duration: "0.7s", delay: "-0.30s" },
  { duration: "1.1s", delay: "-0.45s" },
  { duration: "0.8s", delay: "-0.75s" },
];

/** Barras de som: animam durante a transmissão; paradas ficam baixas e fixas. */
export default function SoundBars({ className, active = false }: SoundBarsProps) {
  return (
    <div className={`flex items-end justify-center gap-[3px] h-5 ${className ?? ""}`} aria-hidden>
      {BARS.map((bar, i) => (
        <div
          key={i}
          className={`w-[3px] bg-primary rounded-full ${active ? "h-full animate-visualize" : "h-1/5"}`}
          style={active ? ({ "--viz-duration": bar.duration, animationDelay: bar.delay } as React.CSSProperties) : undefined}
        />
      ))}
    </div>
  );
}
