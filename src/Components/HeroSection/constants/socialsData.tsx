import type { ReactElement } from "react";
import { Twitter, Globe, Linkedin, Instagram } from "lucide-react"; // adjust import source

// Define the shape of a social item
export interface SocialItem {
  id: number;
  name: string;
  designation: string;
  image: string;
  icon: ReactElement;
  href: string;
}

// Strongly typed array of social items
export const socialItems: SocialItem[] = [
  {
    id: 1,
    name: "Twitter",
    designation: "Follow Updates",
    image:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png",
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
    image:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png",
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
    image:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png",
    icon: (
      <Instagram
        size={24}
        className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
      />
    ),
    href: "#",
  },
];