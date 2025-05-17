import mongoose, { Document, Schema } from "mongoose";

export enum CampaignStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export interface ICampaign extends Document {
  name: string;
  description: string;
  status: CampaignStatus;
  leads: string[];
  accountIDs: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Campaign name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Campaign description is required"],
    },
    status: {
      type: String,
      enum: Object.values(CampaignStatus),
      default: CampaignStatus.ACTIVE,
    },
    leads: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.every((url) => url.includes("linkedin.com/in/"));
        },
        message: "All leads must be valid LinkedIn profile URLs",
      },
    },
    accountIDs: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model<ICampaign>("Campaign", CampaignSchema);
