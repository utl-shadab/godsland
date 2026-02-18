import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import useScrollToTop from "../hooks/useScrollToTop";

const HomeLayout = () => {
  useScrollToTop();
  return (
    <main className="custom-scrollbar">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default HomeLayout;
