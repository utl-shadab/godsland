import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "What is an NFT and how does it work?",
        answer: "NFTs (Non-Fungible Tokens) are unique digital assets verified on the blockchain. Unlike cryptocurrencies, each NFT is distinct and cannot be exchanged on a one-to-one basis. They represent ownership of digital or physical items."
    },
    {
        question: "How do I buy an NFT on Godsland?",
        answer: "To buy an NFT, connect your crypto wallet (like MetaMask), browse the marketplace, and place a bid or buy instantly. Once the transaction is confirmed on the blockchain, the NFT will be transferred to your wallet."
    },
    {
        question: "What are the gas fees?",
        answer: "Gas fees are transaction fees paid to miners on the blockchain to process your transaction. These fees vary based on network congestion. Godsland optimizes smart contracts to keep these fees as low as possible."
    },
    {
        question: "Can I sell my NFTs here?",
        answer: "Yes! You can list your NFTs for sale on Godsland. Simply go to your profile, select the NFT you want to sell, and choose your pricing method (Fixed Price or Auction)."
    },
    {
        question: "Is Godsland secure?",
        answer: "Security is our top priority. We use audited smart contracts and industry-standard encryption. However, always ensure you keep your private keys safe and never share your seed phrase."
    }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-black relative z-10">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        Frequently Asked <span className="text-neon-green">Questions</span>
                    </h2>
                    <p className="text-gray-400">Everything you need to know about the marketplace.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'bg-white/5 border-neon-green/30' : 'bg-black hover:border-white/20'}`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-300'}`}>
                                    {faq.question}
                                </span>
                                <span className={`p-2 rounded-full border transition-all ${activeIndex === index ? 'bg-neon-green text-black border-neon-green' : 'border-white/20 text-white'}`}>
                                    {activeIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
