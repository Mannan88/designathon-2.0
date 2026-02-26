import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { assets } from "@/lib/assets";
import type { TlCardHandle } from "@/lib/types";

import TlCard1 from "./components/TlCard1";
import TlCard2 from "./components/TlCard2";
import TlCard3 from "./components/TlCard3";
import TlCard4 from "./components/TlCard4";
import TlCard5 from "./components/TlCard5";
import TlCard6 from "./components/TlCard6";
import Venue from "./components/Venue";
import MobileTimeline from "./components/MobileTimeline";

// breakpoint for switching between desktop horizontal and mobile vertical
const DESKTOP_BREAKPOINT = 1024;

const DesktopTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardOneRef = useRef<TlCardHandle>(null);
  const cardTwoRef = useRef<TlCardHandle>(null);
  const cardThreeRef = useRef<TlCardHandle>(null);
  const cardFourRef = useRef<TlCardHandle>(null);
  const cardFiveRef = useRef<TlCardHandle>(null);
  const cardSixRef = useRef<TlCardHandle>(null);

  useGSAP(() => {
    const horizontalScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 0.6,
        pin: true,
      },
    });

    horizontalScrollTl
      .to(sectionRef.current, { x: 0, duration: 1 })
      .to(sectionRef.current, { x: "-420vw", ease: "none", duration: 7 });

    if (cardOneRef.current) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: cardOneRef.current.element,
            start: "top 60%",
            end: "bottom+=200 bottom",
            scrub: true,
          },
        })
        .add(cardOneRef.current.animate());
    }

    [cardTwoRef, cardThreeRef].forEach((ref) => {
      if (ref.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current.element,
              containerAnimation: horizontalScrollTl,
              start: "center 60%",
              end: "bottom+=200 center",
              scrub: true,
            },
          })
          .add(ref.current.animate());
      }
    });

    [cardFourRef, cardFiveRef, cardSixRef].forEach((ref) => {
      if (ref.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current.element,
              containerAnimation: horizontalScrollTl,
              start: "top 60%",
              end: "bottom+=200 60%",
              scrub: true,
            },
          })
          .add(ref.current.animate());
      }
    });
  });

  return (
    <div ref={triggerRef}>
      <div
        ref={sectionRef}
        className="h-screen w-[520vw] flex flex-row relative"
      >
        <img
          src={assets.timeline.path}
          alt="timeline path"
          loading="lazy"
          decoding="async"
          className="w-[450vw] h-full z-0"
        />
        <div className="absolute inset-0 w-full h-dvh z-10">
          <div className="flex gap-24 size-full">
            <div className="h-full w-[68vw]">
              <TlCard1 ref={cardOneRef} />
            </div>
            <div className="h-full w-[68vw]">
              <TlCard2 ref={cardTwoRef} />
            </div>
            <div className="h-full w-[68vw]">
              <TlCard3 ref={cardThreeRef} />
            </div>
            <div className="h-full w-[66vw]">
              <TlCard4 ref={cardFourRef} />
            </div>
            <div className="h-full w-[72vw]">
              <TlCard5 ref={cardFiveRef} />
            </div>
            <div className="h-full w-[64vw]">
              <TlCard6 ref={cardSixRef} />
            </div>
            <div className="h-full w-[50vw] z-10">
              <Venue />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeLine = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < DESKTOP_BREAKPOINT);
    };
    check();
    setMounted(true);

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // don't render until we know the viewport size to avoid flash
  if (!mounted) {
    return <section className="overflow-hidden bg-background min-h-screen" />;
  }

  return (
    <section className="overflow-hidden bg-background">
      {isMobile ? <MobileTimeline /> : <DesktopTimeline />}
    </section>
  );
};

export default TimeLine;
