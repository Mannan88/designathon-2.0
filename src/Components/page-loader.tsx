import { useEffect, useState, useRef } from "react";
import gsap, { Expo } from "gsap";

interface LoaderProps {
  critical?: string[];
  deferred?: string[];
  onComplete?: () => void;
}

const preloadAsset = (src: string): Promise<void> =>
  new Promise((resolve) => {
    if (src.endsWith(".webm") || src.endsWith(".mp4")) {
      const vid = document.createElement("video");
      vid.src = src;
      vid.preload = "auto";
      vid.oncanplaythrough = () => resolve();
      vid.onerror = () => resolve();
    } else {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }
  });

const Loader = ({ critical = [], deferred = [], onComplete }: LoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [counter, setCounter] = useState(0);

  const loaderRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // keep latest prop values stable across renders without re-running effects
  const onCompleteRef = useRef(onComplete);
  const deferredRef = useRef(deferred);
  const criticalRef = useRef(critical);
  onCompleteRef.current = onComplete;
  deferredRef.current = deferred;
  criticalRef.current = critical;

  const hasRevealedRef = useRef(false);
  const assetsReadyRef = useRef(false);
  const counterReadyRef = useRef(false);
  const setVisibleRef = useRef(setVisible);
  setVisibleRef.current = setVisible;

  const reveal = useRef(() => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;

    const follow = followRef.current;
    const progress = progressRef.current;
    const count = countRef.current;
    const bg = bgRef.current;
    const loader = loaderRef.current;

    if (!follow || !bg || !loader) return;

    const tl = gsap.timeline();

    // 1 — orange line sweeps across full width
    tl.to(follow, {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.2,
      delay: 0.3,
    });

    // 2 — hide progress track + counter
    if (progress) tl.to(progress, { opacity: 0, duration: 0.15 }, "<+=0.05");
    if (count) tl.to(count, { opacity: 0, duration: 0.15 }, "<");

    // 3 — orange bar expands vertically to fill the whole screen
    tl.to(follow, {
      height: "100%",
      ease: Expo.easeInOut,
      duration: 0.55,
      delay: 0.15,
    });

    // 4 — background catches up to primary so there's no gap
    tl.to(
      bg,
      { backgroundColor: "hsl(var(--primary))", duration: 0.25 },
      "-=0.25",
    );

    // 5 — notify the app so page content renders behind the orange screen
    //     use rAF so React has one full frame to commit before we start fading
    tl.call(() => {
      onCompleteRef.current?.();
      const def = deferredRef.current;
      if (def && def.length > 0) def.forEach((s) => preloadAsset(s));
    });

    // 6 — wait two rAFs (≈33 ms) so React has committed the new tree
    tl.to({}, { duration: 0.05 });

    // 7 — slide the whole loader up off-screen (like a curtain rising)
    //     this is more reliable than opacity because nothing can "show through"
    tl.to(loader, {
      yPercent: -100,
      ease: Expo.easeInOut,
      duration: 0.7,
    });

    // 8 — once off-screen, unmount completely
    tl.call(() => {
      setVisibleRef.current(false);
    });
  });

  const tryReveal = useRef(() => {
    if (assetsReadyRef.current && counterReadyRef.current) {
      reveal.current();
    }
  });

  // preload critical assets — runs once
  useEffect(() => {
    const assets = criticalRef.current;
    if (!assets || assets.length === 0) {
      assetsReadyRef.current = true;
      tryReveal.current();
      return;
    }

    let alive = true;
    Promise.all(assets.map((s) => preloadAsset(s))).then(() => {
      if (!alive) return;
      assetsReadyRef.current = true;
      tryReveal.current();
    });
    return () => {
      alive = false;
    };
  }, []);

  // animated counter 0→100 — runs once
  useEffect(() => {
    const id = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(id);
        counterReadyRef.current = true;
        tryReveal.current();
        return 100;
      });
    }, 25);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-background flex items-center justify-center"
      >
        {/* orange follow bar — starts as thin horizontal line, expands to fill */}
        <div
          ref={followRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary"
          style={{ width: 0, height: 2 }}
        />

        {/* progress track (user-visible grey bar behind the orange one) */}
        <div
          ref={progressRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-foreground/20"
          style={{ width: `${counter}%`, height: 2 }}
        />

        {/* counter label */}
        <div
          ref={countRef}
          className="absolute text-foreground text-base font-sans tracking-widest select-none"
          style={{
            top: "calc(50% - 24px)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {counter}%
        </div>
      </div>
    </div>
  );
};

export default Loader;
