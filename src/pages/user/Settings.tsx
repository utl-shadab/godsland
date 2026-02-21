import { useState, useEffect, useRef } from "react";
import {
  User,
  Wallet,
  Bell,
  Gavel,
  Save,
  Copy,
  Check,
  ExternalLink,
  Shield,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  Mail,
} from "lucide-react";
import { gsap } from "gsap";

const NOTIFICATION_OPTIONS = [
  { id: "outbid", label: "Outbid Alerts", description: "When someone outbids you on an auction" },
  { id: "wins", label: "Bid Wins", description: "When you win an auction" },
  { id: "ending", label: "Auction Ending", description: "When your watched auctions are about to end" },
  { id: "listings", label: "New Listings", description: "When new items are listed in followed collections" },
  { id: "sales", label: "Sales Notifications", description: "When your listed items are sold" },
  { id: "offers", label: "Offer Alerts", description: "When someone makes an offer on your NFT" },
];

const AUCTION_ACTIVITY = [
  { title: "Luxury Ape #182", status: "Leading", price: "1.24 ETH", time: "2h ago", statusColor: "text-neon-green" },
  { title: "Golden Watch #44", status: "Outbid", price: "0.88 ETH", time: "5h ago", statusColor: "text-amber-400" },
  { title: "Space Runner #09", status: "Won", price: "2.10 ETH", time: "1d ago", statusColor: "text-blue-400" },
  { title: "Crystal Gem #27", status: "Ended", price: "0.55 ETH", time: "3d ago", statusColor: "text-gray-500" },
];

