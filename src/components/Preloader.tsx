import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoading } from '../context/LoadingContext';

const Preloader = () => {
    const { setIsLoading } = useLoading();
    const [counter, setCounter] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsLoading(false);
                if (containerRef.current) {
                    containerRef.current.style.display = 'none';
                }
            }
        });

        // 1. Counter Animation (0 -> 100)
        // We use a proxy object to tween the number
        const counterProxy = { val: 0 };

        tl.to(counterProxy, {
            val: 100,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
                setCounter(Math.floor(counterProxy.val));
            }
        })
            .to(barRef.current, {
                width: '100%',
                duration: 2.5,
                ease: "power2.out"
            }, "<") // Run simultaneously with counter

            // 2. Exit Sequence
            .to(counterRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            })
            .to(barRef.current, {
                opacity: 0,
                duration: 0.3
            }, "<")

            // 3. Curtain Reveal
            .to(curtainRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "expo.inOut"
            }, "-=0.2");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white pointer-events-none">

            {/* The "Curtain" - Black background that slides up */}
            <div ref={curtainRef} className="absolute inset-0 bg-black z-10 flex flex-col items-center justify-center">

                {/* Content Container */}
                <div ref={counterRef} className="flex flex-col items-center relative z-20">
                    {/* Logo / Text */}
                    <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] mb-4 text-gray-500 uppercase">
                        Godsland
                    </h1>

                    {/* Counter */}
                    <div className="text-[6rem] md:text-[8rem] font-bold leading-none font-mono tracking-tighter tabular-nums">
                        {counter}%
                    </div>
                </div>

                {/* Progress Bar Container - Absolute Bottom or Center? Let's do bottom line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                    <div
                        ref={barRef}
                        className="h-full bg-neon-green shadow-[0_0_20px_#00ffa3]"
                        style={{ width: '0%' }}
                    ></div>
                </div>
            </div>

        </div>
    );
};

export default Preloader;
