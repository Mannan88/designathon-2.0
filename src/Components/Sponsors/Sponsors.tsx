import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ThreeDSponsors from "../ui/sponsersystem";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);



const Sponsors = () => {
  const container = useRef(null);

  useGSAP(
    (context) => {
      const q = context.selector!;

      // Split the heading
      const split = new SplitText(q(".split-text"), {
        type: "chars",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 40%",
          end: "bottom 30%",
          scrub: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Animate characters
      tl.from(split.chars, {
        y: 30,
        autoAlpha: 0,
        stagger: 0.05,
      })

      // Animate 3D model
      .from(
        q(".model-animation"),
        {
          x: 500,
          autoAlpha: 0,
          duration: 2,
        },
        "-=0.7"
      );

      return () => split.revert();
    },
    { scope: container }
  );
    return (
        <div ref={container} className="w-full h-100vh flex flex-col bg-black overflow-hidden">
            <h1 className="split-text uppercase text-white text-6xl  md:text-7xl lg:text-8xl ml-15 mt-5">Sponsors </h1>
            <div className="model-animation lg:p-5 mb-15 z-0">
                <ThreeDSponsors />
            </div>
        </div>
    )
}

export default Sponsors;