import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Carousel from "./Carousel";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = container.current?.querySelectorAll(".about-heading-char");
      const paraLines = container.current?.querySelectorAll(".about-para-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 35%",
          end: "bottom 100%",
          scrub: 1,
        },
        defaults: { ease: "power3.out" },
      });

      if (chars && chars.length > 0) {
        tl.from(chars, {
          y: 80,
          stagger: 0.15,
          duration: 3,
        });
      }

      if (paraLines && paraLines.length > 0) {
        tl.from(
          paraLines,
          {
            y: 50,
            autoAlpha: 0,
            filter: "blur(8px)",
            stagger: 0.2,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1.5",
        );
      }

      tl.from(
        ".about-arrow",
        {
          x: -40,
          autoAlpha: 0,
          duration: 0.6,
          ease: "bounce.out",
        },
        "-=0.8",
      )
        .from(
          ".about-image-animation",
          {
            x: 10,
            autoAlpha: 0,
            duration: 5,
          },
          "-=0.8",
        )
        .from(
          ".about-button-animation",
          {
            y: 40,
            autoAlpha: 0,
            duration: 1,
          },
          "-=0.6",
        );
    },
    { scope: container },
  );

  const headingText = "ABOUT";
  const headingAccent = "GDGC ACE";

  const paraText =
    "GDGC ACE empowers tech enthusiasts. We foster a vibrant community through workshops, hackathons, and industry connections. Our members explore cutting-edge technologies, build strong portfolios, and gain the skills to succeed in the evolving tech world.";

  const shapePath = [
    "M 0.05,0",
    "L 0.95,0",
    "Q 1,0 1,0.05",
    "L 1,0.95",
    "Q 1,1 0.95,1",
    "L 0.35,1",
    "C 0.29,1 0.28,0.97 0.28,0.90",
    "L 0.28,0.78",
    "C 0.28,0.72 0.24,0.70 0.18,0.70",
    "L 0.05,0.70",
    "Q 0,0.70 0,0.65",
    "L 0,0.05",
    "Q 0,0 0.05,0",
    "Z",
  ].join(" ");

  return (
    <div
      ref={container}
      className="bg-[#211E1B] min-h-screen lg:h-screen flex flex-col overflow-x-hidden text-white"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 flex-1 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16 py-10 sm:py-14 lg:py-0">
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="flex items-center gap-3 mb-3 sm:mb-4"></div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mt-1 sm:mt-2 leading-tight tracking-widest overflow-hidden">
            <span className="block overflow-hidden">
              {headingText.split("").map((char, i) => (
                <span
                  key={`l1-${i}`}
                  className="about-heading-char inline-block font-bold"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {headingAccent.split("").map((char, i) => (
                <span
                  key={`l2-${i}`}
                  className="about-heading-char inline-block font-bold text-primary"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h2>

          <div className="flex items-center gap-3 mt-3 sm:mt-4 mb-1">
            <span className="about-arrow text-primary text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
              {">>>>>>"}
            </span>
          </div>

          <div className="mt-3 sm:mt-5 lg:mt-7 mb-6 sm:mb-8 lg:mb-10 lg:max-w-2xl">
            <p className="about-para-line text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-relaxed sm:leading-relaxed lg:leading-11 tracking-wide lg:tracking-wider">
              {paraText}
            </p>
          </div>

          <a
            href="https://www.gdgcace.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="about-button-animation bg-[#F27C06] active:scale-95 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg lg:text-2xl text-center text-white tracking-wider font-semibold shadow-hover-btn transition-all duration-150 w-full sm:w-auto">
              VISIT GDGC OFFICIAL WEBSITE
            </button>
          </a>
        </div>

        <div className="about-image-animation flex-1 w-full lg:max-w-lg flex flex-col items-start">
          <div className="relative w-full aspect-4/5 max-w-72 sm:max-w-80 md:max-w-96 lg:max-w-none mx-auto lg:mx-0">
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <clipPath id="aboutLShape" clipPathUnits="objectBoundingBox">
                  <path d={shapePath} />
                </clipPath>
              </defs>
            </svg>
            <div
              className="w-full h-full overflow-hidden"
              style={{
                clipPath: "url(#aboutLShape)",
                WebkitClipPath: "url(#aboutLShape)",
              }}
            >
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
