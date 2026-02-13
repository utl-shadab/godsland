

interface NFTCardProps {
    title: string;
    creator: string;
    price: string;
    image: string;
    delay?: number; // For staggered animation
}

const NFTCard = ({ title, creator, price, image }: NFTCardProps) => {
    return (
        <div className="group relative rounded-2xl overflow-hidden bg-dark-green transition-all duration-400 cursor-pointer border border-white/10 hover:shadow-glow-gold hover:border-gold-start hover:-translate-y-2.5">
            <div className="w-full h-[400px] overflow-hidden relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-gradient-to-t after:from-black/90 after:to-transparent after:opacity-60 after:transition-opacity after:duration-300 group-hover:after:opacity-90">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110" loading="lazy" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-5 transition-transform duration-400 group-hover:translate-y-0">
                <span className="text-sm text-neon-green uppercase tracking-wide mb-4 block">@{creator}</span>
                <h3 className="text-2xl text-white mb-2 font-bold">{title}</h3>

                <div className="flex justify-between items-center opacity-0 translate-y-2.5 transition-all duration-400 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="font-bold text-gold-start">{price}</span>
                    <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-xs uppercase transition-all duration-300 hover:bg-neon-green hover:text-black">Bid Now</button>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
