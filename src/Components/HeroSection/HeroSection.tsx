import { useCountdown } from "./hooks/useCountdown.js";
import { useParallax } from "./hooks/useParallax.js";
import { socialItems } from "./constants/socialsData.js";
import { RetroGrid } from "../retro-grid";
import NavigationMenu from "../sterling-gate-kinetic-navigation";
import CountUp from "../CountUp.jsx";
import ShinyText from "../ShinyText.jsx";
import DecryptedText from "../DecryptedText.jsx";
import FloatingObject from "./Floating.js";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import GdgIcon from "./components/GdgIcon.js";
import Timer from "./components/Timer.js";

const HeroSection = () => {

  const timeLeft = useCountdown(14);
  const {
    mouseOffset,
    sectionRef,
    handleMouseMove,
    handleMouseLeave
  } = useParallax();
  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-white overflow-hidden flex flex-col px-3"
    >      {/* bolt 5 - bottom center on grid/white intersection */}
      <FloatingObject
        src="/images/hero/bolt.png"
        alt="Bolt"
        wrapperClassName=" -bottom-14 left-[46%] md:left-[48%] animate-float-3 [animation-delay:1s]"
        innerClassName="w-6 h-6 md:w-64 md:h-64 rotate-[40deg]"
        parallaxFactor={0.5}
        mouseOffset={mouseOffset}
      />
      <div className="relative w-full h-full my-3 bg-neutral-900 rounded-t-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-foreground font-sans">
        <RetroGrid
          className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none"
          angle={65}
          cellSize={60}
          lightLineColor="#f1f5f9"
          darkLineColor="#f1f5f9"
        />

        <GdgIcon />
        {/* hamburger */}
        <NavigationMenu />

        {/* gdg text below logo */}
        <div className="absolute top-16 md:top-18 left-1/2 -translate-x-1/2 z-15 flex flex-col items-center space-y-0.5">
          <h2 className="text-sm font-inter md:text-base lg:text-2xl font-semibold tracking-wide text-white leading-tight">
            Google Developer Groups
          </h2>
          <p className=" font-inter text-[10px] md:text-xs lg:text-sm text-neutral-300  leading-tight">
            <span className="text-accent font-medium">On Campus</span>
            <span className="mx-1 text-neutral-500">·</span>
            <span>Atharva College of Engineering</span>
          </p>
          <p className="text-md md:text-xl text-neutral-300 tracking-widest uppercase pt-1">
            Presents
          </p>
        </div>

        {/* === COUNTDOWN TOP-LEFT === */}
        <Timer timeLeft={timeLeft} />

        {/* === BACKGROUND 2.0 TEXT === */}
        <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none select-none overflow-hidden">
          <span
            className="font-bold text-[#5b3c24] opacity-100 leading-none tracking-wider"
            style={{ fontSize: "clamp(18rem, 32vw, 38rem)" }}
          >
            2.0
          </span>
        </div>

        {/* === FLOATING 3D OBJECTS === */}

        {/* topleft camera - large, partially behind countdown */}
        <FloatingObject
          src="/images/hero/topleft-camera-v1.png"
          alt="Camera tool"
          wrapperClassName="z-8 -top-10 left-[-2%] md:left-[2%] animate-float-1"
          innerClassName="w-44 h-44 md:w-56 md:h-56 lg:w-92 lg:h-92"
          parallaxFactor={0.6}
          mouseOffset={mouseOffset}
        />

        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-8 top-1/2 -translate-y-20 left-[-2%] md:left-30 animate-float-1"
          innerClassName="w-5 h-5 md:w-12 md:h-12 rotate-[0deg]"
          parallaxFactor={0.9}
          mouseOffset={mouseOffset}
        />

        {/* topright camera / tools - bigger */}
        <FloatingObject
          src="/images/hero/topright-camera.png"
          alt="Tools"
          wrapperClassName="z-5 top-[8%] right-[0%] md:right-[3%] lg:right-[0%] animate-float-2"
          innerClassName="w-28 h-24 md:w-40 md:h-32 lg:w-108 lg:h-76 "
          parallaxFactor={0.5}
          mouseOffset={mouseOffset}
        />

        {/* laptop left side - bigger */}
        <FloatingObject
          src="/images/hero/laptop.png"
          alt="Laptop"
          wrapperClassName="z-5 bottom-[6%] left-[0%] md:left-[2%] lg:left-[5%] animate-float-3"
          innerClassName="w-36 h-28 md:w-48 md:h-36 lg:w-80  lg:h-80 rotate-[-8deg]"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />

        {/* bolt 1 - left of astronaut, upper area */}
        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-5 top-[10%] left-[28%] md:left-[24%] animate-float-4"
          innerClassName="w-5 h-5 md:w-24 md:h-24 rotate-[280deg]"
          parallaxFactor={0.9}
          mouseOffset={mouseOffset}
        />

        {/* bolt 2 - right side mid */}
        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-5 top-[18%] right-[14%] md:right-[18%] animate-float-5"
          innerClassName="w-4 h-4 md:w-24 md:h-12 rotate-[140deg]"
          parallaxFactor={1.0}
          mouseOffset={mouseOffset}
        />



        {/* bolt 6 - right side lower */}
        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-5 bottom-[40%] right-[12%] animate-float-5 [animation-delay:1.6s]"
          innerClassName="w-4 h-4 md:w-20 md:h-20 rotate-270"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />

        {/* bottomright camera / hammer tool - bigger */}
        <FloatingObject
          src="/images/hero/bottomright-camera.png"
          alt="Tool"
          wrapperClassName="z-5 bottom-[12%] right-[16%] md:right-[16%] animate-float-4 [animation-delay:1.4s]"
          innerClassName="w-20 h-28 md:w-28 md:h-36 lg:w-50 lg:h-50 rotate-[140deg]"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />

        {/* === ASTRONAUT (highest z among scene objects, centered) === */}
        <div className="absolute z-7 pointer-events-none left-1/2 -translate-x-1/2 top-[8%] md:top-[20%]">
          <div className="animate-float-3">
            <div
              className="will-change-transform backface-hidden"
              style={{
                transform: `translate3d(${mouseOffset.x * 5}px, ${mouseOffset.y * 5}px, 0) rotateX(${-mouseOffset.y * 2}deg) rotateY(${mouseOffset.x * 2}deg)`,
              }}
            >
              <img
                src="/images/hero/astronaut.png"
                alt="Astronaut floating in space"
                className="w-72 h-72 md:w-100 md:h-100 lg:w-148 lg:h-148 object-contain select-none"
                style={{
                  filter: "drop-shadow(0 0 50px rgba(0,0,0,0.5))",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* === MAIN TEXT CONTENT === */}
        <div
          className="absolute z-12 text-center flex flex-col items-center w-full px-4"
          style={{ top: "52%", transform: "translateY(-15%)" }}
        >
          {/* subtle radial gradient behind text for visibility */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 bg-[radial-gradient(closest-side,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_100%)] blur-2xl pointer-events-none" />

          {/* designathon with shiny animation */}
          <div className=" rounded-xl p-2 px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <ShinyText
              text="D E S I G N A T H O N"
              speed={2}
              className="text-sm md:text-lg lg:text-4xl tracking-tighter font-bold uppercase"
              color="#ffffff"
              shineColor="#f5f5f5"
              spread={120}
            />
          </div>

          <div className="w-full flex justify-center ">
            {/*<SplitText
              text=""
              className="spacebound-title"
              delay={80}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 60, rotateX: -40 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="center"
              tag="h1"
            />*/}
            <h1 className="text-4xl spacebound-title md:text-2xl lg:text-7xl font-bold tracking-tighter text-white leading-tight ">
              SPACEBOUND
            </h1>
          </div>

          {/* tagline */}
          <div className="relative pt-4 w-full max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-30 blur-sm" />
            <div className="text-xs md:text-sm lg:text-xl font-medium tracking-[0.2em] text-white mt-2 lowercase text-center ">
              <DecryptedText
                text="Design beyond the known universe"
                speed={70}
                maxIterations={20}
                sequential={true}
                revealDirection="center"
                className="text-neutral-100 uppercase font-black "
                encryptedClassName="text-neutral-300 uppercase font-black"
                animateOn="view"
              />
            </div>
          </div>
        </div>

        {/* === SOCIAL ICONS BOTTOM-LEFT === */}
        <div className="absolute bottom-0 left-0 z-30 drop-shadow-2xl shadow-none outline-none border-0">
          <div className="relative bg-white rounded-tr-4xl p-4 md:p-5 pr-8 md:pr-10 pl-6 md:pl-8 flex items-center space-x-0 shadow-none outline-none border-0">
            {/* inverted corner right */}

            <div
              className="absolute bottom-[-8px] -right-8 w-10 h-10 bg-white -translate-x-px shadow-none outline-none border-0"
              style={{
                maskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
              }}
            />
            {/* inverted corner top */}
            <div
              className="absolute -top-8 left-0 w-8 h-8 bg-white translate-y-px shadow-none outline-none border-0 "
              style={{
                maskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
              }}
            />

            <AnimatedTooltip items={socialItems} />
          </div>
        </div>

        {/* === PRIZE POOL + JOIN NOW BOTTOM-RIGHT === */}
        <div className="absolute bottom-0 right-0 z-20 drop-shadow-2xl">
          <div className="relative bg-white rounded-tl-4xl pr-2 flex flex-row items-center">
            {/* inverted corner top */}
            <div
              className="absolute -top-8 right-0 w-8 h-8 bg-white translate-y-px"
              style={{
                maskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
              }}
            />
            {/* inverted corner left */}
            <div
              className="absolute bottom-0 -left-8 w-8 h-8 bg-white translate-x-px"
              style={{
                maskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
              }}
            />

            <div className="pl-6  pr-4 md:pr-6 py-3 md:py-4 flex flex-col items-center min-w-28 md:min-w-36">
              <div className="flex items-baseline leading-none">
                <span className="text-6xl md:text-[5rem] font-bold text-black tracking-tighter">
                  <CountUp to={50} from={0} duration={2.5} separator="" />
                </span>
                <span className="text-2xl md:text-3xl ml-1 font-bold text-black">
                  k
                </span>
              </div>
              <span className="text-[8px] md:text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-bold ">
                prize pool
              </span>
            </div>

            <button className="bg-accent text-white font-bold py-4 px-6 md:py-5 md:px-8 rounded-2xl uppercase tracking-widest text-sm md:text-lg border-2 border-black/5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 focus-visible:animate-pulse transition-all duration-150 ease-out">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
