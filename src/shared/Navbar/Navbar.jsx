import { Button } from "@/components/ui/button";
import { BellDotIcon, HomeIcon, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import LogoPng from "../../assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useContext(AuthContext);
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
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="hover:outline hover:outline-1 hover:outline-primary hover:outline-offset-2">
                      <AvatarImage src={user?.photoURL} />
                      <AvatarFallback>
                        {user?.displayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/dashboard">
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="text-primary">
                      <LogOut /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <NavLink to="/login">
                <Button>Login</Button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
