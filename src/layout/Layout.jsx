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
        <header>
          <Navbar />
        </header>
      )}
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
