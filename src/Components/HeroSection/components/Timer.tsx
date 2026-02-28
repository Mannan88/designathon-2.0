type timeLeftType = {
  days: string;
  hours: string;
  mins: string;
  secs: string;
};

interface TimerProps {
  timeLeft: timeLeftType;
}

const Timer = ({ timeLeft }: TimerProps) => {
  return (
    <div style={{ zIndex: 50 }} className="absolute top-24 left-0 drop-shadow-xl">
      <div className="relative bg-white rounded-r-3xl py-1 sm:py-4 pl-3 sm:pl-4 flex flex-row items-center">
        {/* rounded white corners */}
        <div
          className="absolute -bottom-6 left-0 w-6 h-6 bg-white"
          style={{
            maskImage:
              "radial-gradient(circle at 100% 100%, transparent 1.5rem, black 1.5rem)",
            WebkitMaskImage:
              "radial-gradient(circle at 100% 100%, transparent 1.5rem, black 1.5rem)",
          }}
        />
        <div
          className="absolute -top-6 left-0 w-6 h-6 bg-white"
          style={{
            maskImage:
              "radial-gradient(circle at 100% 0%, transparent 1.5rem, black 1.5rem)",
            WebkitMaskImage:
              "radial-gradient(circle at 100% 0%, transparent 1.5rem, black 1.5rem)",
          }}
        />

        <div className="flex flex-col items-center gap-1.5 sm:gap-2 pr-4 py-4 sm:py-2">
          <div className="flex flex-col items-center leading-none">
            <span className="text-xl sm:text-2xl font-bold text-accent font-inter">
              {timeLeft.days}
            </span>
            <span className="text-[8px] sm:text-[12px] uppercase tracking-wider text-black/80 mt-0.5 font-bold">
              days
            </span>
          </div>
          <div className="flex flex-col items-center leading-none">
            <span className="text-xl md:text-2xl font-bold text-accent font-inter">
              {timeLeft.hours}
            </span>
            <span className="text-[8px] sm:text-[12px] uppercase tracking-wider text-black/80 mt-0.5 font-bold">
              hours
            </span>
          </div>
          <div className="flex flex-col items-center leading-none">
            <span className="text-xl md:text-2xl font-bold text-neutral-700 font-inter">
              {timeLeft.mins}
            </span>
            <span className="text-[8px] sm:text-[12px] uppercase tracking-wider text-black/80 mt-0.5 font-bold">
              mins
            </span>
          </div>
          <div className="flex flex-col items-center leading-none">
            <span className="text-xl md:text-2xl font-bold text-neutral-700 font-inter">
              {timeLeft.secs}
            </span>
            <span className="text-[8px] sm:text-[12px] uppercase tracking-wider text-black/80 mt-0.5 font-bold">
              secs
            </span>
          </div>
        </div>

        {/* vertical label area */}
        <div
          className="text-[7px] md:text-[12px] uppercase tracking-[0.15em] text-black/90 font-medium ml-1 select-none"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
