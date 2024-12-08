import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Separator } from "../ui/separator";

const TripPlanner: React.FC = () => {
  return (
    <div className="py-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="">
          <div className="w-64 flex items-center gap-2 mb-1 text-sm text-[#7A4504] bg-[#FEF4E6] px-2 py-1 rounded justify-center ">
            <span className="flex items-center gap-1">
              <Icon icon="uil:calender" width="15" height="15" />
              21 March 2024
            </span>
            <span>→</span>
            <span>21 April 2024</span>
          </div>
          <h1 className="text-2xl font-bold text-secondary">
            Bahamas Family Trip
          </h1>
          <p className="text-sm text-gray-500 no-wrap">
            New York, United States of America{" "}
            <span className="text-muted-foreground/30"> |</span> Solo Trip
          </p>
        </div>
        {/* Profile and Settings */}
        <div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-[#E7F0FF] group-hover:text-white hover:text-white text-primary"
              width={"md"}
            >
              <Icon icon="iconoir:add-user" className="w-6 h-6 " />
            </Button>
            <Icon icon="bi:three-dots" className="w-8 h-8 text-secondary" />
          </div>
          <div className="flex items-center justify-center gap-0 pt-8">
            <Button
              variant="ghost"
              width={"sm"}
              size="icon"
              className="rounded-full hover:bg-secondary/50"
            >
              <img
                src={
                  "https://res.cloudinary.com/deuhwohof/image/upload/v1733604647/voyateck/box_mddzta.svg"
                }
                alt="Logo"
                className=""
              />
            </Button>
            <Separator className="w-8 p-[1px]" />
            <div className="flex items-center gap-2 p-1.5 border-2 rounded-full">
              <Icon
                icon="ph:gear-six-light"
                width="14"
                height="14"
                className="text-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid max-w-4xl grid-cols-1 gap-1 mt-6 md:grid-cols-3">
        {/* Activities Card */}
        <Card className="text-white bg-[#000031]">
          <CardHeader>
            <CardTitle className="text-white">Activities</CardTitle>
            <CardDescription className="text-white">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 *: rounded">
              Add Activities
            </Button>
          </CardContent>
        </Card>

        {/* Hotels Card */}
        <Card className="text-blue-900 bg-blue-100">
          <CardHeader>
            <CardTitle className="">Hotels</CardTitle>
            <CardDescription className="text-[#1D2433]">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="mt-4">
              Add Hotels
            </Button>
          </CardContent>
        </Card>

        {/* Flights Card */}
        <Card className="text-white bg-blue-500">
          <CardHeader>
            <CardTitle className="text-foreground">Flights</CardTitle>
            <CardDescription className="text-white">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant={"secondary"} className="mt-4 ">
              Add Flights
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TripPlanner;
