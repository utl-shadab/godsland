import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import CreateNFT from "../pages/CreateNFT";
import ComingSoon from "../pages/ComingSoon";
import HomeLayout from "../layout/HomeLayout";
import CategoryPage from "../pages/CategoryPage";
import CollectionPage from "../pages/CollectionPage";
import AuctionPage from "../pages/AuctionPage";
import AuctionItemPage from "../pages/AuctionItemPage";
import MintPage from "../pages/MintPage";
import DropPage from "../pages/DropPage";

import Marketplace from "../pages/Marketplace";
import CollectionCategoryPage from "../pages/CollectionCategoryPage";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/collections" element={<CategoryPage />} />
        {/* repolace with new colllections display page instead of same category */}
        <Route path="/collections/:category" element={<CollectionCategoryPage  />} />
        <Route path="/collection/:category/:slug" element={<CollectionPage />} />

        <Route path="/market/:category" element={<CategoryPage />} />
        <Route path="/create" element={<CreateNFT />} />
        <Route path="/explore" element={<CategoryPage />} />

        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/auction/:slug" element={<AuctionItemPage />} />

        <Route path="/launchpad/:slug" element={<MintPage />} />
        <Route path="/launchpad" element={<DropPage />} />
   
        <Route path="/club" element={<ComingSoon />} />
        <Route path="/collections" element={<ComingSoon />} />
        <Route path="/pages" element={<ComingSoon />} />
        <Route path="/*" element={<Navigate to="/" />} /> 
        {/* change with the 404 page */}
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
