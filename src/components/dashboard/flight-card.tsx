import React from "react";
import { Icon } from "@iconify/react";
import { Progress } from "../ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  class: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  duration: string;
  departureCode: string;
  arrivalCode: string;
  price: string;
  facilities: string[];
}

const FlightCard: React.FC<{ flight: Flight }> = ({ flight }) => {
  return (
    <Card key={flight.id} className="flex justify-between py-0 mb-4 ">
      <div className="w-full">
        <div className="flex items-center justify-between p-4">
          <div>
            <h5 className="text-xl font-bold">{flight.airline}</h5>
            <p className="flex items-center text-sm text-muted-foreground">
              {flight.flightNumber} ·{" "}
              <Badge className="bg-[#0A369D]">{flight.class}</Badge>
            </p>
          </div>
          <div className="hidden text-center lg:block">
            <p className="text-lg font-bold">{flight.departureTime}</p>
            <p className="text-sm text-muted-foreground">{flight.date}</p>
          </div>
          <div className="space-y-1.5 text-center hidden xl:block">
            <div className="flex items-center justify-between w-96">
              <Icon icon="mingcute:flight-takeoff-line" />
              <p className="text-sm text-muted-foreground">
                Duration: {flight.duration}
              </p>
              <Icon icon="mingcute:flight-land-line" />
            </div>

            <Progress value={33} />

            <div className="flex items-center justify-between w-96">
              <h5 className="font-bold text-[18px]">{flight.departureCode}</h5>
              <p className="text-sm text-muted-foreground">Direct</p>
              <h5 className="font-bold text-[18px]">{flight.arrivalCode}</h5>
            </div>
          </div>
          <div className="hidden text-center lg:block">
            <p className="text-lg font-bold">{flight.arrivalTime}</p>
            <p className="text-sm text-muted-foreground">{flight.date}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{flight.price}</p>
          </div>
        </div>
        <Separator />
        <div className="p-4 text-sm text-muted-foreground">
          <p className="mb-2">
            <span className="font-bold">Facilities:</span>{" "}
            {flight.facilities.join(", ")}
          </p>
        </div>
        <Separator />

        <div className="flex justify-between p-4 text-sm text-muted-foreground">
          <div className="flex items-center items-center-start text-primary">
            <Button
              variant="link"
              size="icon"
              width={"md"}
              className="justify-start w-24 px-0"
            >
              Flight details
            </Button>
            <Button
              variant="link"
              size="icon"
              width={"md"}
              className="justify-start w-24 px-0"
            >
              Price details
            </Button>
          </div>

          <Button
            variant="link"
            size="icon"
            width={"md"}
            className="justify-end hidden w-24 px-0 md:block"
          >
            Edit details
          </Button>
        </div>
      </div>
      <Button
        className="w-6 bg-[#FBEAE9] rounded-none "
        variant={"destructive"}
      >
        X
      </Button>
    </Card>
  );
};

export default FlightCard;
