import type { SpringOptions } from "framer-motion";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SideImage, TopImage } from "../constants/SvgExporter";

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  bgcolor?: string;
  assetColors?: string;
  position?: string;
  follower: string;
  textColor?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  overlayContent = null,
  displayOverlayContent = false,
  bgcolor = "#F27C06",
  assetColors = "",
  position = "",
  follower = "",
  textColor = "#000",
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (window.innerWidth < 768) return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (window.innerWidth < 768) return;
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    if (window.innerWidth < 768) return;
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="w-full h-full perspective-midrange flex flex-col items-center justify-center select-none"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-xl border border-amber-50 p-3 sm:p-4 perspective-midrange flex flex-col select-none overflow-hidden"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          backgroundColor: bgcolor,
        }}
        draggable={false}
      >
        <div className="shrink-0">
          <TopImage fill={assetColors} />
        </div>

        <motion.div className="flex flex-1 min-h-0 my-1 w-full justify-between items-center">
          <SideImage fill={assetColors} />
          <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden">
            <motion.img
              src={imageSrc}
              alt={altText}
              className="w-full h-full object-contain"
              draggable={false}
            />
            <div
              className="absolute text-[clamp(3.5rem,12vw,5.5rem)] sm:text-8xl font-bold drop-shadow-[5px_5px_0_rgba(0,0,0,0.25)]"
              style={{ color: textColor }}
            >
              {position}
              <span className="text-[clamp(1.2rem,4vw,2rem)] sm:text-2xl">
                {follower}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="shrink-0 mt-1">
          {displayOverlayContent && overlayContent && (
            <div
              style={{ backgroundColor: assetColors, color: textColor }}
              className="z-10 border font-extrabold border-amber-50 shadow-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-center rounded-xl overflow-hidden"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.15)] leading-none text-center whitespace-nowrap">
                ₹{overlayContent}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </figure>
  );
}
