import type { ReactElement } from "react";
import { Twitter, Globe, Linkedin, Instagram } from "lucide-react";

export interface SocialItem {
  id: number;
  name: string;
  designation: string;
  image: string;
  icon: ReactElement;
  href: string;
}

const SOCIAL_PLACEHOLDER =
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png";

export const socialItems: SocialItem[] = [
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
    href: "#",
  },
  {
    id: 2,
    name: "Website",
    designation: "Visit GDG",
    image: "/images/gdg-logo.png",
    icon: (
      <Globe
        size={24}
        className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
      />
    ),
    href: "#",
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
    href: "#",
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
    href: "#",
  },
];
