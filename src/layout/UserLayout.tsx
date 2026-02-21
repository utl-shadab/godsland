import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Home } from 'lucide-react'
import UserSidebar from '../components/UserSidebar'
import UserHeader from '../components/UserHeader'
import UserFooter from '../components/UserFooter'
import useScrollToTop from '../hooks/useScrollToTop'

const UserLayout = () => {
  useScrollToTop()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])


  return (
    <div className="min-h-screen bg-black font-readex">
      {/* ─── Mobile Drawer Backdrop ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 h-screen w-[260px] bg-black border-r border-neon-green/30 flex flex-col z-50 lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <Link to="/user" className="text-white font-readex text-[24px] font-semibold">
                Gods<span className="text-neon-green">land</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center text-neon-green hover:bg-neon-green/20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <UserSidebar mobile />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ─── Header ─── */}
      <UserHeader setMobileMenuOpen={setMobileMenuOpen} />

      {/* ─── Main Outlet ─── */}
      <main className="mt-[68px] px-4 md:px-6 lg:px-8 pb-20">
        <Outlet />
      </main>

      {/* ─── Fixed Home Button (right center) ─── */}
      <Link
        to="/"
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 group"
        title="Back to Home"
      >
        <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(0,211,44,0.1)] hover:bg-neon-green/20 hover:border-neon-green/60 hover:shadow-[0_0_30px_rgba(0,211,44,0.2)] active:scale-90 transition-all duration-300">
          <Home size={18} className="text-neon-green group-hover:scale-110 transition-transform duration-200" />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-2xl border border-neon-green/20 animate-ping opacity-30 pointer-events-none" />
        </div>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#111] border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl">
          Back to Home
        </span>
      </Link>

      {/* ─── Footer ─── */}
      <UserFooter />
    </div>
  )
}

export default UserLayout
