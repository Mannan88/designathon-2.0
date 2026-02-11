const MissionGuidelines = () => {
  const imagePositions = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];

  const labels = [
    "ACCRETION DISK",
    "TON-618",
    "PHOTON DISK",
    "DOPPLERS BEAMING",
  ];

  return (
    <section className="min-h-screen w-full bg-background border-t border-white/10 relative overflow-hidden">
      {/* Orange corner decorations */}
      <div className="absolute top-4 left-4 grid grid-cols-2 gap-2 grid-rows-2 ">
        <div className="w-6 h-6 bg-orange-500"></div>
        <div className="w-6 h-6 bg-orange-500"></div>
        <div className="w-6 h-6 bg-orange-500"></div>
      </div>
      <div className="absolute top-4 right-4 grid grid-cols-2 grid-rows-2 gap-2">
        <div className="col-start-1 row-start-1 w-5 h-5 bg-orange-500" />
        <div className="col-start-2 row-start-1 w-5 h-5 bg-orange-500" />
        <div className="col-start-2 row-start-2 w-5 h-5 bg-orange-500" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 relative">
        {/* Title */}
        <h2 className="text-center text-5xl md:text-7xl font-bold tracking-widest text-white mb-20">
          MISSION GUIDELINES
        </h2>

        {/* MAIN FLEX CONTAINER */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 w-full lg:w-1/4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-64 bg-black/70 backdrop-blur-md rounded-lg p-6 border border-white/20 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-500" />
                  <h3 className="text-white text-xl font-bold tracking-wider">
                    Guideline {n}
                  </h3>
                </div>
                <div className="space-y-1 text-white/70 text-sm font-light tracking-wide">
                  <p>yap yap yap</p>
                  <p>yap yap yap</p>
                  <p>yap yap yap</p>
                  <p>yap yap yap</p>
                  <p className="text-center">yap</p>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER VISUAL (2x2 via FLEX, IMAGE INSIDE BOXES) */}
          <div className="w-full lg:w-2/4 flex flex-wrap gap-2">
            {imagePositions.map((pos, i) => (
              <div
                key={i}
                className="relative w-[calc(50%-0.25rem)] h-48 md:h-64 rounded-sm border border-white/30 overflow-hidden"
                style={{
                  backgroundImage: "url('/images/Guidelines/Galaxy-image.jpg')",
                  backgroundSize: "200% 200%",
                  backgroundPosition: pos,
                }}
              >
                <div className="absolute top-3 left-3 text-white text-[10px] tracking-widest font-light">
                  {labels[i]}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6 w-full lg:w-1/4">
            {[3, 4].map((n) => (
              <div
                key={n}
                className="h-64 bg-black/70 backdrop-blur-md rounded-lg p-6 border border-white/20 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-500" />
                  <h3 className="text-white text-xl font-bold tracking-wider">
                    Guideline {n}
                  </h3>
                </div>
                <div className="space-y-1 text-white/70 text-sm font-light tracking-wide">
                  <p>yap yap yap</p>
                  <p>yap yap yap</p>
                  <p>yap yap yap</p>
                  <p>yap yap yap</p>
                  <p className="text-center">yap</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <button className="h-12 w-56 bg-orange-500 hover:bg-orange-600 transition-colors rounded-md text-white font-bold tracking-widest text-sm uppercase">
            Download Guidelines
          </button>
        </div>
      </div>
    </section>
  );
};

export default MissionGuidelines;
