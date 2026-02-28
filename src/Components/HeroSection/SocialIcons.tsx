import { Globe, Linkedin, Twitter, Instagram } from "lucide-react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { assets } from "@/lib/assets";
import { links } from "@/lib/links";

const SOCIAL_PLACEHOLDER =
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png";

const socialItems = [
  {
    id: 1,
    name: "Twitter",
    designation: "Follow Updates",
    image: SOCIAL_PLACEHOLDER,
    icon: (
      <Twitter
        size={24}
        className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
      />
    ),
    href: links.social.twitter,
  },
  {
    id: 2,
    name: "Website",
    designation: "Visit GDG",
    image: assets.hero.gdgLogo,
    icon: (
      <Globe
        size={24}
        className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
      />
    ),
    href: links.social.website,
  },
  {
    id: 3,
    name: "LinkedIn",
    designation: "Connect with us",
    image: SOCIAL_PLACEHOLDER,
    icon: (
      <Linkedin
        size={24}
        className="text-neutral-400 group-hover:text-accent group-hover:fill-accent transition-colors duration-300"
      />
    ),
    href: links.social.linkedin,
  },
  {
    id: 4,
    name: "Instagram",
    designation: "See our gallery",
    image: SOCIAL_PLACEHOLDER,
    icon: (
      <Instagram
        size={24}
        className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
      />
    ),
    href: links.social.instagram,
  },
];

// inverted corner for social icons container
export const InvertedCorner = ({ className }: { className: string }) => (
  <svg
    className={`absolute w-8 h-8 z-10 text-white ${className}`}
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
    viewBox="0 0 32 32"
  >
    <path d="M0 32V0C0 17.67 14.33 32 32 32z" />
  </svg>
);

const SocialIcons = ({ isMobileNav }: { isMobileNav?: boolean }) => {
  if (isMobileNav) {
    return (
      <div className="flex items-center gap-6 justify-center w-full">
        {socialItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="text-white/70 hover:text-accent transition-colors"
          >
            {item.icon}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden absolute lg:flex bottom-0 left-0 z-20 drop-shadow-2xl">
      <div className="relative bg-white rounded-tr-4xl p-4 md:p-5 pr-8 md:pr-10 pl-6 md:pl-8 flex items-center space-x-0">
        <InvertedCorner className="bottom-[-1px] -right-[31.5px]" />
        <InvertedCorner className="-top-[31.5px] left-[-1px]" />
        <AnimatedTooltip items={socialItems} />
      </div>
    </div>
  );
};

export default SocialIcons;
