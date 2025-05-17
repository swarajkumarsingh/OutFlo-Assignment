import express from "express";
import * as controller from "../controller/campaign.controller";

const router = express.Router();

router.route("/campaign").get(controller.getCampaigns).post(controller.createCampaign);

router.route("/campaign/:id").get(controller.getCampaignById).put(controller.updateCampaign).delete(controller.deleteCampaign);

export default router;
