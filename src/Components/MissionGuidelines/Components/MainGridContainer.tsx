import React from "react";
import LeftColumn from "./LeftColumn";
import CenterVisual from "./CenterVisual";
import RightColumn from "./RightColumn";

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

const MobileCard = ({
  image,
  imagePosition,
  guideline,
  reverse,
}: {
  image: boolean;
  imagePosition: string;
  guideline: (typeof guidelineContent)[number];
  reverse?: boolean;
}) => {
  const imageCard = (
    <div
      className="h-44 border border-white/20 md:h-52"
      style={{
        backgroundImage: "url('/images/Guidelines/Galaxy-image.jpg')",
        backgroundSize: "450% 300%",
        backgroundPosition: imagePosition,
      }}
    >
      <div className="h-full w-full bg-orange-700/20 mix-blend-overlay" />
    </div>
  );

  const textCard = (
    <div className="h-44 border border-white/20 bg-black/80 px-4 py-5 md:h-52 md:py-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-3 w-3 bg-orange-500" />
        <h3 className="text-3xl font-bold uppercase tracking-[0.08em] text-white md:text-4xl">
          {guideline.title}
        </h3>
      </div>
      <div className="space-y-1 text-xl leading-[1.3] text-white/85 md:text-2xl">
        {guideline.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-0">
      {reverse ? (
        <>
          {textCard}
          {image ? imageCard : <div className="h-44 md:h-52" />}
        </>
      ) : (
        <>
          {image ? imageCard : <div className="h-44 md:h-52" />}
          {textCard}
        </>
      )}
    </div>
  );
};

const MainGridContainer = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20 relative">
      {/* Title */}
      <h2 className="mb-10 text-center text-4xl font-bold text-white md:text-7xl">
        MISSION GUIDELINES
      </h2>

      {/* Mobile layout */}
      <div className="mx-auto max-w-[720px] space-y-0 lg:hidden">
        <MobileCard
          image
          imagePosition="35% 18%"
          guideline={guidelineContent[0]}
          reverse={false}
        />
        <MobileCard
          image
          imagePosition="65% 18%"
          guideline={guidelineContent[1]}
          reverse
        />
        <MobileCard
          image
          imagePosition="35% 70%"
          guideline={guidelineContent[2]}
          reverse={false}
        />
        <div className="grid grid-cols-2 gap-0">
          <div className="h-44 border border-white/20 bg-black/80 px-4 py-5 md:h-52 md:py-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-3 w-3 bg-orange-500" />
              <h3 className="text-3xl font-bold uppercase tracking-[0.08em] text-white md:text-4xl">
                {guidelineContent[3].title}
              </h3>
            </div>
            <div className="space-y-1 text-xl leading-[1.3] text-white/85 md:text-2xl">
              {guidelineContent[3].lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div
            className="relative h-44 border border-white/20 md:h-52"
            style={{
              backgroundImage: "url('/images/Guidelines/Galaxy-image.jpg')",
              backgroundSize: "450% 300%",
              backgroundPosition: "65% 70%",
            }}
          >
            <div className="absolute inset-0 bg-orange-700/20 mix-blend-overlay" />
            <div className="absolute bottom-4 left-1/2 w-[86%] -translate-x-1/2">
              <button className="h-12 w-full rounded-md border border-white bg-[#F27C06] text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-orange-600">
                Download Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden gap-6 lg:flex lg:flex-row">
        <LeftColumn />
        <CenterVisual />
        <RightColumn />
      </div>
    </div>
  );
};

export default MainGridContainer;
