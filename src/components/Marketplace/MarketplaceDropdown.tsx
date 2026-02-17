
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface MarketplaceDropdownProps {
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
    label?: string;
}

const MarketplaceDropdown = ({ options, selected, onSelect, label }: MarketplaceDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
            >
                {label ? label : selected} <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-300 transform origin-top-right ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                <div className="py-2">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between"
                        >
                            {option}
                            {selected === option && <Check size={14} className="text-neon-green" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketplaceDropdown;
