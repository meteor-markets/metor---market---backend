import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from "../enums/status";
import logger from "../helper/logger";
import { DEFAULT_BORROW, DEFAULT_SUPPLY, assets } from "../helper/constants";

const options = {
  collection: "user",
  timestamps: true,
};

const userModel = new Schema(
  {
    walletAddress: { type: String },
    userType: {
      type: String,
      enum: [userType.ADMIN, userType.USER],
      default: userType.USER,
    },
    status: {
      type: String,
      enum: [status.ACTIVE, status.BLOCK, status.DELETE],
      default: status.ACTIVE,
      supply: { type: Number, default: DEFAULT_SUPPLY },
      borrow: { type: Number, default: DEFAULT_BORROW },
    },
    supplyBalance: { type: Number, default: 0 },
    borrowBalance: { type: Number, default: 0 },
    netAPY: { type: Number, default: 0 },
    borrowLimit: { type: Number, default: 0 },
    assets: {type: Array, default: assets}
  },
  options
);
userModel.plugin(mongoosePaginate);
userModel.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("user", userModel);


