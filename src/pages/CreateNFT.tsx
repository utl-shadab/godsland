import { useRef, useState } from 'react';
import gsap from 'gsap';


const CreateNFT = () => {
    const [file, setFile] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate minting
        const btn = e.currentTarget.querySelector('button');
        if (btn) {
            btn.textContent = 'Minting...';
            gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 3 });
            setTimeout(() => {
                btn.textContent = 'Minted Successfully!';
                gsap.to(btn, { backgroundColor: '#00FFA3', color: '#000', scale: 1 });
            }, 2000);
        }
    };

    return (

        <div className="pt-[variable(--header-height)] min-h-screen flex justify-center items-center bg-black">
            <div className="max-w-[600px] w-full p-8 mt-20">
                <h1 className="text-5xl mb-8 text-center text-white font-bold">Create Artifact</h1>

                <form className="flex flex-col gap-8" ref={formRef} onSubmit={handleSubmit}>
                    <div
                        className={`border-2 border-dashed border-white/20 rounded-xl h-[200px] flex justify-center items-center cursor-pointer transition-all duration-300 relative overflow-hidden hover:border-neon-green hover:bg-[rgba(0,255,163,0.05)] ${file ? 'border-solid border-gold-start' : ''}`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="nft-file"
                            hidden
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                        />
                        <label htmlFor="nft-file" className="w-full h-full flex justify-center items-center cursor-pointer">
                            {file ? (
                                <div className="text-center">
                                    <span className="text-white font-medium">{file!.name}</span>
                                </div>
                            ) : (
                                <div className="text-center text-text-secondary">
                                    <span className="text-5xl block mb-4 text-neon-green">+</span>
                                    <p className="mb-2">Drag & Drop or Click to Upload</p>
                                    <span className="text-xs opacity-70">JPG, PNG, GIF, WEBP (Max 100mb)</span>
                                </div>
                            )}
                        </label>
                    </div>

                    <div className="relative group">
                        <input type="text" id="name" required placeholder=" " className="peer w-full bg-white/5 border border-white/10 rounded-lg pt-6 pb-2 px-4 text-white font-primary text-base outline-none transition-all duration-300 focus:border-gold-start focus:bg-black/40" />
                        <label htmlFor="name" className="absolute top-4 left-4 text-text-secondary pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:left-4 peer-focus:text-xs peer-focus:text-gold-start peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-start">Artifact Name</label>
                    </div>

                    <div className="relative group">
                        <textarea id="description" required placeholder=" " rows={4} className="peer w-full bg-white/5 border border-white/10 rounded-lg pt-6 pb-2 px-4 text-white font-primary text-base outline-none transition-all duration-300 focus:border-gold-start focus:bg-black/40"></textarea>
                        <label htmlFor="description" className="absolute top-4 left-4 text-text-secondary pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:left-4 peer-focus:text-xs peer-focus:text-gold-start peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-start">Description</label>
                    </div>

                    <div className="relative group">
                        <input type="text" id="price" required placeholder=" " className="peer w-full bg-white/5 border border-white/10 rounded-lg pt-6 pb-2 px-4 text-white font-primary text-base outline-none transition-all duration-300 focus:border-gold-start focus:bg-black/40" />
                        <label htmlFor="price" className="absolute top-4 left-4 text-text-secondary pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:left-4 peer-focus:text-xs peer-focus:text-gold-start peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-start">Price (ETH)</label>
                    </div>

                    <button type="submit" className="p-4 bg-gradient-gold text-black font-bold text-xl rounded-lg transition-all duration-300 mt-4 hover:-translate-y-0.5 hover:shadow-glow-gold">
                        Mint to Blockchain
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNFT;
