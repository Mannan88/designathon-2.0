import { assets } from "@/lib/assets";
import { links } from "@/lib/links";

const GALAXY_BG_BASE = {
  backgroundImage: `url('${assets.guidelines.galaxyImage}')`,
  backgroundSize: "450% 300%",
};

const GalaxyOverlay = () => (
  <>
    <div className="absolute inset-0 bg-orange-700/20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-black/20" />
  </>
);

const CenterVisual = () => {
  return (
    <div className="w-full lg:w-2/4 grid grid-cols-2 grid-rows-2 gap-2 h-full">
      <div
        className="relative border border-white/30 overflow-hidden"
        style={{ ...GALAXY_BG_BASE, backgroundPosition: "35% 18%" }}
      >
        <GalaxyOverlay />
      </div>

      <div
        className="relative border border-white/30 overflow-hidden"
        style={{ ...GALAXY_BG_BASE, backgroundPosition: "65% 18%" }}
      >
        <GalaxyOverlay />
      </div>

      <div
        className="relative border border-white/30 overflow-hidden"
        style={{ ...GALAXY_BG_BASE, backgroundPosition: "35% 70%" }}
      >
        <GalaxyOverlay />
      </div>

      <div
        className="relative border border-white/30 overflow-hidden"
        style={{ ...GALAXY_BG_BASE, backgroundPosition: "65% 70%" }}
      >
        <GalaxyOverlay />
        <div className="absolute bottom-3 right-3 left-3 flex justify-end cursor-pointer">
          <a
            href={links.downloadGuidelines}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 xl:h-12 w-44 xl:w-50 bg-primary border border-white hover:bg-orange-600 transition-colors rounded-md text-white font-bold tracking-widest text-xs xl:text-sm uppercase flex items-center justify-center"
          >
            Download Guidelines
          </a>
        </div>
      </div>
    </div>
  );
};

export default CenterVisual;
