import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const apiService = {
  async createCampaign(data: any) {
    try {
      const response = await axios.post(`${BASE_URL}/api/Campaign`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in createCampaign:", error);
      if (error.response) {
        // If the error has a response, it's likely a server error
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },
};
