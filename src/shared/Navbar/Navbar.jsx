import { Button } from "@/components/ui/button";
import { BellDotIcon, HomeIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoPng from "../../assets/images/logo.png";

const Navbar = () => {
  return (
    <>
      <nav className="border-b shadow-sm">
        <div className="main-container py-3 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-7 lg:w-10">
              <img src={LogoPng} alt="proyojon" />
            </div>
            <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-bold">
              Proyojon
            </h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
            {/* Home page */}
            <NavLink to="/" className="flex items-center gap-1">
              <HomeIcon className="w-4 h-4" />
              Home
            </NavLink>
            {/* Notification */}
            <div className="hover:text-primary cursor-pointer">
              {" "}
              <BellDotIcon />
            </div>
            {/* Login */}
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
