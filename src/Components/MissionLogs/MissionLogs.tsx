import MouseWaveScene from "../ui/mouse-wave-scene";
import ArrowsBar from "./components/ArrowsBar";
import CpuStats from "./components/CpuStats";
import RegisterRing from "./components/RegisterRing";

const ASSETS = {
  drill: "/images/mission_logs/drill.gif",
  mesh: "/images/mission_logs/mesh.svg",
  milkyway: "/images/mission_logs/milkyway.png",
  sponge: "/images/mission_logs/sponge.gif",
};

const MissionLogs = () => {
  return (
    <main className="h-screen w-full bg-[#141414] text-foreground overflow-hidden relative font-sans">
      {/* bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <h1 className="absolute top-6 lg:top-8 left-1/2 -translate-x-1/2 z-30 text-5xl lg:text-7xl xl:text-8xl leading-none text-accent font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap">
        MISSION <span className="text-white">LOGS</span>
      </h1>

      {/* galaxy underlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] z-[4] opacity-40 mix-blend-screen pointer-events-none">
        <img
          src={ASSETS.milkyway}
          alt="Galaxy"
          className="w-[30vw] max-w-[400px] object-contain"
        />
      </div>

      {/* central mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center z-[5] pointer-events-none">
        <div className="w-[42vw] max-w-[700px] perspective-[1000px] pointer-events-auto">
          <div className="w-full h-full transform-style-3d rotate-x-[15deg]">
            <MouseWaveScene imageSrc={ASSETS.mesh} />
          </div>
        </div>
      </div>

      {/* bottom arrows */}
      <ArrowsBar />

      {/* main grid */}
      <div className="relative z-10 w-full h-full grid grid-cols-[minmax(220px,18vw)_1fr_minmax(220px,18vw)]">
        {/* left column */}
        <div className="flex flex-col p-4 lg:p-6 pt-6 lg:pt-8 gap-4 z-20">
          {/* about theme card */}
          <div className="w-full filter drop-shadow-[0_10px_20px_rgba(242,124,6,0.15)]">
            <div
              className="bg-primary px-6 min-h-38 w-88 flex flex-col py-5 gap-3"
              style={{
                clipPath:
                  "polygon(0% 0%, 55% 0%, 65% 25%, 100% 25%, 100% 100%, 0% 100%)",
                borderRadius: "0 0 1.5rem 1.5rem",
              }}
            >
              <h2 className="text-3xl font-bold leading-none uppercase font-share-tech text-[#141414]">
                About theme
              </h2>
              <p className="text-sm font-inter leading-relaxed font-medium text-orange-200">
                Spacebound symbolizes ambition without limits. Your space crew
                is sent to explore and push beyond the limits of design.
              </p>
            </div>
          </div>

          {/* sponge card */}
          <div className="w-64 aspect-square border border-primary/30 rounded-lg overflow-hidden relative bg-black/20 backdrop-blur-sm">
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/60 z-10" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/60 z-10" />
            <img
              src={ASSETS.sponge}
              alt="Sponge"
              className="w-full h-full object-cover"
            />
          </div>

          {/* id tag */}
          <div className="text-accent font-mono text-xs tracking-[0.2em] flex items-center gap-2">
            XDMGR-231-1 <span className="w-2 h-2 border border-accent" />
          </div>

          <div className="flex-1" />

          {/* description box */}
          <div className="w-[calc(100%+22rem)] relative">
            <div className="bg-[#f5f5f5] text-orange-950 p-5 rounded-lg rounded-tr-none border border-white/10 shadow-2xl relative">
              <p className="text-sm font-medium leading-relaxed font-inter">
                <strong className="text-accent">
                  Designathon 2.0: Spacebound
                </strong>{" "}
                is a creative sprint where imagination meets innovation. Over an
                intense period, participants collaborate to design, prototype,
                and present solutions that push boundaries, whether in
                technology, storytelling, or visual design. It's not just about
                building, it's about exploring new frontiers of creativity.
              </p>
            </div>
          </div>
        </div>

        {/* center spacer */}
        <div />

        {/* right column */}
        <div className="flex flex-col p-4 lg:p-6 pt-6 lg:pt-8 gap-3 z-20">
          {/* drill gif */}
          <div className="w-full h-56 lg:h-72 border border-primary/30 rounded-lg overflow-hidden backdrop-blur-sm relative">
            <img
              src={ASSETS.drill}
              alt="Drill"
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-90"
            />
          </div>

          {/* distance label */}
          <div className="text-accent font-mono text-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent inline-block" /> 151.46
            million kilometer
          </div>

          {/* cpu stats */}
          <div className="absolute bottom-32 right-72">
            <CpuStats />
          </div>

          <div className="flex-1" />

          {/* register globe */}
          <RegisterRing />
        </div>
      </div>
    </main>
  );
};

export default MissionLogs;
