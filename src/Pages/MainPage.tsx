import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "@/Components/About/About";
import Faqs from "@/Components/FAQs/Faqs";
import HeroSection from "@/Components/HeroSection/HeroSection";
import MissionGuidelines from "@/Components/MissionGuidelines/MissionGuidelines";
import MissionLogs from "@/Components/MissionLogs/MissionLogs";
import MissionRewards from "@/Components/MissionRewards/MissionRewards";
import Sponsors from "@/Components/Sponsors/Sponsors";
import TimeLine from "@/Components/TimeLine/TimeLine";
import { useLenis } from "@/lib/Lenis";
import Preloader from "@/Components/Preloader";

const ASSETS_TO_PRELOAD = [
  "/images/mission_logs/drill.gif",
  "/images/mission_logs/sponge.gif",
  "/images/mission_logs/globe.svg",
  "/images/mission_logs/mesh.svg",
  "/images/mission_logs/milkyway.png",
];

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenis = useLenis();

  // scale-down Mission Logs as Rewards enters
  useLayoutEffect(() => {
    if (isLoading) return;
    gsap.registerPlugin(ScrollTrigger);

    const missionLogs = document.querySelector(".mission-logs-sticky");
    const rewards = document.getElementById("rewards");
    if (!missionLogs || !rewards) return;

    const ctx = gsap.context(() => {
      gsap.to(missionLogs, {
        scale: 0.92,
        opacity: 0.5,
        filter: "blur(2px)",
        scrollTrigger: {
          trigger: rewards,
          start: "top 90%",
          end: "top 20%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  useEffect(() => {
    if (!lenis || isLoading) return;

    let isScrolling = false;

    const handleScroll = ({ scroll, velocity }: { scroll: number; velocity: number }) => {
      // Prevent multiple triggers
      if (isScrolling) return;

      const heroHeight = window.innerHeight;
      const threshold = 50; // Sensitivity threshold in pixels

      // Debugging: Log scroll position
      // console.log("Scroll:", scroll, "Velocity:", velocity);

      // Hero -> Mission Logs (Scroll Down)
      // Trigger if user is at the top (Hero) and starts scrolling down
      if (scroll < heroHeight - threshold && velocity > 1.5) {
        // velocity > 1.5 ensures a deliberate scroll, not just a tiny nudge
        isScrolling = true;
        lenis.scrollTo("#mission-logs", {
           duration: 1.5,
           lock: true, // Lock user input during scroll for smoothness
           onComplete: () => {
             isScrolling = false;
           }
        });
      }

      // Mission Logs -> Hero (Scroll Up)
      // Trigger if user is near the start of Mission Logs and scrolls up
      // mission-logs starts at heroHeight approximately
      else if (scroll >= heroHeight - threshold && scroll <= heroHeight + threshold && velocity < -1.5) {
         isScrolling = true;
         lenis.scrollTo("#home", {
            duration: 1.5,
            lock: true,
            onComplete: () => {
              isScrolling = false;
            }
         });
      }
    };

    // Lenis emits 'scroll' event
    // @ts-ignore - lenis types might be slightly off depending on version
    lenis.on('scroll', handleScroll);

    return () => {
      // @ts-ignore
      lenis.off('scroll', handleScroll);
    };
  }, [lenis, isLoading]);

  return (
    <>
      <Preloader assets={ASSETS_TO_PRELOAD} onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="animate-in fade-in duration-700">
          <div id="home">
            <HeroSection />
          </div>

          {/* stack-over container: Mission Logs stays sticky while Rewards slides up */}
          <div className="relative">
            <div id="mission-logs" className="sticky top-0 z-10 mission-logs-sticky">
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
          <div id="sponsors" className="relative z-20">
            <Sponsors />
          </div>
          <div id="faqs" className="relative z-20">
            <Faqs />
          </div>
          <div id="about" className="relative z-20">
            <About />
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;