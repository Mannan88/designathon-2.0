import React,{useEffect, useState} from "react"

const Carousel = () => {
    const carouselImage = [
        "../../../public/images/about/img1.jpg",
        "../../../public/images/about/img2.jpg",
        "../../../public/images/about/img3.jpg",
        "../../../public/images/about/img4.jpg",
        "../../../public/images/about/img5.jpg"
      ]

      const [currentImage, setCurrentImage] = useState(0)

      useEffect(() => {
        const timer = setInterval(()=>{
          setCurrentImage((prev) => (prev+1)%carouselImage.length)
        },3000)
        return () => clearInterval(timer)
      },[])


return(
    <div className="border-2 flex ">
        {carouselImage.map((img, index) =>(
        <img
        key={index}
        src={img}
        alt={`GDGC Gallery ${index}`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          index === currentImage ? "opacity-100" : "opacity-0"
        }`}
      />
      ))
      }
    </div>
)}

export default Carousel;