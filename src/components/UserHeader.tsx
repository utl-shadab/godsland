import React from 'react'
import { motion } from 'framer-motion'
const UserHeader = ({ setMobileMenuOpen }: { setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
       <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 lg:left-[230px] right-0 h-[68px] z-30 backdrop-blur-[20px] bg-[#020F0A]/80 border-b border-[#0D2B1F]"
      >
        <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
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

          {/* Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-[320px] h-10 rounded-full bg-[#0A2219]/80 border border-[#1A4A35] px-4">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667zM14 14l-2.9-2.9"
                stroke="#20FFB0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#4A7A65] text-sm font-light font-readex flex-1">
              Search NFTs, collections...
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Balance */}
            <div className="hidden sm:flex h-10 px-3 rounded-lg border border-[#1A4A35] bg-[#0A2219] flex-col justify-center">
              <div className="text-white text-xs font-semibold font-readex leading-tight">
                0.00 ETH
              </div>
              <div className="text-[#4A7A65] text-[10px] font-readex">
                0xdf....d9A0
              </div>
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-lg bg-[#0A2219] border border-[#1A4A35] flex items-center justify-center hover:border-[#20FFB0]/30 transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                  stroke="#20FFB0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#20FFB0] border-2 border-[#020F0A]" />
            </button>

            {/* Avatar */}
            <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#20FFB0] to-[#108C60] flex items-center justify-center">
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
