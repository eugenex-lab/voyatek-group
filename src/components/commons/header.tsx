import React, { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import SidebarMd from "@/components/commons/side-bar-md";
import SidebarMobile from "./side-bar-mobile";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => setIsSidebarOpen(true);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <header className="flex h-20 items-center gap-4 border-b px-6 lg:h-[90px] lg:px-10">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outlineSec"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={handleSidebarOpen} // Open sidebar
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SidebarMd />
          <SidebarMobile onClose={handleSidebarClose} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 w-full">
        <form>
          <div className="relative md:w-2/3 lg:w-1/3">
            <Input
              type="search"
              placeholder="Search..."
              className="relative w-full pl-3 shadow-none appearance-none bg-background"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </form>
      </div>

      <Button
        size="icon"
        variant={"ghost"}
        className="w-8 h-8 ml-auto shadow-none bg-inherit"
      >
        <Bell className="w-5 h-5" color="#333333" />
        <span className="sr-only">Toggle notifications</span>
      </Button>

      <Separator className="h-8" orientation="vertical" />

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {" "}
              <div className="flex items-center justify-center w-10 h-10 m-1 rounded-full">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full hover:bg-secondary/50"
                >
                  <Icon
                    icon="bxs:user"
                    width="17"
                    height="17"
                    className="text-primary/50"
                  />
                </Button>
              </div>
              <span className="hidden pl-2 text-muted-foreground md:block">
                Big Tech
              </span>{" "}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="w-[100px] p-4 py-2 space-y-1 flex flex-col justify-center items-center">
              <NavigationMenuLink className="text-muted-foreground hover:text-primary w-[100px] text-nowrap text-center text-sm">
                My Account
              </NavigationMenuLink>
              <Separator />
              <NavigationMenuLink className="text-sm text-center text-muted-foreground hover:text-primary">
                Settings
              </NavigationMenuLink>
              <Separator />
              <NavigationMenuLink className="text-sm text-center text-muted-foreground hover:text-primary">
                Support
              </NavigationMenuLink>
              <Separator />
              <NavigationMenuLink className="text-sm text-center text-muted-foreground hover:text-primary">
                Logout
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
