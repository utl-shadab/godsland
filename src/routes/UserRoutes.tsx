import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import { Explore, UserHome,BuySell,Profile } from "../pages/user";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserHome />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buy-sell" element={<BuySell />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
