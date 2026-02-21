import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navLinks } from "../constant/navLinks";


export const UserSidebar = ({ mobile = false }) => (
  <nav className="flex flex-col h-full">
    <div className={`${mobile ? "pt-6 pb-8 px-6" : "p-8"}`}>

    </div>

    <div className="flex flex-col gap-2 px-4 flex-1">
      {navLinks.map((link, i) => {
        const active = location.pathname === link.to;
        return (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.1 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to={link.to}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${active
                ? "bg-[#0D3B2B] border border-[#00d32c]/20"
                : "hover:bg-[#0D3B2B]/50"
                }`}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#00d32c]"
                />
              )}
              {/* <span className="flex-shrink-0">{link.icon(active)}</span> */}
              <span
                className={`font-readex text-sm font-semibold transition-colors duration-200 ${active
                  ? "text-[#00d32c]"
                  : "text-[#00d32c] group-hover:text-[#00d32c]/70"
                  }`}
              >
                {link.label}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  </nav>
);

export default UserSidebar;
