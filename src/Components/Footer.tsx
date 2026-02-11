import { memo } from "react";


const Footer = memo(function Footer() {
  // const [modal, setModal] = useState({ active: false, index: 0 }); // Unused
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Unused
  // const modalContainer = useRef<HTMLDivElement>(null); // Used only for the motion div below

  // useEffect for modalContainer removed as likely unused if we remove the motion.div

  return (
    <footer className="bg-background relative z-0 w-full overflow-hidden">
      {/* main footer content */}
      <div className="relative">
        {/* subtle dotted pattern background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-8 md:px-12 md:pt-16">
          {/* main content grid */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* left - branding and map */}
            <div className="relative">
              {/* logo section */}
              <div className="flex items-center gap-4">
                <img
                  src="https://res.cloudinary.com/dunayy41e/image/upload/v1769463249/gdg-logo_lwjmhh.png"
                  alt="GDG Logo"
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <h3 className="text-foreground  text-sm font-bold tracking-wide uppercase md:text-base">
                    Google Developer Groups
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    On Campus • Atharva College of Engineering
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
                A community of student developers passionate about Google
                technologies. We organize events, workshops, and hackathons to
                help students learn and grow together.
              </p>

              {/* google map */}
              <div className="border-border mt-6 overflow-hidden rounded-xl border">
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

          {/* bottom section */}
          <div className="border-border mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                © {new Date().getFullYear()}
              </span>
              <span className="text-foreground font-semibold">GDGC ACE</span>
              <span className="text-muted-foreground">
                • All rights reserved
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
});

export default Footer;
