import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// navLinks, footerLinks, variants removed as they appear unused in the provided code snippet

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`absolute top-5 right-6 z-60 ${className}`}>
      {/* hamburger toggle button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md"
        style={{
          backgroundColor: isActive ? "transparent" : "rgba(255,255,255,0.9)",
        }}
        aria-label={isActive ? "Close menu" : "Open menu"}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
          }}
        >
          {isActive ? (
            <X className="w-5 h-5 text-neutral-800" />
          ) : (
            <Menu className="w-5 h-5 text-neutral-800" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
