"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface CelestialSphereProps {
  /** Animation speed multiplier */
  speed?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Geometric floating shapes — rounded rects, circles, triangles      */
/*  Matches the Bluecore design language (Services, Hero shapes)       */
/* ------------------------------------------------------------------ */

interface Shape {
  type: "rect" | "circle" | "triangle";
  x: number;
  y: number;
  size: number;
  aspect: number;
  rotation: number;
  rotationSpeed: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmplitudeX: number;
  driftAmplitudeY: number;
  alpha: number;
  color: string;
  borderRadius: number;
  parallaxFactor: number;
}

function createShapes(count: number): Shape[] {
  const types: Shape["type"][] = ["rect", "rect", "rect", "circle", "triangle"];
  const colors = [
    [220, 235, 255], // pale-blue
    [59, 130, 246],  // secondary-blue
    [91, 127, 166],  // steel-blue
    [248, 250, 252], // soft-white
    [37, 99, 235],   // primary-blue
  ];

  return Array.from({ length: count }, () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const [r, g, b] = colors[Math.floor(Math.random() * colors.length)];
    const alpha = 0.03 + Math.random() * 0.06;
    const size = 80 + Math.random() * 260;

    return {
      type,
      x: Math.random(),
      y: Math.random(),
      size,
      aspect: 0.6 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.3, // degrees per second
      driftPhaseX: Math.random() * Math.PI * 2,
      driftPhaseY: Math.random() * Math.PI * 2,
      driftSpeedX: 0.08 + Math.random() * 0.12,
      driftSpeedY: 0.06 + Math.random() * 0.1,
      driftAmplitudeX: 15 + Math.random() * 25,
      driftAmplitudeY: 10 + Math.random() * 20,
      alpha,
      color: `rgba(${r}, ${g}, ${b}, ${alpha})`,
      borderRadius: type === "rect" ? 8 + Math.random() * 16 : 0,
      parallaxFactor: 0.3 + Math.random() * 0.7,
    };
  });
}

export const CelestialSphere: React.FC<CelestialSphereProps> = ({
  speed = 0.3,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let time = 0;
    const shapes = createShapes(12);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawRoundedRect = (
      cx: number,
      cy: number,
      w: number,
      h: number,
      r: number,
      angle: number,
      fill: string
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, r);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();
    };

    const drawCircle = (cx: number, cy: number, radius: number, fill: string) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();
    };

    const drawTriangle = (
      cx: number,
      cy: number,
      size: number,
      angle: number,
      fill: string
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      time += 0.016 * speed;

      // Smooth mouse interpolation (lerp) to prevent jerky parallax
      const lerp = 0.03;
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerp;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerp;

      ctx.clearRect(0, 0, w, h);

      const mx = (smoothMouseRef.current.x - 0.5) * 20;
      const my = (smoothMouseRef.current.y - 0.5) * 20;

      for (const shape of shapes) {
        const sx =
          shape.x * w +
          Math.sin(time * shape.driftSpeedX + shape.driftPhaseX) * shape.driftAmplitudeX +
          mx * shape.parallaxFactor;
        const sy =
          shape.y * h +
          Math.cos(time * shape.driftSpeedY + shape.driftPhaseY) * shape.driftAmplitudeY +
          my * shape.parallaxFactor;
        const rot = shape.rotation + time * shape.rotationSpeed;

        if (shape.type === "rect") {
          drawRoundedRect(
            sx,
            sy,
            shape.size,
            shape.size * shape.aspect,
            shape.borderRadius,
            rot,
            shape.color
          );
        } else if (shape.type === "circle") {
          drawCircle(sx, sy, shape.size / 2, shape.color);
        } else {
          drawTriangle(sx, sy, shape.size, rot, shape.color);
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [speed, onMouseMove]);

  return <canvas ref={canvasRef} className={className} />;
};

export default CelestialSphere;
