import MouseWaveScene from "../../ui/mouse-wave-scene";
import ArrowsBar from "../components/ArrowsBar";
import RegisterRing from "../components/RegisterRing";
import OptimizedImage from "@/Components/OptimizedImage";
import { assets } from "@/lib/assets";

const MissionLogsMobile = () => {
  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden">

      {/* ================= TOP SECTION ================= */}
      <div className="flex p-3 pt-20 gap-3 w-full h-full justify-between z-20 min-h-0 shrink">

        {/* About Theme Card */}
        <div
          className="bg-primary px-2 sm:px-4 h-30 w-60 sm:h-40 sm:w-70 flex flex-col sm:py-4 py-2 gap-0 sm:gap-2"
          style={{
            clipPath:
              "polygon(0% 0%, 65% 0%, 75% 25%, 100% 25%, 100% 100%, 0% 100%)",
            borderRadius: "0.8rem 0 0.8rem 0.8rem",
          }}
        >
          <h2 className="sm:text-2xl text-lg font-bold uppercase font-share-tech text-[#141414]">
            About theme
          </h2>
          <p className="text-[10px] sm:text-[15px] font-inter font-medium text-orange-100 leading-tight">
            Spacebound symbolizes ambition without limits. Your space crew
            is sent to explore and push beyond the limits of design.
          </p>
        </div>
         {/* sponge card (mobile) */}
        <div className="flex items-start w-30 sm:w-48 mb-4 aspect-square">
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

      </div>


      {/* ================= CENTER MESH ================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full pointer-events-none overflow-hidden">

        {/* Mesh */}
        <div className="w-140 perspective-[1000px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-10 opacity-90">
          <div className="w-full h-full transform-style-3d rotate-x-15">
            <MouseWaveScene imageSrc={assets.missionLogs.mesh} />
          </div>
        </div>

        {/* Galaxy */}
        <div className="absolute top-1/2 sm:-translate-y-28 -translate-y-20 mt-12 left-1/2 -translate-x-1/2 z-50">
          <OptimizedImage
            src={assets.missionLogs.milkyway}
            alt="Galaxy"
            eager
            className="sm:w-56 object-contain"
          />
        </div>

        {/* Mesh Alerts */}
        <div className="relative sm:w-140 w-90 sm:h-10 h-20 sm:text-[10px] text-[8px]">
          <div className="absolute  -bottom-26 left-6 text-accent font-mono tracking-[0.2em] items-center gap-2">
            New BigBang detected !!
          </div>

          <div className="absolute -top-6 right-8 text-accent/80 font-mono tracking-[0.2em]">
            High Creativity alert!!
          </div>
        </div>
      </div>


      <div className="flex p-3 pt-20 gap-3 w-full sm:h-100 h-60  justify-s z-20 ">
        {/* Description Box */}

        <div className="bg-foreground sm:w-[68%] w-40 text-black sm:p-3 p-2 rounded-lg">
          <p className="sm:text-[14px] text-[8px] text-justify font-medium leading-relaxed font-inter">
            <strong className="text-accent block mb-0.5">
              Designathon 2.0: Spacebound
            </strong>
            is a creative sprint where imagination meets innovation. Over an
            intense period, participants collaborate to design, prototype, and
            present solutions that push boundaries, whether in technology,
            storytelling, or visual design.
          </p>
        </div>

        <div className="absolute bottom-4 right-4 z-50 size-30 sm:size-46 pointer-events-auto">
          <RegisterRing />
        </div>
      </div>
 
    </div>
  );
};

export default MissionLogsMobile;