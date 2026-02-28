import { useState } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "@/Components/OptimizedImage";
import { assets } from "@/lib/assets";
import { FlippingCard } from "../ui/flipping-card";
import { InvertedCorner } from "./InvertedCorner";

const CardFront = ({ text }: { text: string }) => (
  <div className="flex flex-col h-full items-center text-center w-full justify-center relative">
    <h3 className="text-[1.2rem] leading-[1.3] lg:text-[1.4rem] font-semibold font-sans tracking-tight opacity-90 w-[95%]">
      {text}
    </h3>
    <div className="absolute right-0 bottom-0 w-5 h-5 opacity-40">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-20 12 12)" />
      </svg>
    </div>
  </div>
);

const CardBack = ({ text }: { text: string }) => (
  <div className="flex flex-col h-full w-full items-center justify-center relative text-center">
    <p className="text-[1.05rem] lg:text-[1.15rem] font-medium font-sans opacity-80 leading-snug">
      {text}
    </p>
  </div>
);

const Faqs = () => {
  const [isJupiterHovered, setIsJupiterHovered] = useState(false);

  return (
    <section
      className="relative  h-screen min-h-dvh w-full flex flex-col lg:flex-row bg-black bg-cover bg-center bg-no-repeat overflow-hidden z-0"
      style={{ backgroundImage: `url('${assets.faqs.background}')` }}
    >
      {/* mobile title */}
      <div className="z-30 mb-12 lg:hidden pt-6 pb-0 flex w-full mx-auto items-center justify-center pointer-events-none shrink-0">
        <h1 className="absolute  top-6 lg:top-8 left-1/2 -translate-x-1/2 z-30 text-5xl lg:text-7xl xl:text-8xl leading-none text-accent font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap">
          FAQ<span className="text-white lowercase">s</span>
        </h1>
      </div>
      <div className="md:hidden absolute inset-0 top-0 w-full h-full opacity-90 pointer-events-none">
        <OptimizedImage
          src={assets.faqs.gif}
          alt="FAQ Animate"
          className="w-full h-full top-[-24vh]  right-[-36vw] object-contain absolute top-0 m-auto pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
      <div className="relative w-full flex-1 lg:h-full lg:w-[60%] flex items-center justify-center lg:justify-start lg:pl-10 xl:pl-20 pointer-events-none pb-0 lg:pb-0">
        <div className="relative w-[700px] h-[1000px] shrink-0 scale-[0.55] sm:scale-[0.70] md:scale-[0.85] lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-[0.95] origin-center lg:origin-left -mt-[28vh] sm:-mt-[24vh] lg:mt-0 lg:ml-0 translate-x-[-15%] sm:-translate-x-[5%] lg:translate-x-0 pointer-events-auto">
          {/* origin block */}
          <div className="absolute top-[0px] left-28 w-40 h-44 bg-primary rounded-tl-4xl rounded-tr-4xl rounded-bl-4xl z-10" />

          {/* card 1 */}
          <div className="absolute top-44 left-72 w-52 h-52 z-20">
            <InvertedCorner
              orientation="top-right"
              colorClassName="text-primary"
              className="top-0 -left-[40px]"
            />
            <InvertedCorner
              orientation="bottom-left"
              colorClassName="text-primary"
              className="-top-9 -left-4"
            />

            <FlippingCard
              variant="primary"
              className="!rounded-tl-none  shadow-none"
              frontContent={<CardFront text="What is the team size?" />}
              backContent={
                <CardBack text="1 to 4 members. Solo participants welcome!" />
              }
            />
          </div>

          {/* card 2 */}
          <div className="absolute top-48 left-2 w-[260px] h-[360px] z-20">
            <FlippingCard
              variant="white"
              className="!rounded-bl-none shadow-none"
              frontContent={
                <CardFront text="Do I have to bring a laptop for offline round?" />
              }
              backContent={
                <CardBack text="Yes, bringing your own laptop is mandatory." />
              }
            />
          </div>

          {/* connector block */}
          <div className="absolute top-138 -left-64 w-64 h-72 rounded-br-4xl bg-white z-10" />

          <InvertedCorner
            orientation="bottom-right"
            colorClassName="text-white"
            className="top-[514px] -left-[30px] z-20"
          />
          <InvertedCorner
            orientation="top-left"
            colorClassName="text-white"
            className="top-[550px] -left-[5px] z-20"
          />

          {/* card 3 & card 4 group */}
          <div>
            <div className="absolute top-[380px] left-[520px] w-52 h-52 z-20">
              <FlippingCard
                variant="white"
                className="!rounded-bl-none shadow-none"
                frontContent={<CardFront text="What is Hackathon?" />}
                backContent={
                  <CardBack text="A time-framed event to collaborate and solve design challenges." />
                }
              />
            </div>

            <div className="absolute top-[594px] left-[300px] w-52 h-52 z-20">
              <FlippingCard
                variant="white"
                className="!rounded-tr-none shadow-none"
                frontContent={<CardFront text="Is the prize money real?" />}
                backContent={
                  <CardBack text="Absolutely! Real cash prizes for the winning teams." />
                }
              />
            </div>
            <InvertedCorner
              orientation="bottom-right"
              colorClassName="text-white"
              className="top-[556px] left-[482px] z-20"
            />

            <InvertedCorner
              orientation="top-left"
              colorClassName="text-white"
              className="top-[586px] left-[506px] z-20"
            />
          </div>

          {/* extra faq cards for mobile */}
          <div className="md:hidden">
            <div className="absolute top-[680px] left-[540px] w-52 h-52 z-20">
              <FlippingCard
                variant="white"
                className="!rounded-bl-none shadow-none"
                frontContent={<CardFront text="What is ....?" />}
                backContent={
                  <CardBack text="A time-framed event to collaborate and solve design challenges." />
                }
              />
            </div>

            <div className="absolute top-[894px] left-[320px] w-52 h-52 z-20">
              <FlippingCard
                variant="white"
                className="!rounded-tr-none shadow-none"
                frontContent={<CardFront text="Is the prize money real?" />}
                backContent={
                  <CardBack text="Absolutely! Real cash prizes for the winning teams." />
                }
              />
            </div>
            <InvertedCorner
              orientation="bottom-right"
              colorClassName="text-white"
              className="top-[856px] left-[502px] z-20"
            />
            <InvertedCorner
              orientation="top-left"
              colorClassName="text-white"
              className="top-[886px] left-[526px] z-20"
            />
          </div>

          {/* jupiter discord link */}
          <div
            className="absolute -bottom-24 -right-10 md:top-160 md:left-20 md:-bottom-0 md:-right-0 w-[160px] h-[160px] z-20 cursor-pointer group"
            onMouseEnter={() => setIsJupiterHovered(true)}
            onMouseLeave={() => setIsJupiterHovered(false)}
            onClick={() =>
              window.open("https://discord.gg/your_link_here", "_blank")
            }
          >
            <motion.div
              className="absolute inset-[-42px] pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{
                duration: isJupiterHovered ? 4 : 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              >
                <path
                  id="jupiterRingPath"
                  d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  fill="none"
                />
                <text
                  fontSize="7.5"
                  fill="#ffffff"
                  fontWeight="bold"
                  letterSpacing="0.1em"
                  dominantBaseline="central"
                  className="uppercase font-sans"
                >
                  <textPath href="#jupiterRingPath">
                    ASK QUERIES · JOIN DISCORD · ASK QUERIES · JOIN DISCORD ·
                    ASK QUERIES · JOIN DISCORD · ASK QUERIES · JOIN DISCORD ·
                  </textPath>
                </text>
              </svg>
            </motion.div>

            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <img
                src={assets.faqs.jupiter}
                alt="Jupiter"
                className="w-52 h-52 max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 flex items-center justify-center -translate-y-[2px]">
                <span className="text-white font-bold text-[16px] text-center leading-[1.1] tracking-widest uppercase filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
                  Got More
                  <br />
                  Queries?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex relative right-0 w-[40%] h-full flex-col items-center justify-center px-6 lg:p-4 z-20 pointer-events-none">
        <h1 className="text-white text-[7rem] font-sans font-bold whitespace-nowrap tracking-tight leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20 lg:mb-4 lg:ml-20">
          FAQs
        </h1>
        <div className="w-[600px] h-[600px] opacity-90 lg:mt-[-50px]">
          <OptimizedImage
            src={assets.faqs.gif}
            alt="FAQ Animate"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Faqs;
