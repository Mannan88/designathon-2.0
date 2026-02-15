import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  min: number;
  max: number;
  interval: number;
  color: string;
}

// oscillating random loader bar
const AnimatedLoader = ({ min, max, interval, color }: Props) => {
  const [width, setWidth] = useState(min + Math.random() * (max - min));

  useEffect(() => {
    const id = setInterval(() => {
      setWidth(min + Math.random() * (max - min));
    }, interval);
    return () => clearInterval(id);
  }, [min, max, interval]);

  return (
    <motion.div
      className={`h-full ${color}`}
      animate={{ width: `${width}%` }}
      transition={{ duration: (interval / 1000) * 0.8, ease: "easeInOut" }}
    />
  );
};

export default AnimatedLoader;
