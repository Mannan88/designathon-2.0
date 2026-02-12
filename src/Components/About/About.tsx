import React from "react"
import { PiGlobeSimple } from "react-icons/pi"
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


const About = () => {

  const container = useRef(null)

  useGSAP(() => {


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "bottom 90%",
        toggleActions: "play none none reverse",
        scrub: true
      },
      defaults: { ease: "power3.out" }
    })

    tl.from(".animate-text", {
      xPercent: -800,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 2,
      ease: "elastic.out(1,0.5)",
    })
      .from(".image-animation", {
        xPercent: 800,
        pin:true,
        autoAlpha: 0,
        duration: 0.5,
        ease: "elastic.out(1,0.5)",
      },"<").from(".copyright-animation",{
        yPercent: -80,
        autoAlpha: 0,
        duration: 0.1,
        ease: "elastic",
      })
      .from(".button-animation", {
        xPercent: 200,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power1.inOut",
      },"<")
      .from(".arrow", {
        xPercent: -150,
        autoAlpha: 0,
        duration: 1,
        ease: "bounce.out",
      })
      .from(".icons-animation", {
        yPercent: -80,
        xPercent:-40,
        autoAlpha: 0,
        duration: 1,
        ease: "elastic",
        stagger:0.2
      })

  }, { scope: container })

  const socialLinks = [
    { Icon: FaTwitter as React.ElementType, url: "https://twitter.com" },
    { Icon: PiGlobeSimple as React.ElementType, url: "https://www.gdgcace.in/" },
    { Icon: FaLinkedin as React.ElementType, url: "https://www.linkedin.com/company/google-developer-student-club-ace" },
    { Icon: FaInstagram as React.ElementType, url: "https://www.instagram.com/gdgc_ace" },
  ];

  return (
    <div
      ref={container}
      className="bg-[#211E1B] min-h-screen flex flex-col overflow-x-hidden text-white pt-20"
    >
      {/* Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row flex-1 w-full gap-20 px-5 lg:px-30 py-1 ">

        {/* Text Area - Left */}
        <div className="flex flex-col flex-1 items-center md:py-12 lg:py-20 text-center mb-10">

          {/* Heading */}
          <div className="flex flex-col">
            <h1
              className="animate-text text-4xl md:text-5xl lg:text-7xl text-white mt-9 leading-tight text-spread tracking-widest"
              style={{ textShadow: "5px 5px 1px rgba(0,0,0,2)" }}
            >
              ABOUT <span className=" text-[#F27C06]">GDGC ACE</span>
            </h1>

            <span className="arrow text-[#F27C06] text-5xl font-serif font-bold lg:relative top-0 left-50 mb-6">&gt;&gt;&gt;&gt;&gt;&gt;</span>

          </div>
          <p className="animate-text text-xl lg:text-2xl text-white lg:max-w-2xl mb-10 lg:leading-11 lg:tracking-wider">
            GDGC ACE empowers tech enthusiasts. We foster a vibrant community through
            workshops, hackathons, and industry connections. Our members explore
            cutting-edge technologies, build strong portfolios, and gain the skills to
            succeed in the evolving tech world.
          </p>

          <button className="button-animation bg-[#F27C06] active:scale-120 px-6 py-4 rounded-xl lg:text-2xl text-xl text-center text-white tracking-wider">
            VISIT GDGC OFFICIAL WEBSITE
          </button>

        </div>

        {/* Image Area - Right */}
        <div className="flex-1 flex items-center justify-center image-animation w-full">
          <div className="relative w-full aspect-square  max-w-full  bg-black shadow-2xl flex items-center justify-center"
            style={{
              clipPath: "url(#aboutInvertedShape)",
              WebkitClipPath: "url(#aboutInvertedShape)"
            }}>
            <span className="text-gray-500 italic">Image Gallery Placeholder</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full py-6 px-20 md:py-8 flex flex-col md:flex-row justify-between text-center items-center gap-6 ">
        <p className="text-white text-xl md:text-2xl copyright-animation">
          © 2025-26 GDGC ACE
        </p>
        <div className="flex gap-6 md:gap-10">
    {socialLinks.map(({ Icon, url }, index) => (
      <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="icons-animation">
        <Icon className={`text-4xl md:text-5xl active:scale-110 ${url.includes('gdgcace') ? 'bg-white p-1 text-[#211E1B] rounded-full hover:bg-[#F27C06]' : 'hover:text-[#F27C06]'}`} />
      </a>
    ))}
  </div>

      </footer >

      {/* SVG ClipPath Definition */}
      < svg width="0" height="0" className="absolute" >
        <defs>
          <clipPath id="aboutInvertedShape" clipPathUnits="objectBoundingBox">
            <path d="M0.05 0 H0.95 A0.05 0.06 0 0 1 1 0.06 V0.94 A0.05 0.06 0 0 1 0.95 1 H0.5 A0.05 0.06 0 0 1 0.45 0.94 V0.84 A0.05 0.06 0 0 0 0.4 0.78 H0.05 A0.05 0.06 0 0 1 0 0.72 V0.06 A0.05 0.06 0 0 1 0.05 0 Z" />
          </clipPath>
        </defs>
      </svg >
    </div >

  )
}

export default About
