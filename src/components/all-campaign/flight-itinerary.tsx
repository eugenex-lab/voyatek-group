import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Trip Itineraries</h2>
        <p className="text-sm text-gray-500">
          Your trip itineraries are placed here
        </p>
      </div>

      {/* Flights Section */}
      <div className="mt-6">
        <Card className="bg-gray-100">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span>✈️ Flights</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              Add Flights
            </Button>
          </CardHeader>
          <CardContent>
            {flights.map((flight) => (
              <Card key={flight.id} className="mb-4">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-bold">{flight.airline}</h3>
                    <p className="text-sm text-gray-500">
                      {flight.flightNumber} ·{" "}
                      <Badge variant="outline" className="text-blue-600">
                        {flight.class}
                      </Badge>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{flight.departureTime}</p>
                    <p className="text-sm text-gray-500">{flight.date}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Duration: {flight.duration}
                    </p>
                    <Separator
                      orientation="horizontal"
                      className="my-1 bg-blue-500"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{flight.arrivalTime}</p>
                    <p className="text-sm text-gray-500">{flight.date}</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{flight.price}</p>
                  </div>
                </div>
                <Separator />
                <div className="p-4 text-sm text-gray-500">
                  <p className="mb-2">
                    <span className="font-bold">Facilities:</span>{" "}
                    {flight.facilities.join(", ")}
                  </p>
                  <div className="flex justify-between text-blue-500">
                    <Button variant="link" size="sm">
                      Flight details
                    </Button>
                    <Button variant="link" size="sm">
                      Price details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlightItinerary;
