import {
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChartSpline,
  ChevronUp,
  Group,
  Home,
  List,
  Package,
  Package2,
  PackageCheck,
  PackagePlus,
  Settings,
  Signal,
  Star,
  Truck,
  User2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LogoPng from "../../../assets/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { Separator } from "@/components/ui/separator";

// Menu items.
const items = [
  {
    title: "Book a Parcel",
    url: "book-a-parcel",
    icon: PackagePlus,
    role: "user",
  },
  {
    title: "My Parcels",
    url: "my-parcels",
    icon: Package2,
    role: "user",
  },
  {
    title: "My Profile",
    url: "my-profile",
    icon: User2,
    role: "user",
  },
  {
    title: "My Delivery List",
    url: "my-delivery-list",
    icon: List,
    role: "deliveryMen",
  },
  {
    title: "My Reviews",
    url: "my-reviews",
    icon: Star,
    role: "deliveryMen",
  },
  {
    title: "Statistics",
    url: "statistics",
    icon: ChartSpline,
    role: "admin",
  },
  {
    title: "All Parcels",
    url: "all-parcels",
    icon: Package,
    role: "admin",
  },
  {
    title: "All Users",
    url: "all-users",
    icon: Users,
    role: "admin",
  },
  {
    title: "All Delivery Men",
    url: "all-delivery-men",
    icon: Truck,
    role: "admin",
  },
];

const Dashboard = () => {
  const { user, role } = useContext(AuthContext);
  const roleBasedItems = items.filter((item) => item.role === role);

  return (
    <>
      {roleBasedItems && roleBasedItems.length > 0 && (
        <Navigate to={`/dashboard/${roleBasedItems[0].url}`} replace />
      )}
      <section className="bg-base-200 w-full grid grid-cols-[.1fr_1fr_.02fr] items-start gap-6 md:gap-10 lg:gap-12">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <Link to="/" className="flex items-center gap-1">
                <div className="w-7 lg:w-10">
                  <img className="rounded-full" src={LogoPng} alt="proyojon" />
                </div>
                <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-bold">
                  Proyojon
                </h2>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {roleBasedItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                    <Separator />
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/">
                          <Home />
                          <span>Home</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton className="h-auto">
                        <div className="flex gap-4">
                          <div className="w-12 h-12">
                            <img
                              className="rounded-xl"
                              src={user?.photoURL}
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {user?.displayName}
                            </h3>
                            <p className="text-xs font-medium">{user?.email}</p>
                          </div>
                        </div>
                        <ChevronUp className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      className="w-[--radix-popper-anchor-width] bg-base-100 rounded-lg border shadow-md pl-6 py-6"
                    >
                      <DropdownMenuItem>
                        <Link>Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link>Billing</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link>Sign out</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarTrigger />
        </SidebarProvider>
        <div className="mt-6 md:mt-10 lg:my-12 px-6 pt-6 pb-12 bg-base-100 rounded-lg shadow-md">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
