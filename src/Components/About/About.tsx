"use client";
import React, { useEffect, useState } from "react"
import { PiGlobeSimple } from "react-icons/pi"
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText";
import Carousel from "./Carousel";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);


const About = () => {

  const container = useRef(null)

  useGSAP(() => {

    // Split only heading
    const headingsplit = new SplitText(".heading-text", {
      type: "chars",
    });

    const parasplit = new SplitText(".para-text", {
      type: "lines",
      linesClass: "para-line"
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 35%",
        end: "bottom 100%",
        scrub: 1,
      },
      defaults: { ease: "power3.out" },
    });

    tl.from(headingsplit.chars, {
      y: 80,
      autoAlpha: 0,
      stagger: 0.15,
      duration: 3,
    })

      .from(parasplit.lines, {
        y: 50,
        autoAlpha: 0,
        filter: "blur(8px)",
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      }, "-=1.5")

      .from(".arrow", {
        x: -40,
        autoAlpha: 0,
        duration: 0.6,
        ease: "bounce.out"
      }, "-=0.8")

      .from(".image-animation", {
        x: 10,
        autoAlpha: 0,
        duration: 5,
      }, "-=0.8")

      // Button
      .from(".button-animation", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
      }, "-=0.6")

      // Icons
      .from(".icons-animation", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 2,
        delay:1,
      }, "-=1")


    return () => {
      headingsplit.revert();
      parasplit.revert();
    }
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
      className="bg-[#211E1B] h-100vh flex flex-col overflow-x-hidden text-white pt-20"
    >
      {/* Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row flex-1 w-full gap-20 px-5 lg:px-30 py-1 ">

        {/* Text Area - Left */}
        <div className="flex flex-col flex-1 items-center md:py-12 lg:py-20 text-center mb-10">

          {/* Heading */}
          <div className="flex flex-col">
            <h1
              className="heading-text text-4xl md:text-5xl lg:text-7xl text-white mt-9 leading-tight text-spread tracking-widest"
              style={{ textShadow: "5px 5px 1px rgba(0,0,0,2)" }}
            >
              ABOUT <span className=" text-[#F27C06]">GDGC ACE</span>
            </h1>

            <span className="arrow text-[#F27C06] text-5xl font-serif font-bold lg:relative top-0 left-50 mb-6">&gt;&gt;&gt;&gt;&gt;&gt;</span>

          </div>
          <p className="para-text text-xl lg:text-2xl text-white lg:max-w-2xl mb-10 lg:leading-11 lg:tracking-wider">
            GDGC ACE empowers tech enthusiasts. We foster a vibrant community through
            workshops, hackathons, and industry connections. Our members explore
            cutting-edge technologies, build strong portfolios, and gain the skills to
            succeed in the evolving tech world.
          </p>

          <a href="https://www.gdgcace.in/" target="_blank">
          <button className="button-animation bg-[#F27C06] active:scale-120 px-6 py-4 rounded-xl lg:text-2xl text-xl text-center text-white tracking-wider">
            VISIT GDGC OFFICIAL WEBSITE
          </button>
          </a>
        </div>

        {/* Image Area - Right */}
        <div className="flex-1 flex items-center justify-center image-animation w-full">
          <div className="relative w-full aspect-square  max-w-full  bg-black shadow-2xl flex items-center justify-center"
            style={{
              clipPath: "url(#aboutInvertedShape)",
              WebkitClipPath: "url(#aboutInvertedShape)"
            }}>
              <Carousel/>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full py-6 px-20 md:py-8 flex flex-col md:flex-row justify-between text-center items-center gap-6 ">
        <p className="text-white text-xl md:text-2xl icon-animation">
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
