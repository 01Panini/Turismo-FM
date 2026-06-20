"use client";

import { useEffect, useRef, useState } from "react";

type ScrollingTextProps = {
  text: string;
  className?: string;
  /** Velocidade do letreiro em pixels por segundo. */
  speed?: number;
};

/**
 * Exibe o texto normalmente quando ele cabe no container; quando estoura,
 * vira um letreiro digital rolando da direita para a esquerda em loop contínuo
 * (estilo painel de som automotivo).
 */
export default function ScrollingText({ text, className, speed = 45 }: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const check = () => {
      const contentWidth = measure.scrollWidth;
      const available = container.clientWidth;
      if (available === 0) return;
      setOverflowing(contentWidth > available + 1);
      setDuration(contentWidth / speed);
    };

    // Mede agora, no próximo frame (layout estável) e quando as fontes carregam
    // (o swap da fonte muda a largura do texto).
    check();
    const raf = requestAnimationFrame(check);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(check).catch(() => {});
    }

    const observer = new ResizeObserver(check);
    observer.observe(container);
    observer.observe(measure);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [text, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      title={text}
    >
      <div
        className={`flex w-max max-w-none whitespace-nowrap ${overflowing ? "animate-marquee" : ""}`}
        style={overflowing ? ({ "--marquee-duration": `${duration}s` } as React.CSSProperties) : undefined}
      >
        {/* Primeira cópia (também usada para medir a largura) */}
        <span ref={measureRef} className={overflowing ? "pr-10" : ""}>
          {text}
        </span>
        {/* Segunda cópia garante o loop sem emendas */}
        {overflowing && (
          <span aria-hidden className="pr-10">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
