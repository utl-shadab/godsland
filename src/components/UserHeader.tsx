import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from "react-router-dom"
import { navLinks } from "../constant/navLinks";
const UserHeader = ({ setMobileMenuOpen }: { setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const location = useLocation()
  const [search, setSearch] = useState("")
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed w-full mx-auto top-0 left-0 right-0 h-[68px] z-30 backdrop-blur-[20px] bg-[#020F0A]/80 border-b border-[#00d32c]"
    >
      <div className="h-full max-w-[1440px] mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Hamburger (mobile) */}
        <button
          className="lg:hidden w-9 h-9 rounded-lg bg-[#0D3B2B] flex items-center justify-center flex-shrink-0"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path
              d="M1 1H17M1 7H17M1 13H11"
              stroke="#20FFB0"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="flex items-center gap-10">
          <Link to="/" className="text-white hidden lg:block font-readex text-[24px] font-semibold">
            Gods<span className="text-[#00d32c]">land</span>
          </Link>
          <div className="flex items-center gap-3 flex-1 max-w-[320px] h-10 rounded-full bg-[#0A2219]/80 border border-[#1A4A35] px-4 focus-within:border-[#00d32c] transition-all duration-200">

            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667zM14 14l-2.9-2.9"
                stroke="#20c411ff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search NFTs, collections..."
              className="flex-1 bg-transparent outline-none text-white text-sm font-readex placeholder-[#4A7A65]"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-semibold transition-all ${active
                    ? "text-[#00d32c]"
                    : "text-[#00d32c]/70 hover:text-[#00d32c]"
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}

          </div>
          <div className="hidden sm:flex h-10 px-3 rounded-lg border border-[#1A4A35] bg-[#0A2219] flex-col justify-center">
            <div className="text-white text-xs font-semibold font-readex leading-tight">
              0.00 ETH
            </div>
            <div className="text-[#4A7A65] text-[10px] font-readex">
              0xdf....d9A0
            </div>
          </div>
          <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d32c] to-[#00d32c] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                stroke="#020F0A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default UserHeader
