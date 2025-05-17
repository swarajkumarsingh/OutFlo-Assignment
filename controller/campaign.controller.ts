import { Request, Response } from "express";
import * as campaignModel from "../models/campaign.model";

export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  const campaign = await campaignModel.createCampaign(req.body);
  if (campaign && "data" in campaign) {
    res.status(201).json({ success: true, data: campaign.data });
  } else {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  const { page, limit } = req.query;
  const campaigns = await campaignModel.getAllCampaigns(page, limit);
  if (campaigns && "data" in campaigns) {
    res.status(200).json({
      success: true,
      count: campaigns.data.length,
      data: campaigns.data,
    });
  } else {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const campaign = await campaignModel.findCampaignById(id);

  if (campaign && "data" in campaign) {
    res.status(200).json({ success: true, data: campaign.data });
  } else if (campaign && "notFound" in campaign) {
    res.status(404).json({ success: false, error: campaign.notFound });
  } else {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const campaign = await campaignModel.updateCampaign(id, req.body);

  if (campaign && "data" in campaign) {
    res.status(200).json({ success: true, data: campaign.data });
  } else if (campaign && "notFound" in campaign) {
    res.status(400).json({ success: false, error: campaign.notFound });
  } else if (campaign && "invalid" in campaign) {
    res.status(404).json({ success: false, error: campaign.invalid });
  } else {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const campaign = await campaignModel.deleteCampaign(id);

  if (campaign && "data" in campaign) {
    res.status(200).json({ success: true, data: campaign.data });
  } else if (campaign && "notFound" in campaign) {
    res.status(404).json({ success: false, error: campaign.notFound });
  } else {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
