
const ARROW_ASSETS = {
  filled: "/images/mission_logs/rightArrow_filled.svg",
  outline: "/images/mission_logs/rightArrow_outline.svg",
};

// scrolling arrows with globe icon
const ArrowsBar = () => {
  return (
    <div className="absolute bottom-12 right-72 flex items-center gap-1 z-20">
      {/* arrow strip */}
      <div className="overflow-hidden border-2 border-white/80 p-1.5">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <img
              key={i}
              src={i % 2 === 0 ? ARROW_ASSETS.filled : ARROW_ASSETS.outline}
              alt=""
              className="h-8 lg:h-10 w-auto shrink-0"
            />
          ))}
        </div>
      </div>

      {/* globe icon */}
      <div className="border-2 border-white/80 p-1.5 shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f27c06"
          strokeWidth="1.5"
          className="w-8 h-8 lg:w-10 lg:h-10"
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
