import { memo } from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { PiGlobeSimple } from "react-icons/pi";
import type { IconType } from "react-icons";
import { links } from "@/lib/links";
import { assets } from "@/lib/assets";

const socialLinks: { Icon: IconType; url: string; label: string }[] = [
  { Icon: FaTwitter, url: links.social.twitter, label: "Twitter" },
  { Icon: PiGlobeSimple, url: links.social.website, label: "Website" },
  { Icon: FaLinkedin, url: links.social.linkedin, label: "LinkedIn" },
  { Icon: FaInstagram, url: links.social.instagram, label: "Instagram" },
];

const Footer = memo(function Footer() {
  return (
    <footer className="bg-background w-full overflow-hidden relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4">
              <img
                src={assets.footer.gdgLogo}
                alt="GDG Logo"
                className="h-16 w-16 object-contain"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3 className="text-foreground text-lg uppercase">
                  Google Developer Groups
                </h3>
                <p className="text-muted-foreground font-inter text-[10px] md:text-[12px] tracking-wider">
                  On Campus • Atharva College of Engineering
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mt-4 max-w-lg font-inter text-[13px] leading-relaxed">
              A community of student developers passionate about Google
              technologies. We organize events, workshops, and hackathons to
              help students learn and grow together.
            </p>
          </div>

          <div className="flex-1 min-w-0 md:max-w-md">
            <div className="border-border overflow-hidden rounded-xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.942130858444!2d72.82468247610579!3d19.1977297481381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7c24db49add%3A0x973ee0458244da44!2sAtharva%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1736273422593!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(92%) contrast(83%)",
                }}
                loading="lazy"
                className="w-full rounded-xl dark:brightness-95 dark:contrast-90 dark:hue-rotate-180 dark:invert"
                title="Google Maps - Atharva College of Engineering"
              />
            </div>
          </div>
        </div>

        <div className="border-border/50 flex flex-col items-center justify-between gap-2 border-t pt-4 mt-5 md:flex-row">
          <p className="text-muted-foreground font-inter text-[11px] tracking-wide">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground font-semibold">GDGC ACE</span> •
            All rights reserved
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, url, label }) => {
              const I = Icon as React.ComponentType<{ className?: string }>;
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={label}
                >
                  <I className="text-xl" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
