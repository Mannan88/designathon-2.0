import MouseWaveScene from "../../ui/mouse-wave-scene";
import CpuStats from "../components/CpuStats";
import RegisterRing from "../components/RegisterRing";
import OptimizedImage from "@/Components/OptimizedImage";
import { assets } from "@/lib/assets";
import ArrowsBar from "../components/ArrowsBar";
const MissionLogsDesktop = () => {
  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between lg:grid lg:grid-cols-[minmax(200px,18vw)_1fr_minmax(200px,18vw)] overflow-hidden pb-12 lg:pb-0">
      {/* left column (desktop) */}
      <div className="flex flex-col p-3 lg:p-5 pt-20 lg:pt-8 gap-3 z-20 pointer-events-none lg:pointer-events-auto min-h-0 shrink">
        <div className="flex justify-between items-start pointer-events-auto gap-3">
          <div className="flex flex-col gap-3 w-[65%] lg:w-full">
            {/* about theme card */}
            <div className="w-full filter drop-shadow-[0_10px_20px_rgba(242,124,6,0.15)] z-20">
              <div
                className="bg-primary px-3 lg:px-6 min-h-20 lg:min-h-36 w-full lg:w-88 flex flex-col py-2 lg:py-5 gap-1 lg:gap-3 h-full"
                style={{
                  clipPath:
                    "polygon(0% 0%, 65% 0%, 75% 25%, 100% 25%, 100% 100%, 0% 100%)",
                  borderRadius: "1rem 0 1rem 1rem",
                }}
              >
                <h2 className="text-lg lg:text-3xl font-bold leading-none uppercase font-share-tech text-[#141414]">
                  About theme
                </h2>
                <p className="text-[10px] lg:text-sm font-inter leading-tight font-medium text-orange-200">
                  Spacebound symbolizes ambition without limits. Your space crew
                  is sent to explore and push beyond the limits of design.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start pointer-events-auto mt-0 relative">
          <div className="text-accent font-mono text-[10px] lg:text-xs tracking-[0.2em] flex items-center gap-2 z-20">
            XDMGR-231-1 <span className="w-2 h-2 border border-accent" />
          </div>
        </div>

        {/* sponge card (desktop) */}
        <div className="hidden lg:flex items-start w-48 lg:w-58 xl:w-68 mb-4 aspect-square">
          <div className=" border border-primary/50 hover:border-primary transition-all ease-in-out duration-300 rounded-lg overflow-hidden relative bg-black/20 backdrop-blur-sm group">
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/60 z-10 group-hover:top-4 group-hover:left-4 group-hover:border-primary transition-all ease-in-out duration-300" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/60 z-10 group-hover:right-4 group-hover:bottom-4 group-hover:border-primary transition-all ease-in-out duration-300" />
            <video
              src={assets.missionLogs.sponge}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* description box (desktop) */}
        <div className="hidden lg:block w-full lg:h-46 items-center border-2 lg:w-[calc(100%+25rem)] relative  pointer-events-auto">
          <div className="bg-foreground h-full text-black text-justify px-4 lg:px-5 py-3 lg:py-4 rounded-2xl border border-white/10 shadow-2xl items-center tracking-tight relative">
            <p className="text-xs lg:text-lg font-medium leading-relaxed font-inter">
              <strong className="text-accent">
                Designathon 2.0: Spacebound
              </strong>{" "}
              is a creative sprint where imagination meets innovation. Over an
              intense period, participants collaborate to design, prototype, and
              present solutions that push boundaries, whether in technology,
              storytelling, or visual design. It's not just about building, it's
              about exploring new frontiers of creativity.
            </p>
          </div>
        </div>
      </div>

      {/* center mesh */}
      <div className="absolute inset-0 lg:static flex flex-col items-center justify-center w-full z-5 pointer-events-none ">
        <div className="w-[90vw] mt-10 md:mt-0 sm:w-[75vw] lg:w-[40vw] max-w-163 perspective-[1000px] absolute top-[50%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto animate-pulse lg:animate-none">
          <div className="w-full h-full transform-style-3d rotate-x-15">
            <MouseWaveScene imageSrc={assets.missionLogs.mesh} />
          </div>
        </div>

        {/* center galaxy image */}

        <div className="absolute top-1/2 mt-12 md:mt-0 left-1/2 -translate-x-1/2 -translate-y-[80%] z-100 pointer-events-none">
          <OptimizedImage
            src={assets.missionLogs.milkyway}
            alt="Galaxy"
            eager
            className="w-60 md:w-72 object-contain"
          />
        </div>
        <div className="relative w-140 h-40 ">
          <div className="flex justify-between absolute top-0 left-0 items-start pointer-events-auto mt-0 ">
            <div className="text-accent font-mono text-[10px] lg:text-xs tracking-[0.2em flex items-center gap-2 z-20">
              New BigBang detected !!{" "}
              <span className="w-6 h-6 border-2 border-accent" />
            </div>
          </div>
          <div className="flex justify-between absolute -top-6 right-8 items-start pointer-events-auto mt-0 ">
            <div className="text-accent/80 font-mono text-[10px] lg:text-xs tracking-[0.2em flex items-center gap-2 z-20 ">
              High Creativity alert!!
            </div>
          </div>
        </div>
      </div>

      {/* right column (desktop) */}
      <div className="flex flex-col p-3 px-5 lg:p-5 lg:pt-8 gap-3 lg:gap-3 z-20 pointer-events-none lg:pointer-events-auto mb-15 lg:mb-0 relative min-h-35 shrink">
        <div className="flex justify-between items-end gap-2 pointer-events-auto lg:hidden h-full pb-3"></div>
        {/* drill video (desktop) */}
        <div className="hidden w-full h-48 lg:block lg:relative lg:w-full lg:h-80 xl:h-98 border border-primary/50 hover:border-primary transition-all ease-in-out duration-300 rounded-lg overflow-hidden backdrop-blur-sm pointer-events-auto z-20 group">
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/60 z-10 group-hover:top-4 group-hover:left-4 group-hover:border-primary transition-all ease-in-out duration-300" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/60 z-10 group-hover:right-4 group-hover:bottom-4 group-hover:border-primary transition-all ease-in-out duration-300" />
          <video
            src={assets.missionLogs.drill}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-90"
          />
        </div>

        <div className="hidden lg:flex text-accent font-mono text-[10px] lg:text-xs items-center gap-2 lg:mt-3">
          <span className="w-1.5 h-1.5 bg-accent inline-block" /> 151.46 million
          kilometer
        </div>

        {/* cpu stats (desktop) */}
        <div className="hidden lg:block relative lg:absolute lg:bottom-28 lg:right-72 lg:mt-0 w-full max-w-xs pointer-events-auto">
          <CpuStats />
        </div>

        <div className="flex-1 hidden lg:block" />

        {/* register globe (desktop) */}
        <div className="hidden lg:block lg:relative lg:mt-0 z-50 pointer-events-auto">
          <RegisterRing />
        </div>
      </div>
        <ArrowsBar />
    </div>
  );
};

export default MissionLogsDesktop;
