import express from "express";
import { body, param } from "express-validator";
import * as controller from "../controller/campaign.controller";
import { requestValidator } from "../utils/middlewares/express-validator";

const router = express.Router();

router.route("/campaigns").get(controller.getCampaigns);

router
  .route("/campaigns")
  .post(
    [
      body("name", "Campaign name is required").isLength({ min: 1, max: 300 }),
      body("description", "Campaign description is required").isLength({ min: 1, max: 3000 }),
      body("status", "Status should be active or inactive").isIn(["active", "inactive"]).optional(),
      body("accountIDs", "accountIDs name is optional").optional(),
      body("leads", "leads name is optional").optional(),
      requestValidator,
    ],
    controller.createCampaign
  );

router.get("/campaigns/:id", [param("id", "Invalid campaign ID").isMongoId(), requestValidator], controller.getCampaignById);
router.put("/campaigns/:id", controller.updateCampaign);
router.delete("/campaigns/:id", [param("id", "Invalid campaign ID").isMongoId(), requestValidator], controller.deleteCampaign);

export default router;
