import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/range-date-range-picker";
import { Plus } from "lucide-react";
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/json/empty-state.json"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const lottieRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(false);
    }, 6000); // Pause after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setIsPlaying(true);
  };


  const handleMouseLeave = () => {
    setIsPlaying(false);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-campaign");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        <h1 className="text-lg font-bold md:text-2xl text-primary">Overview</h1>
        <div>
          <DatePickerWithRange />
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 border rounded-lg shadow-sm">
        <div
          className="flex flex-col items-center gap-1 text-center lg:mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Lottie
            loop={isPlaying}
            animationData={lottieJson}
            play={isPlaying}
            ref={lottieRef}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
          />

          <p className="text-sm font-semibold text-black">
            No activity yet. Create a new campaign to get started
          </p>
          <Button
            onClick={handleClick}
            className="flex items-center mt-2 mb-6 space-x-2 lg:mt-3"
          >
            <Plus className="w-5 h-5 text-white" />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Overview;
