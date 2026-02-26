import { assets } from "@/lib/assets";
import LeftColumn from "./LeftColumn";
import CenterVisual from "./CenterVisual";
import RightColumn from "./RightColumn";
import MobileCard from "./MobileCard";

const guidelineContent = [
  {
    title: "Guideline 1",
    lines: ["yyaaaaappppp yappppp", "yappppppppppppppppp", "ppp"],
  },
  {
    title: "Guideline 2",
    lines: ["yyaaaaappppp yappppp", "yappppppppppppppppp", "ppp"],
  },
  {
    title: "Guideline 3",
    lines: ["yyaaaaappppp yappppp", "yappppppppppppppppp", "ppp"],
  },
  {
    title: "Guideline 4",
    lines: ["yyaaaaappppp yappppp", "yappppppppppppppppp", "ppp"],
  },
];

const MainGridContainer = () => {
  return (
    <div className="relative mx-auto h-full max-w-7xl px-4 py-4 md:px-6 lg:py-8">
      <h1 className="mb-12 z-30 text-5xl lg:text-7xl xl:text-8xl leading-none text-accent font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap">
        MISSION <span className="text-white">GUIDELINES</span>
      </h1>

      <div className="mx-auto space-y-0 lg:hidden">
        <MobileCard
          image
          imagePosition="20% 15%"
          guideline={guidelineContent[0]}
          transform="rotate(45deg) scale(1.5)"
        />

        <MobileCard
          image
          imagePosition="50% 12%"
          guideline={guidelineContent[1]}
          reverse
          transform="rotate(40deg) scale(1.5)"
        />

        <MobileCard
          image
          imagePosition="45% 65%"
          guideline={guidelineContent[2]}
          transform="rotate(40deg) scale(1.5)"
        />

        <div className="grid grid-cols-2 gap-0">
          <div className="h-44 border border-white/20 bg-black/80 px-4 py-5 md:h-52 md:py-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-3 w-3 bg-orange-500" />
              <h3 className="text-md font-bold uppercase tracking-[0.08em] text-white md:text-4xl">
                {guidelineContent[3].title}
              </h3>
            </div>

            <div className="space-y-1 text-sm leading-[1.3] text-white/85 md:text-2xl">
              {guidelineContent[3].lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="relative h-44 border border-white/20 md:h-52 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${assets.guidelines.galaxyImage}')`,
                backgroundSize: "450% 300%",
                backgroundPosition: "75% 70%",
                transform: "rotate(40deg) scale(1.5)",
              }}
            />
            <div className="absolute inset-0 bg-orange-700/20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-4 left-1/2 w-[80%] -translate-x-1/2">
              <button className="h-10 w-full rounded-md border border-white bg-[#F27C06] text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-orange-600">
                Download Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden gap-6 lg:flex lg:flex-row">
        <LeftColumn />
        <CenterVisual />
        <RightColumn />
      </div>
    </div>
  );
};

export default MainGridContainer;
