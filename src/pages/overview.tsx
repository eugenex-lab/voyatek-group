import BannerWithButton from "@/components/dashboard/banner-with-button";
import TripPlanner from "@/components/dashboard/trip-planner";
import FlightItinerary from "@/components/dashboard/flight-itinerary";
import HotelItinerary from "@/components/dashboard/hotels-itinerary";
import ActivityItinerary from "@/components/dashboard/activity-itinerary";

const Overview = () => {
  return (
    <div className="">
      <BannerWithButton imageUrl="https://res.cloudinary.com/deuhwohof/image/upload/v1733590423/voyateck/banner_uy9x1c.png" />
      <TripPlanner />

      <FlightItinerary />
      <HotelItinerary />
      <ActivityItinerary />
    </div>
  );
};

export default Overview;
