import { useRef, useState, useEffect, useCallback } from "react";

export const useParallax = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const lerp = 0.06;

      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;

      setMouseOffset({ ...current.current });
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();

    target.current = {
      x: (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2),
      y: (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2),
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
  }, []);

  return { mouseOffset, sectionRef, handleMouseMove, handleMouseLeave };
};
