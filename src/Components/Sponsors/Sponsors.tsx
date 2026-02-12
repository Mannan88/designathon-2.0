import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ThreeDSponsors from "../ui/sponsersystem";
import { Container } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const Sponsors = () => {

    const container = useRef(null)
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "bottom 85%",
                toggleActions: "play none none reverse",
                scrub: true,
            },
            defaults: { ease: "power3.out" }
        })

        tl.from(".heading-animation", {
            xPercent:200,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.1,
        })
        .from(".model-animation",{
            xPercent:200,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.1,
        },">")
    }, { scope: container })
    return (
        <div ref={container} className="w-full min-h-screen flex flex-col bg-black overflow-x-hidden">
            <h1 className="heading-animation uppercase text-white text-6xl  md:text-7xl lg:text-8xl ml-15 mt-5">Sponsors </h1>
            <div className="model-animation lg:p-5 mb-15 z-0">
                <ThreeDSponsors />
            </div>
        </div>
    )
}

export default Sponsors;