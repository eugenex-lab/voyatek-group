import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { Progress } from "../ui/progress";

const FlightItinerary: React.FC = () => {
  const flights = [
    {
      id: 1,
      airline: "American Airlines",
      flightNumber: "AA-829",
      class: "First Class",
      departureTime: "08:35",
      arrivalTime: "09:55",
      date: "Sun, 20 Aug",
      duration: "1h 45m",
      departureCode: "LOS",
      arrivalCode: "SIN",
      price: "₦123,450.00",
      facilities: [
        "Baggage: 20kg, Cabin Baggage: 8kg",
        "In flight entertainment",
        "In flight meal",
        "USB Port",
      ],
    },
    // Duplicate data for example purposes
    {
      id: 2,
      airline: "American Airlines",
      flightNumber: "AA-829",
      class: "First Class",
      departureTime: "08:35",
      arrivalTime: "09:55",
      date: "Sun, 20 Aug",
      duration: "1h 45m",
      departureCode: "LOS",
      arrivalCode: "SIN",
      price: "₦123,450.00",
      facilities: [
        "Baggage: 20kg, Cabin Baggage: 8kg",
        "In flight entertainment",
        "In flight meal",
        "USB Port",
      ],
    },
    {
      id: 2,
      airline: "American Airlines",
      flightNumber: "AA-829",
      class: "First Class",
      departureTime: "08:35",
      arrivalTime: "09:55",
      date: "Sun, 20 Aug",
      duration: "1h 45m",
      departureCode: "LOS",
      arrivalCode: "SIN",
      price: "₦123,450.00",
      facilities: [
        "Baggage: 20kg, Cabin Baggage: 8kg",
        "In flight entertainment",
        "In flight meal",
        "USB Port",
      ],
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-secondary">Trip Itineraries</h2>
        <p className="text-sm text-muted-foreground">
          Your trip itineraries are placed here
        </p>
      </div>

      {/* Flights Section */}
      <div className="mt-6">
        <Card className="px-2 bg-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pt-0">
            <CardTitle className="flex items-center gap-2">
              <Icon icon="ph:airplane-in-flight" width="24" height="24" />
              <span>Flights</span>
            </CardTitle>
            <Button variant="secondary" width={"md"}>
              Add Flights
            </Button>
          </CardHeader>

          <CardContent className="max-h-[600px] flex  ">
            <div className="w-full overflow-y-scroll">
              {flights.map((flight) => (
                <Card
                  key={flight.id}
                  className="flex justify-between py-0 mb-4 "
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <h5 className="text-xl font-bold">{flight.airline}</h5>
                        <p className="text-sm text-muted-foreground">
                          {flight.flightNumber} ·{" "}
                          <Badge variant="outline" className="bg-[#0A369D]">
                            {flight.class}
                          </Badge>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {flight.departureTime}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {flight.date}
                        </p>
                      </div>
                      <div className="space-y-1.5 text-center">
                        <div className="flex items-center justify-between w-96">
                          <Icon icon="mingcute:flight-takeoff-line" />
                          <p className="text-sm text-muted-foreground">
                            Duration: {flight.duration}
                          </p>
                          <Icon icon="mingcute:flight-land-line" />
                        </div>

                        <Progress value={33} />

                        <div className="flex items-center justify-between w-96">
                          <h5 className="font-bold text-[18px]">
                            {flight.departureCode}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Direct
                          </p>
                          <h5 className="font-bold text-[18px]">
                            {flight.arrivalCode}
                          </h5>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {flight.arrivalTime}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {flight.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-[28px] font-bold">{flight.price}</p>
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
                      <div className="flex items-center-start items-c text-primary">
                        <Button
                          variant="link"
                          size="icon"
                          width={"md"}
                          className="justify-start px-0"
                        >
                          Flight details
                        </Button>
                        <Button
                          variant="link"
                          size="icon"
                          width={"md"}
                          className="justify-start px-0"
                        >
                          Price details
                        </Button>
                      </div>

                      <Button
                        variant="link"
                        size="icon"
                        width={"md"}
                        className="justify-end px-0 "
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlightItinerary;
