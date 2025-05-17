import { Request, Response } from "express";
import * as campaignModel from "../models/campaign.model";
import { successResponse, invalidResponse, notFoundResponse, internalErrorResponse } from "../utils/middlewares/response";

export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  const campaign = await campaignModel.createCampaign(req.body);
  if (campaign && "data" in campaign) {
    successResponse(res, "Campaign created successfully", campaign.data);
  } else {
    internalErrorResponse(res, "Something went wrong");
  }
};

export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  const { page, limit } = req.query;
  const campaigns = await campaignModel.getAllCampaigns(page, limit);
  if (campaigns && "data" in campaigns) {
    successResponse(res, "Campaign retrieved successfully", campaigns.data);
  } else {
    internalErrorResponse(res, "Something went wrong");
  }
};

export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const campaign = await campaignModel.findCampaignById(id);

  if (campaign && "data" in campaign) {
    successResponse(res, "Campaign retrieved successfully", campaign.data);
  } else if (campaign && "notFound" in campaign) {
    notFoundResponse(res, campaign.notFound);
  } else {
    internalErrorResponse(res, "Something went wrong");
  }
};

export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const campaign = await campaignModel.updateCampaign(id, req.body);

  if (campaign && "data" in campaign) {
    successResponse(res, "Campaign updated successfully", campaign.data);
  } else if (campaign && "notFound" in campaign) {
    notFoundResponse(res, campaign.notFound);
  } else if (campaign && "invalid" in campaign) {
    invalidResponse(res, campaign.invalid);
  } else {
    internalErrorResponse(res, "Something went wrong");
  }
};

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const campaign = await campaignModel.deleteCampaign(id);

  if (campaign && "data" in campaign) {
    successResponse(res, "Campaign deleted successfully", campaign.data);
  } else if (campaign && "notFound" in campaign) {
    notFoundResponse(res, campaign.notFound);
  } else {
    internalErrorResponse(res, "Something went wrong");
  }
};
