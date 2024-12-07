import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
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
import ThemeToggle from "./theme-toggle";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => setIsSidebarOpen(true);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <header className="flex h-20 items-center  border-b px-6 lg:h-[90px] lg:px-10 bg-foreground">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outlineSec"
            size="icon"
            className="w-12 h-12 mr-2 shrink-0 md:hidden"
            onClick={handleSidebarOpen} // Open sidebar
          >
            <Menu className="w-8 h-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SidebarMd />
          <SidebarMobile onClose={handleSidebarClose} />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 w-full gap-2 ">
        <img
          src={
            "https://res.cloudinary.com/deuhwohof/image/upload/v1733579583/voyateck/logoa_a2u7dd.svg"
          }
          alt="Logo"
          className="w-12 h-12"
        />
        <form className="hidden lg:flex">
          <div className="relative md:w-40 lg:w-64">
            <Input
              type="search"
              placeholder="Search..."
              className="relative w-full h-12 pl-10 shadow-none appearance-none bg-foreground"
            />
            <Search className="absolute w-5 h-5 text-black left-3 top-3 text-muted-foreground" />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-1">
        <Button
          size={"ghost"}
          variant={"ghost"}
          className="flex flex-col gap-1 shadow-none"
        >
          <Icon
            icon="octicon:home-24"
            width="30"
            height="30"
            className="md:w-5 md:h-5"
          />
          <span className="hidden md:block">Home</span>
        </Button>

        <Button
          size={"ghost"}
          variant={"ghost"}
          className="flex flex-col gap-1 shadow-none"
        >
          <Icon
            icon="stash:chart-pie"
            width="30"
            height="30"
            className="md:w-5 md:h-5"
          />
          <span className="hidden md:block">Dashboard</span>
        </Button>
        <Button
          size={"ghost"}
          variant={"ghost"}
          className="flex flex-col gap-1 shadow-none"
        >
          <Icon
            icon="ph:wallet-light"
            width="30"
            height="30"
            className="md:w-5 md:h-5"
          />
          <span className="hidden md:block">Wallet</span>
        </Button>

        <Button
          size={"ghost"}
          variant={"ghost"}
          className="flex flex-col gap-1 shadow-none"
        >
          <Icon
            icon="tabler:list-check"
            width="30"
            height="30"
            className="md:w-5 md:h-5"
          />
          <span className="hidden md:block">Plan a trip</span>
        </Button>
        <Button
          size={"ghost"}
          variant={"ghost"}
          className="flex flex-col gap-1 shadow-none"
        >
          <Icon
            icon="ph:hand-coins-light"
            width="30"
            height="30"
            className="md:w-5 md:h-5"
          />
          <span className="hidden md:block">Commission for life</span>
        </Button>
        <div className="items-center hidden lg:flex">
          <Separator className="mx-6 h-14" orientation="vertical" />

          <Button size={"sm"} className="mr-4">
            {" "}
            Subscribe
          </Button>

          <Button
            size={"ghost"}
            variant={"ghost"}
            className="flex flex-col gap-1 shadow-none"
          >
            <Icon
              icon="mdi-light:bell"
              width="30"
              height="30"
              className="md:w-5 md:h-5"
            />
            <span className="hidden md:block">Notification</span>
          </Button>

          <Button
            size={"ghost"}
            variant={"ghost"}
            className="flex flex-col gap-1 shadow-none"
          >
            <Icon
              icon="ph:basket"
              width="30"
              height="30"
              className="md:w-5 md:h-5"
            />
            <span className="hidden md:block">Carts</span>
          </Button>

          <Button
            size={"ghost"}
            variant={"ghost"}
            className="flex flex-col gap-1 shadow-none"
          >
            <Icon
              icon="ant-design:plus-square-outlined"
              width="30"
              height="30"
              className="md:w-5 md:h-5"
            />
            <span className="hidden md:block">Create</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {" "}
              <div className="flex items-center justify-center w-10 h-10 m-1 rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-secondary/50"
                >
                  <Icon
                    icon="bxs:user"
                    width="17"
                    height="17"
                    className="text-primary/50"
                  />

                  <img
                    src={
                      "https://res.cloudinary.com/deuhwohof/image/upload/v1733576059/voyateck/Ellipse_775_2x_zz3kks.png"
                    }
                    alt="Logo"
                    className=""
                  />
                </Button>
              </div>
              {/* <span className="hidden pl-2 text-muted-foreground md:block">
                Big Tech
              </span>{" "} */}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="w-[100px] p-4 py-2 space-y-1 flex flex-col justify-center items-center">
              <NavigationMenuLink className="text-black hover:text-primary w-[100px] text-nowrap text-center text-sm">
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
