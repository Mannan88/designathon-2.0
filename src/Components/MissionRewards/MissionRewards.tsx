import GalaxyModel from "@/Components/MissionRewards/components/GalaxyModel";
import { LeftBar } from "./constants/SvgExporter";
import { RightBar } from "./constants/SvgExporter";
import TiltedCard from "./components/TiledCard";
import FirstPrize from "@/Components/MissionRewards/constants/FirstPrize.svg";
import SecondPrize from "@/Components/MissionRewards/constants/SecondPrize.svg";
import ThirdPrize from "@/Components/MissionRewards/constants/ThirdPrize.svg";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionRewards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paddingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const expandTrigger = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top top",
          scrub: true,
        },
        duration: 1,
        ease: "power2.out",
      };

      gsap.to(paddingRef.current, {
        ...expandTrigger,
        padding: 0,
      });

      gsap.to(contentRef.current, {
        ...expandTrigger,
        borderRadius: 0,
        boxShadow: "0 -40px 80px rgba(0,0,0,0.8)",
      });

      // fade out the shadow after expansion completes
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -10%",
          scrub: true,
        },
        boxShadow: "0 0px 0px rgba(0,0,0,0)",
        duration: 1,
      });

      // 2. Cards sequence animation (Pinned)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500", // Extends the scroll distance
          scrub: 1,
          pin: true,
        },
      });

      gsap.set(cardsRef.current, { y: 100, autoAlpha: 0 });

      tl.to({}, { duration: 0.1 }) // slight pause 
        .to(cardsRef.current[2], {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        }) // 3rd Prize
        .to({}, { duration: 0.5 }) // Scroll space
        .to(cardsRef.current[0], {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        }) // 2nd Prize 
        .to({}, { duration: 0.5 }) // Scroll space
        .to(cardsRef.current[1], {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        }) // 1st Prize
        .to({}, { duration: 0.5 }); 
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const prizes = [
    {
      imageSrc: SecondPrize,
      altText: "Second Prize",
      overlayContent: "15,000",
      bgcolor: "#211E1B",
      assetColors: "#F5F5F5",
      position: "2",
      follower: "nd",
      textColor: "#F27C06",
      className: "order-2 md:order-none",
    },
    {
      imageSrc: FirstPrize,
      altText: "First Prize",
      overlayContent: "25,0000",
      bgcolor: "#F27C06",
      assetColors: "#211E1B",
      position: "1",
      follower: "st",
      textColor: "#F5F5F5",
      className: "order-1 md:order-none",
    },
    {
      imageSrc: ThirdPrize,
      altText: "Third Prize",
      overlayContent: "10,000",
      bgcolor: "#ffff",
      assetColors: "#F27C06",
      position: "3",
      follower: "rd",
      textColor: "#211E1B",
      className: "order-3 md:order-none",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      <div ref={paddingRef} className="w-full h-full p-4 md:p-8">
        <div
          ref={contentRef}
          className="relative w-full h-full bg-[#000000] rounded-4xl overflow-hidden"
        >
          <GalaxyModel />
          <div className="relative flex flex-col items-center justify-center pointer-events-none z-10 py-12 min-h-screen">
            <div className="flex flex-wrap text-5xl md:text-7xl gap-4 md:gap-10 justify-center w-full items-center px-4">
              <div className="hidden xl:block">
                <LeftBar width="300" />
              </div>
              <h1 className="text-center">
                MISSION <span className="text-accent">REWARDS</span>
              </h1>
              <div className="hidden xl:block">
                <RightBar width="300" />
              </div>
            </div>
            <div className="cards-container pointer-events-none flex w-full justify-center md:justify-evenly items-center flex-wrap gap-10 px-4">
              {prizes.map((prize, index) => (
                <div
                  key={index}
                  className={`pointer-events-auto ${prize.className}`}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                >
                  <TiltedCard
                    imageSrc={prize.imageSrc}
                    altText={prize.altText}
                    containerHeight="500px"
                    containerWidth="300px"
                    imageHeight="500px"
                    imageWidth="300px"
                    bgcolor={prize.bgcolor}
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={prize.overlayContent}
                    assetColors={prize.assetColors}
                    position={prize.position}
                    follower={prize.follower}
                    textColor={prize.textColor}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionRewards;