const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-neon-green" : "bg-white/10"
      }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"
        }`}
    />
  </button>
);

const Settings = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const [displayName, setDisplayName] = useState("CryptoKing");
  const [username, setUsername] = useState("@cryptoking");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("Collector and trader since 2024. Focused on luxury and art NFTs.");

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    outbid: true,
    wins: true,
    ending: true,
    listings: false,
    sales: true,
    offers: true,
  });

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const walletAddress = "0xdf8B4C520e1234ab...d9A0";
  const fullAddress = "0xdf8B4C520e1234ab567890cdef123456789d9A0";

  const toggleNotification = (id: string) =>
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 1500);
  };

  useEffect(() => {
    if (!pageRef.current) return;
    const sections = pageRef.current.querySelectorAll(".settings-section");
    gsap.fromTo(
      sections,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto py-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-neon-green text-xs font-semibold uppercase tracking-widest">
            Account
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-semibold">
            Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your profile, wallet, and preferences.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="h-10 px-6 rounded-xl bg-neon-green text-black text-sm font-bold uppercase tracking-wider hover:bg-[#00ff36] active:scale-[0.97] transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_0_15px_rgba(0,211,44,0.15)]"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <Check size={16} />
              Saved!
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Stats Row */}
      <div className="settings-section grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {[
          { label: "Owned NFTs", value: "148", icon: User },
          { label: "Active Bids", value: "6", icon: Gavel },
          { label: "Bid Results", value: "12", icon: Shield },
          { label: "Live Auctions", value: "4", icon: Globe },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-4 md:p-5 hover:border-neon-green/20 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon size={14} className="text-gray-600" />
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest">
                {item.label}
              </p>
            </div>
            <p className="text-white text-xl md:text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* Profile Card */}
        <div className="settings-section rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-neon-green/10 flex items-center justify-center">
              <User size={18} className="text-neon-green" />
            </div>
            <div>
              <h2 className="text-white text-base font-semibold">Profile</h2>
              <p className="text-gray-500 text-xs">Update your display info</p>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-green/30 to-neon-green/5 border border-neon-green/20 flex items-center justify-center">
              <User size={28} className="text-neon-green" />
            </div>
            <div>
              <button className="text-xs text-neon-green font-semibold hover:underline">
                Upload Photo
              </button>
              <p className="text-gray-600 text-[10px] mt-0.5">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="CryptoKing"
                className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@cryptoking"
                className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/10 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 transition-all"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 transition-all resize-none"
              />
              <p className="text-gray-600 text-[10px] mt-1 text-right">
                {bio.length}/200
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="settings-section rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-neon-green/10 flex items-center justify-center">
              <Wallet size={18} className="text-neon-green" />
            </div>
            <div>
              <h2 className="text-white text-base font-semibold">Wallet</h2>
              <p className="text-gray-500 text-xs">Connected accounts</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Connected wallet */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_6px_rgba(0,211,44,0.5)]" />
                  <span className="text-neon-green text-xs font-semibold uppercase tracking-wider">
                    Connected
                  </span>
                </div>
                <span className="text-gray-600 text-[10px]">Primary</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-mono">{walletAddress}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    title="Copy address"
                  >
                    {copied ? (
                      <Check size={14} className="text-neon-green" />
                    ) : (
                      <Copy size={14} className="text-gray-400" />
                    )}
                  </button>
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" title="View on explorer">
                    <ExternalLink size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
              <p className="text-white text-xl font-bold mt-1 font-mono">
                {showBalance ? "14.50 ETH" : "••••••"}
              </p>
              <p className="text-gray-600 text-xs mt-0.5">
                {showBalance ? "≈ $43,500.00 USD" : ""}
              </p>
            </div>

            <button className="w-full h-11 rounded-xl border border-neon-green/30 text-neon-green text-sm font-semibold hover:bg-neon-green/5 transition-colors">
              Manage Wallets
            </button>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="settings-section rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-neon-green/10 flex items-center justify-center">
              <Bell size={18} className="text-neon-green" />
            </div>
            <div>
              <h2 className="text-white text-base font-semibold">Notifications</h2>
              <p className="text-gray-500 text-xs">Stay updated on your activity</p>
            </div>
          </div>

          {/* Email toggle */}
          <div className="flex items-center justify-between py-3 border-b border-white/[0.06] mb-4">
            <div>
              <p className="text-white text-sm font-medium">Email Notifications</p>
              <p className="text-gray-600 text-[10px]">Receive alerts via email</p>
            </div>
            <ToggleSwitch checked={emailNotifications} onChange={setEmailNotifications} />
          </div>

          <div className="space-y-1">
            {NOTIFICATION_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className="flex items-center justify-between py-3 rounded-lg hover:bg-white/[0.02] px-2 -mx-2 transition-colors"
              >
                <div>
                  <p className="text-white text-sm">{opt.label}</p>
                  <p className="text-gray-600 text-[10px]">{opt.description}</p>
                </div>
                <ToggleSwitch
                  checked={notifications[opt.id]}
                  onChange={() => toggleNotification(opt.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Auction Activity Card */}
        <div className="settings-section rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-neon-green/10 flex items-center justify-center">
              <Gavel size={18} className="text-neon-green" />
            </div>
            <div>
              <h2 className="text-white text-base font-semibold">Auction Activity</h2>
              <p className="text-gray-500 text-xs">Current and recent bids</p>
            </div>
          </div>

          <div className="space-y-2">
            {AUCTION_ACTIVITY.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green/10 to-transparent flex items-center justify-center">
                    <Gavel size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-semibold ${item.statusColor}`}>
                        {item.status}
                      </span>
                      <span className="text-gray-600 text-[10px]">• {item.time}</span>
                    </div>
                  </div>
                </div>
                <span className="text-white text-sm font-medium">{item.price}</span>
              </div>
            ))}
          </div>

          <button className="w-full h-11 mt-4 rounded-xl border border-neon-green/30 text-neon-green text-sm font-semibold hover:bg-neon-green/5 transition-colors">
            View All Bids
          </button>
        </div>

        {/* Preferences (Full width) */}
        <div className="settings-section lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-neon-green/10 flex items-center justify-center">
              <Globe size={18} className="text-neon-green" />
            </div>
            <div>
              <h2 className="text-white text-base font-semibold">Preferences</h2>
              <p className="text-gray-500 text-xs">Customize your experience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Theme */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon size={14} className="text-gray-400" /> : <Sun size={14} className="text-amber-400" />}
                  <span className="text-white text-sm font-medium">Dark Mode</span>
                </div>
                <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
              </div>
              <p className="text-gray-600 text-[10px]">Toggle between light and dark theme</p>
            </div>

            {/* Currency Display */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Display Currency
              </label>
              <div className="relative">
                <select className="w-full h-10 rounded-lg bg-white/[0.03] border border-white/10 px-3 pr-8 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-neon-green/50 transition-all">
                  <option value="ETH" className="bg-black">ETH</option>
                  <option value="USD" className="bg-black">USD</option>
                  <option value="EUR" className="bg-black">EUR</option>
                </select>
                <Globe size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Language
              </label>
              <div className="relative">
                <select className="w-full h-10 rounded-lg bg-white/[0.03] border border-white/10 px-3 pr-8 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-neon-green/50 transition-all">
                  <option value="en" className="bg-black">English</option>
                  <option value="hi" className="bg-black">हिन्दी</option>
                  <option value="es" className="bg-black">Español</option>
                  <option value="fr" className="bg-black">Français</option>
                </select>
                <Globe size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
