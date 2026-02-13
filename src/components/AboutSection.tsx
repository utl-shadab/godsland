import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

            <div className="w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <img className='w-full h-full object-contain rounded-2xl' src="/about.avif" alt="" />


                {/* Content */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
                        <span className="text-xs text-white uppercase tracking-widest font-bold">About Godsland</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black text-white uppercase leading-[0.9] mb-8">
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-500">Digital Assets</span>
                    </h2>

                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Godsland is more than just a marketplace—it's a premier ecosystem for digital collectors and creators. We verify every collection to ensure authenticity and quality, providing a secure platform for the next generation of digital assets.
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-1">2.5M+</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">Trading Volume</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-1">50K+</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">NFTs Created</p>
                        </div>
                    </div>

                    <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-neon-green transition-all duration-300">
                        Read More
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section >
    );
};

export default AboutSection;
