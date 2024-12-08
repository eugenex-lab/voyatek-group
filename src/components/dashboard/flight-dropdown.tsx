import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { apiService } from "@/service/api-service";

interface City {
  city: string;
  code: string;
}

interface FlightDropdownProps {
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
}

const FlightDropdown: React.FC<FlightDropdownProps> = ({
  selectedCity,
  setSelectedCity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownItems, setDropdownItems] = useState<City[]>([
    { city: "Lagos", code: "LOS" },
    { city: "Ibadan", code: "IBA" },
    { city: "Abuja", code: "ABU" },
    { city: "London", code: "LHR" },
    { city: "New York", code: "JFK" },
    { city: "Paris", code: "CDG" },
    { city: "Tokyo", code: "HND" },
    { city: "Dubai", code: "DXB" },
  ]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCity = (item: City) => {
    setSelectedCity(item);
    setIsOpen(false);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length >= 3) {
      try {
        const query = e.target.value;
        const results = await apiService.searchFlightDestinations(query);
        if (results.status) {
          const filteredCities = results.data
            .filter((item: any) => item.type === "CITY")
            .map((item: any) => ({
              city: item.name,
              code: item.code,
            }));
          setDropdownItems(filteredCities);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
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
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
      >
        <div className="flex flex-row items-center gap-2">
          <Icon
            icon="mingcute:flight-takeoff-line"
            width="24"
            height="24"
            className="text-muted-foreground"
          />
          <span className="mr-2">From</span>
          {selectedCity ? (
            <div className="flex flex-col items-start">
              <span>{selectedCity.city}</span>
              <Badge>{selectedCity.code}</Badge>
            </div>
          ) : (
            <span>Enter City</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 p-1 mt-2 bg-white rounded-md shadow-lg"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search location"
            className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md"
          />
          {dropdownItems.map((item, index) => (
            <a
              onClick={() => handleSelectCity(item)}
              key={index}
              href="#"
              className="flex justify-between px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-gray-100"
            >
              {item.city} <Badge>{item.code}</Badge>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightDropdown;
