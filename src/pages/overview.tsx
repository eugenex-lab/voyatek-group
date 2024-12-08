import BannerWithButton from "@/components/all-campaign/banner-with-button";
import TripPlanner from "@/components/all-campaign/trip-planner";
import FlightItinerary from "@/components/all-campaign/flight-itinerary";
import HotelItinerary from "@/components/all-campaign/hotels-itinerary";
import ActivityItinerary from "@/components/all-campaign/activity-itinerary";

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
