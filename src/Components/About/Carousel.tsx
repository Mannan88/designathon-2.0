import { useEffect, useState, useRef } from "react";
import { assets } from "@/lib/assets";

const carouselImages = assets.about.carousel;

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const nextIdx = (currentImage + 1) % carouselImages.length;
    if (!loadedImages.has(nextIdx)) {
      const img = new Image();
      img.src = carouselImages[nextIdx];
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(nextIdx));
      };
    }
  }, [currentImage, loadedImages]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {carouselImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`GDGC Gallery ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "opacity" }}
          draggable={false}
        />
      ))}
    </div>
  );
};

export default Carousel;
