import { useState, useEffect } from "react";
import ArrowsBar from "./components/ArrowsBar";
import MissionLogsMobile from "./responsive/MissionLogsMobile";
import MissionLogsDesktop from "./responsive/MissionLogsDesktop";

const MissionLogs = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="h-dvh max-h-screen w-full bg-[#141414] text-foreground overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

      <h1 className="absolute top-4 lg:top-8 left-1/2 -translate-x-1/2 z-30 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl leading-none text-accent font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap">
        MISSION <span className="text-white">LOGS</span>
      </h1>
    
      {width < 1024 ? <MissionLogsMobile /> : <MissionLogsDesktop />}
      
    </main>
  );
};

export default MissionLogs;