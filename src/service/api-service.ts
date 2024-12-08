import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "";
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
        throw error.response.data;
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },

  async fetchCampaigns() {
    try {
      const response = await axios.get(`${BASE_URL}/api/Campaign`, {
        headers: {
          accept: "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in fetchCampaigns:", error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },

  async deleteCampaign(id: string) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/Campaign/${id}`, {
        headers: {
          accept: "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in deleteCampaign:", error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },

  async getCampaignById(id: string) {
    try {
      const response = await axios.get(`${BASE_URL}/api/Campaign/${id}`, {
        headers: {
          accept: "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in getCampaignById:", error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },

  async fetchActiveCampaigns() {
    try {
      const campaigns = await this.fetchCampaigns();
      const activeCampaignsCount = campaigns.filter(
        (campaign: { campaignStatus: string }) =>
          campaign.campaignStatus === "Active"
      ).length;
      return activeCampaignsCount; // Return the count instead of the array
    } catch (error: any) {
      console.error("Error in fetchActiveCampaigns:", error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },

  // Inside apiService

  async updateCampaignStatus(id: string, status: boolean) {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/CampaignStatus/${id}`,
        {
          id, // Pass the ID in the request body
          campaignStatus: status, // The new campaign status
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error in updateCampaignStatus:", error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
  },

  // Add this method to apiService
  async updateCampaign(id: number, data: any) {
    try {
      const response = await axios.put(`${BASE_URL}/api/Campaign/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in updateCampaign:", error);
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
