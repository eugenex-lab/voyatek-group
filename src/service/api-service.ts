import axios from "axios";

const RAPIDAPI_HOST = "booking-com15.p.rapidapi.com";
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || ""; // Add this to your `.env` file

export const apiService = {
  async searchFlightDestinations(query: string) {
    try {
      const response = await axios.get(
        `https://${RAPIDAPI_HOST}/api/v1/flights/searchDestination`,
        {
          params: { query },
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
            accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error in searchFlightDestinations:", error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },
};
