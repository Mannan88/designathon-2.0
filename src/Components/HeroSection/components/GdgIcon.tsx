import { assets } from "@/lib/assets";

const GdgIcon = () => {
  return (
    <div className="absolute z-10 -top-16 w-28 h-28 rounded-full left-1/2 -translate-x-1/2 flex items-end justify-center bg-white">
      <div className="items-end">
        <img
          src={assets.hero.gdgLogo}
          alt="GDG Logo"
          className="w-12 h-12 md:w-14 md:h-14 sm:h-12 object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default GdgIcon;
