import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import { Explore, UserHome, BuySell, Profile } from "../pages/user";
import MyOrdersPage from "../pages/MyOrdersPage";
import OrderDetailPage from "../pages/OrderDetailPage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserHome />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buy-sell" element={<BuySell />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
