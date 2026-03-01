import { assets } from "@/lib/assets";

const ARROW_ASSETS = {
  filled: assets.missionLogs.arrowFilled,
  outline: assets.missionLogs.arrowOutline,
};

// scrolling arrows with globe icon
const ArrowsBar = () => {
  return (
    <div className=" lg:absolute bottom-4 left-4 lg:bottom-8 lg:left-auto lg:right-72 flex items-center gap-1 z-20 max-w-[50vw] lg:max-w-none">
      {/* arrow strip */}
      <div className="overflow-hidden border-2 border-white p-1 lg:p-1.5 flex-1">
        <div className="flex items-center gap-0.5">
          {/* fewer arrows on mobile to prevent overflow */}
          {Array.from({ length: 8 }).map((_, i) => (
            <img
              key={`mobile-${i}`}
              src={i % 2 === 0 ? ARROW_ASSETS.filled : ARROW_ASSETS.outline}
              alt=""
              className="h-5 w-auto shrink-0 lg:hidden"
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <img
              key={`desktop-${i}`}
              src={i % 2 === 0 ? ARROW_ASSETS.filled : ARROW_ASSETS.outline}
              alt=""
              className="h-10 w-auto shrink-0 hidden lg:block"
            />
          ))}
        </div>
      </div>

      {/* globe icon */}
      <div className="border-2 border-white/80 p-1 lg:p-1.5 shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f27c06"
          strokeWidth="1.5"
          className="w-5 h-5 lg:w-10 lg:h-10"
        >
          <circle cx="12" cy="12" r="10" />
          <ellipse cx="12" cy="12" rx="4" ry="10" />
          <path d="M2 12h20" />
          <path d="M4.5 6.5h15" strokeDasharray="2 2" />
          <path d="M4.5 17.5h15" strokeDasharray="2 2" />
        </svg>
      </div>
    </div>
  );
};

export default ArrowsBar;
