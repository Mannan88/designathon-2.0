import {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import About from "@/Components/About/About";
import Faqs from "@/Components/FAQs/Faqs";
import HeroSection from "@/Components/HeroSection/HeroSection";
import MissionGuidelines from "@/Components/MissionGuidelines/MissionGuidelines";
import MissionLogs from "@/Components/MissionLogs/MissionLogs";
import MissionRewards from "@/Components/MissionRewards/MissionRewards";
import TimeLine from "@/Components/TimeLine/TimeLine";
import { useLenis } from "@/lib/Lenis";
import Footer from "@/Components/Footer";
import { InfiniteRibbon } from "@/Components/ui/infinite-ribbon";
import Preloader from "@/Components/Preloader";
import { criticalAssets, deferredAssets } from "@/lib/assets";

const SNAP_GROUP_B = ["guidelines", "faqs", "about"] as const;
const DESKTOP_BREAKPOINT = 1024;
const DELTA_THRESHOLD = 50;

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const lenis = useLenis();

  // shared snap-in-flight flag — read synchronously in both handlers
  const isSnapping = useRef(false);

  // ─── GSAP: scale-down mission-logs as rewards enters ───────────────────────
  useLayoutEffect(() => {
    if (isLoading) return;
    gsap.registerPlugin(ScrollTrigger);

    const missionLogs = document.querySelector(".mission-logs-sticky");
    const rewards = document.getElementById("rewards");
    if (!missionLogs || !rewards) return;

    const ctx = gsap.context(() => {
      gsap.to(missionLogs, {
        scale: 0.92,
        opacity: 0.4,
        filter: "blur(1px)",
        force3D: true,
        scrollTrigger: {
          trigger: rewards,
          start: "top 90%",
          end: "top 25%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  // ─── footer visibility ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoading) return;

    const check = () => {
      const ribbon = document.getElementById("ribbon-section");
      const about = document.getElementById("about");
      const vh = window.innerHeight;
      const ribbonVisible = ribbon
        ? ribbon.getBoundingClientRect().top < vh &&
          ribbon.getBoundingClientRect().bottom > 0
        : false;
      const aboutNear = about
        ? about.getBoundingClientRect().bottom <= vh + 50
        : false;
      setFooterVisible(ribbonVisible || aboutNear);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isLoading]);

  // ─── helpers ────────────────────────────────────────────────────────────────
  const getTop = useCallback((id: string): number => {
    const el = document.getElementById(id);
    if (!el) return 0;
    return el.getBoundingClientRect().top + window.scrollY;
  }, []);

  const getBottom = useCallback(
    (id: string): number => {
      const el = document.getElementById(id);
      if (!el) return 0;
      return getTop(id) + el.offsetHeight;
    },
    [getTop],
  );

  // returns true when the desktop GSAP timeline pin is actively pinned
  const isTimelinePinActive = useCallback((): boolean => {
    const timelineEl = document.getElementById("timeline");
    if (!timelineEl) return false;
    const pin = timelineEl.closest(".pin-spacer") as HTMLElement | null;
    if (!pin) return false;
    const rect = pin.getBoundingClientRect();
    const sy = window.scrollY;
    const pinStart = rect.top + sy;
    const pinEnd = pinStart + pin.offsetHeight - window.innerHeight;
    return sy >= pinStart - 5 && sy < pinEnd - 5;
  }, []);

  // returns whether scrollY is inside Group B's scroll range
  const isInGroupB = useCallback(
    (scrollY: number): boolean => {
      const vh = window.innerHeight;
      const guidelinesTop = getTop("guidelines");
      const aboutBottom = getBottom("about");
      return scrollY >= guidelinesTop - vh * 0.7 && scrollY < aboutBottom - 10;
    },
    [getTop, getBottom],
  );

  // finds which Group B section index is "current" given scrollY + direction
  const getGroupBIndex = useCallback(
    (scrollY: number, direction: "down" | "up"): number => {
      const vh = window.innerHeight;
      const positions = SNAP_GROUP_B.map((id) => getTop(id));

      if (scrollY < positions[0] - vh * 0.3) return -1;

      let insideIdx = 0;
      for (let i = 0; i < positions.length; i++) {
        if (scrollY >= positions[i] - 20) insideIdx = i;
      }

      const progressIntoSection = scrollY - positions[insideIdx];
      if (
        direction === "down" &&
        progressIntoSection > vh * 0.4 &&
        insideIdx < SNAP_GROUP_B.length - 1
      ) {
        return insideIdx + 1;
      }

      return insideIdx;
    },
    [getTop],
  );

  // ─── GROUP A: velocity-based snap via lenis scroll event ───────────────────
  useEffect(() => {
    if (!lenis || isLoading) return;

    // block touchmove while snap is in flight to prevent shake
    const blockTouch = (e: TouchEvent) => {
      if (isSnapping.current) e.preventDefault();
    };
    window.addEventListener("touchmove", blockTouch, { passive: false });

    const snapTo = (target: string, duration = 1.0) => {
      if (isSnapping.current) return;
      isSnapping.current = true;
      lenis.stop();

      lenis.scrollTo(target, {
        duration,
        lock: true,
        force: true,
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: () => {
          lenis.start();
          const id = target.replace("#", "");
          const finalY = getTop(id);
          if (Math.abs(window.scrollY - finalY) > 3) {
            window.scrollTo({
              top: finalY,
              behavior: "instant" as ScrollBehavior,
            });
          }
          setTimeout(() => {
            isSnapping.current = false;
          }, 500);
        },
      });
    };

    const handleScroll = ({
      scroll,
      velocity,
    }: {
      scroll: number;
      velocity: number;
    }) => {
      if (isSnapping.current) return;
      if (isTimelinePinActive()) return;

      // skip Group B — handled separately by the wheel listener
      if (isInGroupB(scroll)) return;

      const vh = window.innerHeight;
      const MIN_VEL = 0.6;

      const heroEl = document.getElementById("home");
      const heroH = heroEl ? heroEl.offsetHeight : vh;

      // ── hero → mission-logs (all devices) ──
      if (scroll < heroH * 0.7 && velocity > MIN_VEL) {
        snapTo("#mission-logs");
        return;
      }
      // ── mission-logs → hero (all devices) ──
      if (scroll > 0 && scroll < heroH * 1.2 && velocity < -MIN_VEL) {
        snapTo("#home");
        return;
      }

      // desktop-only from here
      if (window.innerWidth < DESKTOP_BREAKPOINT) return;

      // ── timeline end → guidelines ──
      const timelineEl = document.getElementById("timeline");
      const pin = timelineEl?.closest(".pin-spacer") as HTMLElement | null;
      const tlBottomY = pin
        ? pin.getBoundingClientRect().top + window.scrollY + pin.offsetHeight
        : getBottom("timeline");

      if (
        scroll >= tlBottomY - vh * 0.35 &&
        scroll <= tlBottomY + vh * 0.25 &&
        velocity > MIN_VEL
      ) {
        snapTo("#guidelines");
        return;
      }

      // ── guidelines top (scroll UP) → free-scroll back into timeline ──
      const guidelinesTop = getTop("guidelines");
      if (
        scroll >= guidelinesTop - 30 &&
        scroll <= guidelinesTop + vh * 0.18 &&
        velocity < -MIN_VEL
      ) {
        // intentionally do nothing — let lenis carry scroll back into timeline
        return;
      }
    };

    // @ts-ignore — lenis scroll event typing
    lenis.on("scroll", handleScroll);

    return () => {
      // @ts-ignore
      lenis.off("scroll", handleScroll);
      window.removeEventListener("touchmove", blockTouch);
    };
  }, [lenis, isLoading, getTop, getBottom, isTimelinePinActive, isInGroupB]);

  // ─── GROUP B: delta-accumulation + trackpad-aware wheel snap ───────────────
  useEffect(() => {
    if (!lenis || isLoading) return;
    if (window.innerWidth < DESKTOP_BREAKPOINT) return;

    let deltaAccum = 0;
    let accumTimer: ReturnType<typeof setTimeout> | null = null;
    let smallDeltaCount = 0;
    let isTrackpad = false;

    const snapTo = (target: string, duration = 1.1) => {
      if (isSnapping.current) return;
      isSnapping.current = true;
      lenis.stop();

      lenis.scrollTo(target, {
        duration,
        lock: true,
        force: true,
        easing: (t: number) => {
          // cubic smooth-step (original "smoother" feel)
          const t2 = t * t;
          const t3 = t2 * t;
          return 3 * t2 - 2 * t3;
        },
        onComplete: () => {
          lenis.start();
          const id = target.replace("#", "");
          const finalY = getTop(id);
          if (Math.abs(window.scrollY - finalY) > 2) {
            window.scrollTo({
              top: finalY,
              behavior: "instant" as ScrollBehavior,
            });
          }
          setTimeout(() => {
            isSnapping.current = false;
          }, 300);
        },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping.current) return;
      if (isTimelinePinActive()) return;
      if (window.innerWidth < DESKTOP_BREAKPOINT) return;

      const scrollY = window.scrollY;
      if (!isInGroupB(scrollY)) return;

      // trackpad detection
      const absDelta = Math.abs(e.deltaY);
      if (absDelta < 50) {
        smallDeltaCount++;
        if (smallDeltaCount > 4) isTrackpad = true;
      } else {
        smallDeltaCount = 0;
        isTrackpad = false;
      }

      const direction: "down" | "up" = e.deltaY > 0 ? "down" : "up";
      const currentIdx = getGroupBIndex(scrollY, direction);

      deltaAccum += e.deltaY;

      if (accumTimer) clearTimeout(accumTimer);
      accumTimer = setTimeout(() => {
        deltaAccum = 0;
        smallDeltaCount = 0;
        isTrackpad = false;
      }, 300);

      const threshold = isTrackpad ? DELTA_THRESHOLD * 2 : DELTA_THRESHOLD;
      if (Math.abs(deltaAccum) < threshold) return;

      const firstSectionTop = getTop(SNAP_GROUP_B[0]);
      let targetIdx = currentIdx;

      if (direction === "down" && scrollY < firstSectionTop - 5) {
        targetIdx = 0;
      } else if (direction === "down" && currentIdx < SNAP_GROUP_B.length - 1) {
        targetIdx = currentIdx + 1;
      } else if (direction === "up" && currentIdx > 0) {
        targetIdx = currentIdx - 1;
      } else if (
        direction === "up" &&
        currentIdx === 0 &&
        scrollY >= firstSectionTop - 5
      ) {
        // at the top of Group B scrolling up — let normal scroll exit naturally
        deltaAccum = 0;
        return;
      }

      // at a boundary with no valid target, let scroll pass through
      if (
        targetIdx === currentIdx &&
        currentIdx >= 0 &&
        scrollY >= firstSectionTop - 5
      ) {
        deltaAccum = 0;
        return;
      }

      e.preventDefault();
      deltaAccum = 0;
      smallDeltaCount = 0;
      isTrackpad = false;

      const snapIdx = Math.max(0, targetIdx);
      snapTo(`#${SNAP_GROUP_B[snapIdx]}`);
    };

    // touch support for Group B on desktop (e.g. touch-screen laptops)
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (isSnapping.current) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSnapping.current) return;
      if (isTimelinePinActive()) return;
      if (window.innerWidth < DESKTOP_BREAKPOINT) return;

      const scrollY = window.scrollY;
      if (!isInGroupB(scrollY)) return;

      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 60) return;

      const direction: "down" | "up" = diff > 0 ? "down" : "up";
      const currentIdx = getGroupBIndex(scrollY, direction);
      const firstSectionTop = getTop(SNAP_GROUP_B[0]);
      let targetIdx = currentIdx;

      if (direction === "down" && scrollY < firstSectionTop - 5) {
        targetIdx = 0;
      } else if (direction === "down" && currentIdx < SNAP_GROUP_B.length - 1) {
        targetIdx = currentIdx + 1;
      } else if (direction === "up" && currentIdx > 0) {
        targetIdx = currentIdx - 1;
      } else if (
        direction === "up" &&
        currentIdx === 0 &&
        scrollY >= firstSectionTop - 5
      ) {
        return;
      }

      if (
        targetIdx === currentIdx &&
        currentIdx >= 0 &&
        scrollY >= firstSectionTop - 5
      ) {
        return;
      }

      const snapIdx = Math.max(0, targetIdx);
      snapTo(`#${SNAP_GROUP_B[snapIdx]}`);
    };

    // keyboard support for Group B
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSnapping.current) return;
      if (isTimelinePinActive()) return;
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(e.key))
        return;

      const scrollY = window.scrollY;
      if (!isInGroupB(scrollY)) return;

      const direction: "down" | "up" =
        e.key === "ArrowDown" || e.key === "PageDown" ? "down" : "up";
      const currentIdx = getGroupBIndex(scrollY, direction);
      const firstSectionTop = getTop(SNAP_GROUP_B[0]);
      let targetIdx = currentIdx;

      if (direction === "down" && scrollY < firstSectionTop - 5) {
        targetIdx = 0;
      } else if (direction === "down" && currentIdx < SNAP_GROUP_B.length - 1) {
        targetIdx = currentIdx + 1;
      } else if (direction === "up" && currentIdx > 0) {
        targetIdx = currentIdx - 1;
      } else if (
        direction === "up" &&
        currentIdx === 0 &&
        scrollY >= firstSectionTop - 5
      ) {
        return;
      }

      if (
        targetIdx === currentIdx &&
        currentIdx >= 0 &&
        scrollY >= firstSectionTop - 5
      ) {
        return;
      }

      e.preventDefault();
      const snapIdx = Math.max(0, targetIdx);
      snapTo(`#${SNAP_GROUP_B[snapIdx]}`);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      if (accumTimer) clearTimeout(accumTimer);
    };
  }, [
    lenis,
    isLoading,
    getTop,
    isTimelinePinActive,
    isInGroupB,
    getGroupBIndex,
  ]);

  // ─── render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Preloader
        critical={criticalAssets}
        deferred={deferredAssets}
        onComplete={() => setIsLoading(false)}
      />

      <div className="overflow-x-hidden relative z-10">
        <div id="home" className="bg-background">
          <HeroSection />
        </div>

        <div className="relative">
          <div
            id="mission-logs"
            className="sticky top-0 z-10 mission-logs-sticky"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <MissionLogs />
          </div>
          <div id="rewards" className="relative z-20">
            <MissionRewards />
          </div>
        </div>

        <div id="timeline" className="relative z-20">
          <TimeLine />
        </div>

        <div id="guidelines" className="relative z-20">
          <MissionGuidelines />
        </div>
        <div id="faqs" className="relative z-20">
          <Faqs />
        </div>
        <div id="about" className="relative z-20 bg-background">
          <About />
        </div>

        <div
          id="ribbon-section"
          className="relative z-20 overflow-hidden py-10 bg-background"
        >
          <InfiniteRibbon
            rotation={3}
            duration={15}
            className="absolute bg-primary/90 py-2 text-xl font-bold font-share-tech tracking-widest text-[#141414] uppercase"
          >
            DESIGNATHON 2.0 • SPACEBOUND • GDGC ACE • REGISTER NOW • EXPLORE THE
            COSMOS •
          </InfiniteRibbon>
          <InfiniteRibbon
            reverse
            rotation={-3}
            duration={18}
            className="bg-background border border-primary/30 py-2 text-xl font-bold font-share-tech tracking-widest text-primary uppercase"
          >
            DESIGN • PROTOTYPE • INNOVATE • COLLABORATE • PUSH BOUNDARIES •
            CREATE •
          </InfiniteRibbon>
        </div>
      </div>

      <div
        className="sticky bottom-0 z-0 transition-opacity duration-300"
        style={{
          opacity: footerVisible ? 1 : 0,
          pointerEvents: footerVisible ? "auto" : "none",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
