import axios from "axios";

// Base URL (without complete URI)
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
      console.error("Error while creating campaign:", error);
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong while creating the campaign"
      );
    }
  },
};
