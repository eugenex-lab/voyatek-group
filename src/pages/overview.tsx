import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/json/empty-state.json";
import { useNavigate } from "react-router-dom";
import { useLottieAnimation } from "@/lib/utils/lottie-animation";
import BannerWithButton from "@/components/all-campaign/banner-with-button";
import TripPlanner from "@/components/all-campaign/trip-planner";
import FlightItinerary from "@/components/all-campaign/flight-itinerary";

const Overview = () => {
  const lottieRef = useRef(null);
  const { isPlaying, handleMouseEnter, handleMouseLeave } =
    useLottieAnimation(12000);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-campaign");
  };

  return (
    <div className="bg-white ">
      <BannerWithButton imageUrl="https://res.cloudinary.com/deuhwohof/image/upload/v1733590423/voyateck/banner_uy9x1c.png" />
      <TripPlanner />

      <FlightItinerary />
      <div className="flex items-center justify-center flex-1 border rounded-lg shadow-sm">
        <div
          className="flex flex-col items-center gap-1 p-6 text-center lg:mb-20"
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

          <p className="mb-4 text-sm font-semibold text-black">
            No activity yet. Create a new campaign to get started
          </p>
          <Button
            onClick={handleClick}
            className="flex items-center justify-center mt-2 mb-6 space-x-2 lg:mt-3"
          >
            <Plus className="w-5 h-5 text-white" />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
