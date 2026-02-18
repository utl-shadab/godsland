import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  {
    to: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M10.5525 2.67526C10.9579 2.33459 11.4705 2.14783 12 2.14783C12.5295 2.14783 13.0421 2.33459 13.4475 2.67526L20.1975 8.35126C20.4488 8.56239 20.6508 8.82593 20.7894 9.1234C20.928 9.42087 20.9999 9.74507 21 10.0733V19.5008C21 19.8986 20.842 20.2801 20.5607 20.5614C20.2794 20.8427 19.8978 21.0008 19.5 21.0008H15.375C14.9772 21.0008 14.5956 20.8427 14.3143 20.5614C14.033 20.2801 13.875 19.8986 13.875 19.5008V14.2508H10.125V19.5008C10.125 19.8986 9.96696 20.2801 9.68566 20.5614C9.40436 20.8427 9.02282 21.0008 8.625 21.0008H4.5C4.10218 21.0008 3.72064 20.8427 3.43934 20.5614C3.15804 20.2801 3 19.8986 3 19.5008V10.0725C3.00008 9.74432 3.07196 9.42012 3.21059 9.12265C3.34922 8.82518 3.55124 8.56164 3.8025 8.35051L10.5525 2.67451V2.67526Z"
          fill={active ? "#20FFB0" : "#108C60"}
        />
      </svg>
    ),
  },
  {
    to: "/explore",
    label: "Explore",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.2929 16.7156L12.2923 16.7166L9.13597 11.792L12.2917 6.86843L12.2923 6.8674L15.4486 11.792L12.2929 16.7156Z"
          stroke={active ? "#20FFB0" : "#108C60"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="12.2917"
          cy="11.7917"
          r="10.7917"
          stroke={active ? "#20FFB0" : "#108C60"}
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    to: "/buy-sell",
    label: "Buy/Sell",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5.9 3L19.6143 3C19.7871 3 19.8735 3 19.9438 3.02112C20.1047 3.06944 20.2306 3.19531 20.2789 3.3562C20.3 3.42655 20.3 3.51294 20.3 3.68571C20.3 4.72238 20.3 5.24071 20.1733 5.6628C19.8834 6.62813 19.1281 7.38338 18.1628 7.67325C17.7407 7.8 17.2224 7.8 16.1857 7.8H19.5C20.4428 7.8 20.9142 7.8 21.2071 8.09289C21.5 8.38579 21.5 8.85719 21.5 9.8L21.5 12.6V17.4V19C21.5 19.9428 21.5 20.4142 21.2071 20.7071C20.9142 21 20.4428 21 19.5 21L7.5 21C5.61438 21 4.67157 21 4.08578 20.4142C3.5 19.8284 3.5 18.8856 3.5 17L3.5 5.4C3.5 4.07452 4.57452 3 5.9 3Z"
          fill={active ? "#20FFB0" : "#108C60"}
        />
        <path
          d="M3.5 5.4L3.5 17C3.5 18.8856 3.5 19.8284 4.08579 20.4142C4.67157 21 5.61438 21 7.5 21L19.5 21C20.4428 21 20.9142 21 21.2071 20.7071C21.5 20.4142 21.5 19.9428 21.5 19V17.4M3.5 5.4C3.5 6.72548 4.57452 7.8 5.9 7.8L19.5 7.8C20.4428 7.8 20.9142 7.8 21.2071 8.09289C21.5 8.38579 21.5 8.85719 21.5 9.8L21.5 12.6M3.5 5.4C3.5 4.07452 4.57452 3 5.9 3L19.6143 3M21.5 17.4H18.7C17.7572 17.4 17.2858 17.4 16.9929 17.1071C16.7 16.8142 16.7 16.3428 16.7 15.4V14.6C16.7 13.6572 16.7 13.1858 16.9929 12.8929C17.2858 12.6 17.7572 12.6 18.7 12.6H21.5M21.5 17.4V12.6"
          stroke={active ? "#001C12" : "#001C12"}
        />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9C8 7.93913 8.42143 6.92172 9.17157 6.17157C9.92172 5.42143 10.9391 5 12 5C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9ZM14 9C14 9.53043 13.7893 10.0391 13.4142 10.4142C13.0391 10.7893 12.5304 11 12 11C11.4696 11 10.9609 10.7893 10.5858 10.4142C10.2107 10.0391 10 9.53043 10 9C10 8.46957 10.2107 7.96086 10.5858 7.58579C10.9609 7.21071 11.4696 7 12 7C12.5304 7 13.0391 7.21071 13.4142 7.58579C13.7893 7.96086 14 8.46957 14 9Z"
          fill={active ? "#20FFB0" : "#108C60"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1ZM3 12C3 14.09 3.713 16.014 4.908 17.542C5.74723 16.4399 6.8299 15.5467 8.07143 14.9323C9.31297 14.3179 10.6797 13.9988 12.065 14C13.4323 13.9987 14.7819 14.3095 16.0109 14.9088C17.2399 15.508 18.316 16.3799 19.157 17.458C20.0234 16.3216 20.6068 14.9952 20.8589 13.5886C21.111 12.182 21.0244 10.7355 20.6065 9.36898C20.1886 8.00243 19.4512 6.75505 18.4555 5.73004C17.4598 4.70503 16.2343 3.93186 14.8804 3.47451C13.5265 3.01716 12.0832 2.88877 10.6699 3.09997C9.25652 3.31117 7.91379 3.85589 6.75277 4.68905C5.59175 5.52222 4.64581 6.61987 3.99323 7.8912C3.34065 9.16252 3.00018 10.571 3 12ZM12 21C9.93395 21.0031 7.93027 20.2923 6.328 18.988C6.97293 18.0647 7.83134 17.3109 8.83019 16.7907C9.82905 16.2705 10.9388 15.9992 12.065 16C13.1772 15.9991 14.2735 16.2636 15.2629 16.7714C16.2524 17.2793 17.1064 18.0159 17.754 18.92C16.1393 20.2667 14.1026 21.0029 12 21Z"
          fill={active ? "#20FFB0" : "#108C60"}
        />
      </svg>
    ),
  },
];

export const UserSidebar = ({ mobile = false }) => (
  <nav className="flex flex-col h-full">
    <div className={`${mobile ? "pt-6 pb-8 px-6" : "p-8"}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-white font-readex text-[28px] font-semibold tracking-tight">
          Gods<span className="text-[#20FFB0]">land</span>
        </h1>
      </motion.div>
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
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                active
                  ? "bg-[#0D3B2B] border border-[#20FFB0]/20"
                  : "hover:bg-[#0D3B2B]/50"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#20FFB0]"
                />
              )}
              <span className="flex-shrink-0">{link.icon(active)}</span>
              <span
                className={`font-readex text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "text-[#20FFB0]"
                    : "text-[#108C60] group-hover:text-[#20FFB0]/70"
                }`}
              >
                {link.label}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>

    <div className="p-4 mt-auto">
      <div className="rounded-xl border border-[#20FFB0]/10 bg-[#0A2A1E] p-4">
        <p className="text-[#20FFB0] font-readex text-xs font-semibold mb-1">
          Need help?
        </p>
        <p className="text-[#6B9E8B] font-readex text-xs leading-relaxed">
          Visit our support center anytime.
        </p>
        <button className="mt-3 w-full h-8 rounded-lg bg-[#20FFB0]/10 border border-[#20FFB0]/20 text-[#20FFB0] font-readex text-xs font-semibold hover:bg-[#20FFB0]/20 transition-colors duration-200">
          Get Support
        </button>
      </div>
    </div>
  </nav>
);

export default UserSidebar;
