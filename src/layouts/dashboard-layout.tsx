import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Bell, Menu, Search, Plus } from "lucide-react";
import { Icon } from "@iconify/react";
import { navItems } from "@/lib/constants/nav-items"; // Import navItems
import HelpCard from "../components/help-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add state for tracking open/close
  const location = useLocation();

  const navItemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted md:block">
        <div className="flex flex-col h-full max-h-screen gap-2">
          <div className="flex h-20 items-center px-4 lg:h-[100px] lg:px-10">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img src={logo} alt="Logo" />
              <h3 className="font-bold bg-gradient-text text-gradient-text bg-clip-text">
                Scrutz
              </h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start p-2 space-y-3 text-sm font-medium lg:px-8 lg:pr-12">
              <Button className="flex items-center mt-2 mb-6 space-x-2 lg:mt-3">
                <Plus className="w-5 h-5 text-white" />
                <span>New Campaign</span>
              </Button>

              {navItems.map(({ to, icon, label, badge }) => (
                <motion.div
                  key={label}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={to}
                    className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                      location.pathname === to
                        ? "bg-white text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Icon icon={icon} className="w-5 h-5 font-bold" />
                    {label}
                    {badge && (
                      <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                        {badge}
                      </Badge>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
          <div className="p-4 mt-auto">
            <HelpCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-20  items-center gap-4 border-b  px-6 lg:h-[90px] lg:px-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center justify-center w-full gap-2 text-lg font-semibold"
                >
                  <img src={logo} alt="Logo" />
                  <span className="">
                    {" "}
                    <h3 className="font-extrabold bg-gradient-text text-gradient-text bg-clip-text">
                      Scrutz
                    </h3>
                  </span>
                </Link>
                <Button className="flex items-center mt-2 mb-6 space-x-2">
                  <Plus className="w-5 h-5 text-white" />
                  <span>New Campaign</span>
                </Button>
                {navItems.map(({ to, icon, label, badge }) => (
                  <Link
                    key={label}
                    to={to}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                      location.pathname === to
                        ? "bg-white text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon icon={icon} className="w-5 h-5 font-bold " />
                    {label}
                    {badge && (
                      <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                        {badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <HelpCard />
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 w-full">
            <form>
              <div className="relative md:w-2/3 lg:w-1/3">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="relative w-full pl-3 shadow-none appearance-none bg-background "
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </form>
          </div>
          <Button
            size="icon"
            className="w-8 h-8 ml-auto shadow-none bg-inherit"
          >
            <Bell className="w-5 h-5" color="#333333" />

            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Separator className="h-8 " orientation="vertical" />
          <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
            {" "}
            {/* Manage the open state */}
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 m-1 rounded-full tile-break">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Icon
                      icon="bxs:user"
                      width="17"
                      height="17"
                      className="text-muted"
                      color="#91acb4"
                    />
                  </Button>
                </div>
                <span className="pl-2">Big Tech</span>{" "}
                {/* Rotate chevron based on state */}
                <div className="relative flex items-center w-5">
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Icon
                      icon="gg:chevron-down"
                      className="w-6 h-8 text-primary"
                    />
                  </motion.div>
                </div>
              </div>
            </DropdownMenuTrigger>
            {/* Dropdown content */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }} // Adjust duration as needed
                  className="absolute right-0 z-50 mt-2 top-full" // Position dropdown menu
                >
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-muted-foreground hover:text-primary">
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-muted-foreground hover:text-primary">
                      Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-muted-foreground hover:text-primary">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenu>
        </header>
        <motion.main
          className="flex flex-col flex-1 gap-4 p-6 lg:gap-10 lg:p-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
