import Footer from "@/shared/Footer/Footer";
import Navbar from "@/shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      {location.pathname.includes("/dashboard") ? (
        <> </>
      ) : (
        <header className="fixed top-0 left-0 right-0 z-50 bg-base-100/70 backdrop-blur-md">
          <Navbar />
        </header>
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
