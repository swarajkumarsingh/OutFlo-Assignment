import Campaign, { CampaignStatus } from "../db/models/Campaign";
import neatMongoose from "../utils/mongoose-neat";
import * as utils from "../utils/utils";

export const getAllCampaigns = async (page: any, limit: any): Promise<any> => {
  try {
    const mongoLimit = parseInt(limit) || 8;
    const mongoSkip = page ? (parseInt(page) - 1) * mongoLimit : 0;
    const query = [
      {
        $match: { status: { $ne: CampaignStatus.DELETED } },
      },
      { $sort: { _id: -1 as const } },
      { $skip: mongoSkip },
      { $limit: mongoLimit },
      {
        $project: {
          name: 1,
          status: 1,
          createAt: 1,
        },
      },
    ];
    const results = await Campaign.aggregate(query);
    const data = results.map((doc) => neatMongoose(doc));
    return { data };
  } catch (error) {
    return { error };
  }
};

export const findCampaignById = async (id: string): Promise<any> => {
  return new Promise(async (resolve) => {
    try {
      const valid = utils.isValidMongoId(id);
      if (!valid) {
        return resolve({ notFound: "Campaign not found" });
      }

      const campaign = await Campaign.findOne({
        _id: id,
        status: { $ne: CampaignStatus.DELETED },
      });

      if (!campaign) {
        return resolve({ notFound: "Campaign not found" });
      }

      resolve({ data: campaign.toObject() });
    } catch (error) {
      resolve({ error: "Server Error" });
    }
  });
};

export const createCampaign = async (body: any): Promise<any> => {
  return new Promise(async (resolve) => {
    try {
      const { _id, createdAt, updatedAt, ...filteredBody } = body;

      const campaign = await Campaign.create(filteredBody);
      if (!campaign) resolve({ error: "Server Error" });

      resolve({ data: campaign.toObject() });
    } catch (error) {
      console.log("error", error);
      resolve({ error: "Server Error" });
    }
  });
};

export const updateCampaign = async (id: string, updateData: any): Promise<any> => {
  return new Promise(async (resolve) => {
    try {
      const valid = utils.isValidMongoId(id);
      if (!valid) {
        return resolve({ notFound: "Campaign not found" });
      }

      if (updateData.status && ![CampaignStatus.ACTIVE, CampaignStatus.INACTIVE].includes(updateData.status)) {
        return resolve({
          invalid: "Status can only be updated to ACTIVE or INACTIVE",
        });
      }

      const fieldsToExclude = ["_id", "createdAt", "updatedAt", "__v"];
      fieldsToExclude.forEach((field) => delete updateData[field]);

      const campaign = await Campaign.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!campaign) {
        return resolve({ notFound: "Campaign not found" });
      }

      resolve({ data: campaign.toObject() });
    } catch (error) {
      resolve({ error: "Server Error" });
    }
  });
};

export const deleteCampaign = async (id: string): Promise<any> => {
  return new Promise(async (resolve) => {
    try {
      const valid = utils.isValidMongoId(id);
      if (!valid) {
        return resolve({ notFound: "Campaign not found" });
      }

      const campaign = await Campaign.findByIdAndUpdate(id, { status: CampaignStatus.DELETED }, { new: true });

      if (!campaign) {
        return resolve({ notFound: "Campaign not found" });
      }

      resolve({ data: campaign.toObject() });
    } catch (error) {
      resolve({ error: "Server Error" });
    }
  });
};
