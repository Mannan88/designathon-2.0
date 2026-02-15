import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({
  assets,
  onComplete,
}: {
  assets: string[];
  onComplete: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const total = assets.length;

    const loadAsset = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    const loadAll = async () => {
      await Promise.all(
        assets.map(async (asset) => {
          try {
            await loadAsset(asset);
          } catch (err) {
            console.error("Failed to load asset:", asset, err);
          } finally {
            loadedCount++;
            setProgress(Math.round((loadedCount / total) * 100));
          }
        })
      );
      // Add a small delay for smooth transition even if fast
      setTimeout(() => setIsLoaded(true), 500);
    };

    loadAll();
  }, [assets]);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(onComplete, 800); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
            />
          </div>
          <div className="font-mono text-sm tracking-widest uppercase">
            Initializing System... {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
