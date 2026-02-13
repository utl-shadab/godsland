import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NFTCard from './NFTCard';
import { featuredCollections } from '../data/mockData';


gsap.registerPlugin(ScrollTrigger);

const FeaturedCollections = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const grid = gridRef.current;

        if (!section || !title || !grid) return;

        // Title Animation
        gsap.fromTo(title,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                }
            }
        );

        // Grid Stagger Animation
        gsap.fromTo(grid.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 75%',
                }
            }
        );

    }, []);

    return (

        <section className="relative py-32 px-8 bg-black z-10" ref={sectionRef}>
            <div className="max-w-[var(--container-width)] mx-auto">
                <div className="flex justify-between items-end mb-16 overflow-hidden">
                    <h2 className="text-[clamp(2rem,5vw,4rem)] uppercase leading-none text-white font-bold" ref={titleRef}>
                        Featured <span className="text-gold-start">Drops</span>
                    </h2>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8" ref={gridRef}>
                    {featuredCollections.map((item) => (
                        <NFTCard
                            key={item.id}
                            title={item.title}
                            creator={item.creator}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
