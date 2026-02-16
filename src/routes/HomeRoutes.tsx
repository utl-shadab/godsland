import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import CreateNFT from "../pages/CreateNFT";
import ComingSoon from "../pages/ComingSoon";
import HomeLayout from "../layout/HomeLayout";
import CategoryPage from "../pages/CategoryPage";
import CollectionPage from "../pages/CollectionPage";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/market" element={<CategoryPage />} />
        <Route path="/market/:category" element={<CategoryPage />} />
        <Route path="/collection/:slug" element={<CollectionPage />} />
        <Route path="/create" element={<CreateNFT />} />
        <Route path="/explore" element={<CategoryPage />} />
        <Route path="/auction" element={<ComingSoon />} />
        <Route path="/club" element={<ComingSoon />} />
        <Route path="/collections" element={<ComingSoon />} />
        <Route path="/pages" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
