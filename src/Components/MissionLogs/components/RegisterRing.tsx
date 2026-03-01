import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import InteractiveSphere from "./InteractiveSphere";
import { links } from "@/lib/links";

const RegisterRing = () => {
  return (
    <a
      href={links.registration}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full aspect-square  self-center select-none relative"
    >
      <div className="absolute inset-0 rounded-full border-[4px] border-white/70" />
      <div className="absolute inset-[4px] rounded-full bg-white" />
      <div className="absolute inset-[28px] rounded-full border-[2px] border-white/30" />
      <div className="absolute inset-[30px] rounded-full bg-[#141414]" />

      <motion.div
        className="absolute inset-0 w-full h-full will-change-transform"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            id="registerRingPath"
            d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            fill="none"
          />
          <text
            fontSize="10"
            fill="#1a1a1a"
            fontWeight="700"
            letterSpacing="0.12em"
            dominantBaseline="central"
            className="uppercase font-share-tech"
          >
            <textPath href="#registerRingPath">
              Register Now · Register Now · Register Now · Register Now ·
            </textPath>
          </text>
        </svg>
      </motion.div>

      <div className="absolute inset-[28px] flex items-center justify-center pointer-events-none">
        <div className="w-full h-full rounded-full overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 3.2] }}
            style={{ pointerEvents: "auto" }}
            gl={{ alpha: true }}
          >
            <ambientLight intensity={1} />
            <InteractiveSphere />
          </Canvas>
        </div>
      </div>
    </a>
  );
};

export default RegisterRing;
