import { Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import HomeRoutes from "./HomeRoutes";

const IndexRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomeRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />
    </Routes>
  );
};

export default IndexRoutes;
