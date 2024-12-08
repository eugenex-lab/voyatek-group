import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { apiService } from "@/service/api-service";
import FlightCard from "./flight-card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { handleError } from "@/service/error-handler";

const FlightItinerary: React.FC = () => {
  const [fromCity, setFromCity] = useState<{
    city: string;
    code: string;
  } | null>(null);
  const [toCity, setToCity] = useState<{ city: string; code: string } | null>(
    null
  );
  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const [isOpenTo, setIsOpenTo] = useState(false);
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
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdownFrom = () => {
    setIsOpenFrom(!isOpenFrom);
  };

  const toggleDropdownTo = () => {
    setIsOpenTo(!isOpenTo);
  };

  const handleSelectCity = (
    item: { city: string; code: string },
    type: "from" | "to"
  ) => {
    if (type === "from") {
      setFromCity(item);
    } else {
      setToCity(item);
    }
    setIsOpenFrom(false);
    setIsOpenTo(false);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length >= 3) {
      try {
        const query = e.target.value;
        const results = await apiService.searchFlightDestinations(query);

        if (results.status) {
          const filteredCities = (results.data as any[])
            .filter((item) => item.type === "CITY")
            .map((item) => ({
              city: item.name,
              code: item.code,
            }));
          setDropdownItems(filteredCities);
        }
      } catch (error) {
        const errorMsg = handleError(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMsg,
        });
      }
    } else {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenFrom(false);
        setIsOpenTo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const flightData = [
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
              <div className="hidden gap-2 pl-4 lg:flex">
                {/* From Dropdown */}
                <div className="flex items-center justify-center ">
                  <div className="relative h-full group">
                    <button
                      onClick={toggleDropdownFrom}
                      className=" justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 w-[200px] h-full hidden xl:inline-flex"
                    >
                      <div className="flex flex-row items-center w-full h-full gap-2">
                        <Icon
                          icon="mingcute:flight-takeoff-line"
                          width="24"
                          height="24"
                          className="text-muted-foreground"
                        />
                        <div className="flex flex-col items-start">
                          <span className="mr-2 text-muted-foreground">
                            From
                          </span>
                          <span className="mr-2 ">
                            {fromCity ? (
                              <>
                                <span className="mr-2 ">{fromCity.city}</span>
                                <Badge>{fromCity.code}</Badge>
                              </>
                            ) : (
                              <span className="mr-2">Enter City</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* From Dropdown Menu */}
                    {isOpenFrom && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 z-50 p-1 mt-2 space-y-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearch}
                          placeholder="Search location"
                          className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
                        />
                        {dropdownItems.map((item, index) => (
                          <a
                            onClick={() => handleSelectCity(item, "from")}
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

                {/* To Dropdown */}
                <div className="flex items-center justify-center ">
                  <div className="relative group">
                    <button
                      onClick={toggleDropdownTo}
                      className=" justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 w-[200px] hidden xl:flex"
                    >
                      <div className="flex flex-row items-center w-full gap-2">
                        <Icon
                          icon="mingcute:flight-takeoff-line"
                          width="24"
                          height="24"
                          className="text-muted-foreground"
                        />
                        <div className="flex flex-col items-start">
                          <span className="mr-2 text-muted-foreground">To</span>
                          <span className="mr-2 ">
                            {toCity ? (
                              <>
                                <span className="mr-2 ">{toCity.city}</span>
                                <Badge>{toCity.code}</Badge>
                              </>
                            ) : (
                              <span className="mr-2">Enter City</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* To Dropdown Menu */}
                    {isOpenTo && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 z-50 p-1 mt-2 space-y-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearch}
                          placeholder="Search location"
                          className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
                        />
                        {dropdownItems.map((item, index) => (
                          <a
                            onClick={() => handleSelectCity(item, "to")}
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
                <DatePicker
                  selectedDate={departureDate}
                  setSelectedDate={setDepartureDate}
                  placeholder="Pick Departure"
                />
                <DatePicker
                  selectedDate={returnDate}
                  setSelectedDate={setReturnDate}
                  placeholder="Pick Return"
                />

                <Button width={"md"}>Search</Button>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="max-h-[600px] flex  ">
            <div className="w-full overflow-y-scroll">
              {flightData.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlightItinerary;

const DatePicker = ({
  selectedDate,
  setSelectedDate,
  placeholder,
}: {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  placeholder: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[200px] justify-start text-left font-normal border-none bg-white border-muted-foreground rounded-md shadow-lg ring-1 ring-black ring-opacity-5 space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <div className="flex space-x-1.5 items-center">
            <CalendarIcon />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
