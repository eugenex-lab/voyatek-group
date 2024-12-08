import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { Progress } from "../ui/progress";
import { apiService } from "@/service/api-service";

const FlightItinerary: React.FC = () => {
  const [query, setQuery] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedCity, setSelectedCity] = useState<{
    city: string;
    code: string;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownItems, setDropdownItems] = useState([
    { city: "Lagos", code: "LOS" },
    { city: "Ibadan", code: "IBA" },
    { city: "Abuja", code: "ABU" },
    { city: "London", code: "LHR" },
    { city: "New York", code: "JFK" },
    { city: "Paris", code: "CDG" },
    { city: "Tokyo", code: "HND" },
    { city: "Dubai", code: "DXB" },
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCity = (item: { city: string; code: string }) => {
    setSelectedCity(item);
    setIsOpen(false);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length >= 3) {
      // Trigger search after 3 characters
      try {
        const query = e.target.value;
        const results = await apiService.searchFlightDestinations(query);

        if (results.status) {
          const filteredCities = results.data
            .filter((item) => item.type === "CITY") // Only include cities
            .map((item) => ({
              city: item.name,
              code: item.code,
            }));
          setDropdownItems(filteredCities);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    } else {
      // Reset to default values when search term is less than 3 characters
      setDropdownItems([
        { city: "Lagos", code: "LOS" },
        { city: "Ibadan", code: "IBA" },
        { city: "Abuja", code: "ABU" },
        { city: "London", code: "LHR" },
        { city: "New York", code: "JFK" },
        { city: "Paris", code: "CDG" },
        { city: "Tokyo", code: "HND" },
        { city: "Dubai", code: "DXB" },
      ]);
    }
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const flight = [
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
        <Card className="px-2 bg-[#F0F2F5] dark:bg-[#1F2937]">
          <CardHeader className="flex flex-row items-center justify-between pt-0">
            <CardTitle className="flex items-center gap-2">
              <Icon icon="ph:airplane-in-flight" width="24" height="24" />
              <span>Flights</span>
              <div className="pl-4">
                <div className="flex items-center justify-center ">
                  <div className="relative group">
                    {/* Dropdown Button */}
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 w-[200px]"
                    >
                      <div className="flex flex-row items-center w-full gap-2">
                        <Icon
                          icon="mingcute:flight-takeoff-line"
                          width="24"
                          height="24"
                          className="text-muted-foreground"
                        />
                        <div className="flex flex-col items-start">
                          <span className="mr-2 text-muted-foreground">
                            From{" "}
                          </span>
                          <span className="mr-2 ">
                            {selectedCity ? (
                              <>
                                <span className="mr-2 ">
                                  {selectedCity.city}
                                </span>
                                <Badge>{selectedCity.code}</Badge>
                              </>
                            ) : (
                              <span className="mr-2">Enter City</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 z-50 p-1 mt-2 space-y-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        {/* Search Input */}
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearch}
                          placeholder="Search location"
                          className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
                        />

                        {/* Filtered Dropdown Items */}
                        {dropdownItems.map((item, index) => (
                          <a
                            onClick={() => handleSelectCity(item)}
                            key={index}
                            href="#"
                            className="flex justify-between px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-gray-100 active:bg-blue-100"
                          >
                            {item.city} <Badge>{item.code}</Badge>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardTitle>
            <Button variant="secondary" width={"md"}>
              Add Flights
            </Button>
          </CardHeader>

          <CardContent className="max-h-[600px] flex  ">
            <div className="w-full overflow-y-scroll">
              {flight.map((flight) => (
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
