import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import InteractiveSphere from "./InteractiveSphere";

const RegisterRing = () => {
  return (
    <div className="w-full aspect-square max-w-[200px] self-center select-none relative">
      {/* outer */}
      <div className="absolute inset-0 rounded-full border-[4px] border-white/70" />
      {/* white band */}
      <div className="absolute inset-[4px] rounded-full bg-white" />
      {/* inner */}
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
            fontSize="8"
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

      {/* globe */}
      <div className="absolute inset-[28px] flex items-center justify-center">
        <div className="w-full h-full rounded-full cursor-pointer overflow-hidden">
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
    </div>
  );
};

export default RegisterRing;
