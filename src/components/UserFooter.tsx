
const UserFooter = () => {
  return (
    <footer className="lg:ml-[230px] bg-black border-t border-[#00d32c]">
      <div className="max-w-[1200px] mx-auto py-10 px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-readex text-2xl font-semibold mb-3">
              Gods<span className="text-[#00d32c]">land</span>
            </h3>
            <p className="text-[#4A7A65] font-readex text-xs leading-relaxed mb-5">
              The premier marketplace for digital collectibles and NFTs. Trade
              with confidence.
            </p>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg border border-[#00d32c] hover:border-[#00d32c]/30 flex items-center justify-center transition-colors duration-200"
                >
                  <div className="w-3 h-3 rounded-full bg-[#00d32c]/50" />
                </button>
              ))}
            </div>
          </div>
          {[
            {
              title: "Menu",
              items: ["Home", "Explore", "Activity", "Popular NFTs"],
            },
            {
              title: "Quick Links",
              items: ["Help Center", "Partners", "Suggestions", "Newsletter"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-readex text-sm font-bold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="text-[#4A7A65] font-readex text-xs hover:text-[#00d32c] cursor-pointer transition-colors duration-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-white font-readex text-sm font-bold mb-4">
              Subscribe
            </h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-10 rounded-lg bg-[#0A2219] border border-[#1A4A35] px-3 pr-12 text-[#8DE0C3] font-readex text-xs outline-none focus:border-[#00d32c]/40 transition-colors duration-200"
              />
              <button className="absolute right-1 top-1 w-8 h-8 rounded-md bg-[#00d32c] flex items-center justify-center hover:bg-[#00d32c]/90 transition-colors duration-200">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M12.5396 0.0851111L0.329038 7.12957C-0.147793 7.40355 -0.0872009 8.06742 0.386996 8.26764L3.18739 9.44259L10.7561 2.77223C10.901 2.64314 11.1065 2.84072 10.9827 2.99088L4.63632 10.7229V12.8436C4.63632 13.4654 5.38714 13.7104 5.75595 13.2599L7.42882 11.2235L10.7113 12.5986C11.0854 12.7567 11.5122 12.5222 11.5807 12.1192L13.4775 0.738449C13.567 0.206295 12.9954 -0.178331 12.5396 0.0851111Z"
                    fill="#1F2217"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-[#00d32c] text-center">
          <p className="text-[#2A5040] font-readex text-xs">
            ©2024 Godsland NFT Market. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default UserFooter
