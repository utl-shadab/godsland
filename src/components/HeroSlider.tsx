import { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import one from "../assets/categories/1.png"
import two from "../assets/categories/2.png"
import three from "../assets/categories/3.png"
import four from "../assets/categories/4.png"
import five from "../assets/categories/5.png"
const images = [
    one,
    two,
    three,
    four,
    five
];

const HeroSlider = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Auto-slide effect
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div
            className="relative w-full h-[500px] flex items-center justify-center perspective-[800px] mt-12 opacity-0 transform translate-y-10"
            id="hero-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute cursor-pointer left-4 md:left-20 z-50 p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                <ChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute cursor-pointer right-4 md:right-20 z-50 p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                <ChevronRight />
            </button>

            {/* Slider Container */}
            <div className="relative w-[300px] md:w-[400px] h-[500px] preserve-3d" ref={sliderRef}>
                {images.map((img, index) => {
                    // Calculate position relative to active index
                    let diff = index - activeIndex;
                    // Handle wrap-around for endless feeling (simplified for 5 items)
                    if (diff > 2) diff -= images.length;
                    if (diff < -2) diff += images.length;

                    const isActive = diff === 0;

                    return (
                        <div
                            key={index}
                            className="absolute top-0 left-0 w-full h-full transition-all duration-1000 cubic-bezier(0.165, 0.84, 0.44, 1)"
                            style={{
                                transform: `
                                    translateX(${diff * 70}%)
                                    translateZ(${isActive ? 0 : -400}px)
                                    rotateY(${isActive ? 0 : diff * -20}deg)
                                    scale(${isActive ? 1 : 0.8})
                                `,
                                opacity: Math.abs(diff) > 2 ? 0 : (isActive ? 1 : (Math.abs(diff) === 1 ? 0.9 : 0.5)),
                                zIndex: isActive ? 10 : 5 - Math.abs(diff),
                                filter: isActive ? 'none' : 'brightness(0.5)',
                            }}
                        >
                            <div className={`w-full h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 ${isActive ? 'border-neon-green/50 shadow-[0_0_20px_rgba(0,255,163,0.2)] hover:shadow-[0_0_50px_rgba(0,255,163,0.6)] hover:border-neon-green' : 'border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'} bg-black`}>
                                <img src={img} alt="NFT" className="w-full h-full object-cover" />
                                {isActive && (
                                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                                        <h3 className="text-white font-bold uppercase tracking-wider text-sm">Divine Artifact #{index + 1}</h3>
                                        <p className="text-neon-green text-xs font-mono mt-1">Current Bid: 2.{index * 3 + 1}7 ETH</p>
                                    </div>
                                )}
                            </div>

                            {/* Floor Reflection */}
                            {isActive && (
                                <div className="absolute -bottom-[220px] left-0 w-full h-full scale-y-[-1] opacity-30 pointer-events-none mask-image-gradient"
                                    style={{
                                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)',
                                        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
                                    }}
                                >
                                    <img src={img} alt="Reflection" className="w-full h-full object-cover border-none blur-sm" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroSlider;
