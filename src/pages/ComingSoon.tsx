import { Link } from 'react-router-dom';

const ComingSoon = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center px-4">
            <h1 className="text-[clamp(3rem,6vw,6rem)] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-6">
                Coming Soon
            </h1>
            <p className="text-xl text-text-secondary mb-12 max-w-lg">
                We are crafting this experience. Stay tuned for something extraordinary.
            </p>
            <Link to="/" className="py-4 px-10 bg-neon-green text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">
                Back to Home
            </Link>
        </div>
    );
};

export default ComingSoon;
