import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import CollectionDetails from "../pages/CollectionDetails";
import CreateNFT from "../pages/CreateNFT";
import ComingSoon from "../pages/ComingSoon";
import HomeLayout from "../layout/HomeLayout";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/market" element={<Explore />} />
        <Route path="/market/:category" element={<Explore />} />
        <Route
          path="/market/:category/:collectionId"
          element={<CollectionDetails />}
        />
        <Route path="/create" element={<CreateNFT />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/collections/:slug" element={<CollectionDetails />} />
        <Route path="/auction" element={<ComingSoon />} />
        <Route path="/club" element={<ComingSoon />} />
        <Route path="/collections" element={<ComingSoon />} />
        <Route path="/pages" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
