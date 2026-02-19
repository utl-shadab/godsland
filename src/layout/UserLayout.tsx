import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import UserSidebar from '../components/UserSidebar'
import UserHeader from '../components/UserHeader'
import UserFooter from '../components/UserFooter'
import useScrollToTop from '../hooks/useScrollToTop'

const UserLayout = () => {
  useScrollToTop()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen bg-blackfont-readex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[230px] bg-black border-r border-[#00d32c] flex-col z-40">
        <UserSidebar />
      </aside>

      {/* Mobile Drawer Backdrop */}
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 h-screen w-[260px] bg-black border-r border-[#00d32c] flex flex-col z-50 lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <h1 className="text-white font-readex text-[24px] font-semibold">
                Gods<span className="text-[#00d32c]">land</span>
              </h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#0D3B2B] flex items-center justify-center text-[#00d32c]"
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

      {/* Header */}
      <UserHeader setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Outlet */}
      <main className="lg:ml-[230px] mt-[68px] p-4 md:p-6 lg:p-8 pb-20">
        <Outlet />
      </main>

      {/* Footer */}
      <UserFooter />
    </div>
  )
}

export default UserLayout
