
// // Define the campaign data type
// interface CampaignData {
//   campaignName: string;
//   campaignDescription?: string;
//   startDate: string; // You can use Date if you handle date conversion
//   endDate?: string; // You can use Date if you handle date conversion
//   digestCampaign: boolean;
//   linkedKeywords: string[];
//   dailyDigest?: string;
// }

// /**
//  * Creates a new campaign.
//  * @param {CampaignData} data - The campaign data.
//  * @returns {Promise<any>} - The response data.
//  * @throws {Error} - Throws an error if the request fails.
//  */
// export const createCampaign = async (data: CampaignData): Promise<any> => {
//   return postRequest("/campaigns", data);
// };
