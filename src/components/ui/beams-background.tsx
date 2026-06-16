"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

// Buat satu beam baru dengan posisi & properti acak
function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export function BeamsBackground({
  className,
  children,
  intensity = "strong",
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  // useMemo biar object ini tidak bikin useEffect restart tiap render
  const opacityMap = useMemo(
    () => ({ subtle: 0.4, medium: 0.6, strong: 0.8 }),
    [],
  );

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Capture ke const baru — TS track ini sebagai non-null di seluruh closure
    const safeCanvas = canvas;
    const safeContainer = container;

    const ctx = safeCanvas.getContext("2d");
    if (!ctx) return;

    const MINIMUM_BEAMS = 20;

    // Deteksi resize container, rebuild beam sesuai ukuran baru
    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const { width, height } = entries[0].contentRect;

      // Batasi DPR max 1.5 — cukup untuk background, beban GPU lebih ringan
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      safeCanvas.width = width * dpr;
      safeCanvas.height = height * dpr;
      safeCanvas.style.width = `${width}px`;
      safeCanvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      beamsRef.current = Array.from({ length: MINIMUM_BEAMS * 1.5 }, () =>
        createBeam(width, height),
      );
    });

    observer.observe(safeContainer);

    // Reset beam yang sudah keluar layar ke bawah, posisi acak per kolom
    function resetBeam(
      beam: Beam,
      index: number,
      totalBeams: number,
      width: number,
      height: number,
    ) {
      const column = index % 3;
      const spacing = width / 3;
      beam.y = height + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 190 + (index * 70) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    // Gambar satu beam dengan gradient + efek pulse (denyut opacity)
    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const isDark = resolvedTheme === "dark";
      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity] *
        (isDark ? 1.0 : 0.4);

      const lValue = isDark ? "65%" : "75%";
      const sValue = isDark ? "85%" : "95%";

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue}, ${sValue}, ${lValue}, 0)`);
      gradient.addColorStop(
        0.1,
        `hsla(${beam.hue}, ${sValue}, ${lValue}, ${pulsingOpacity * 0.5})`,
      );
      gradient.addColorStop(
        0.4,
        `hsla(${beam.hue}, ${sValue}, ${lValue}, ${pulsingOpacity})`,
      );
      gradient.addColorStop(
        0.6,
        `hsla(${beam.hue}, ${sValue}, ${lValue}, ${pulsingOpacity})`,
      );
      gradient.addColorStop(
        0.9,
        `hsla(${beam.hue}, ${sValue}, ${lValue}, ${pulsingOpacity * 0.5})`,
      );
      gradient.addColorStop(1, `hsla(${beam.hue}, ${sValue}, ${lValue}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    // Loop animasi utama — jalan ~60x/detik via requestAnimationFrame
    function animate() {
      if (!ctx) return;

      const { width, height } = safeContainer.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams, width, height);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup saat unmount — stop animasi & observer
    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity, resolvedTheme, mounted, opacityMap]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-500 bg-transparent dark:bg-black",
        className,
      )}
    >
      {/* Blur lewat CSS (GPU-accelerated), bukan Canvas API */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ filter: "blur(20px)" }}
      />

      <div className="absolute inset-0 pointer-events-none beams-shimmer-overlay" />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
