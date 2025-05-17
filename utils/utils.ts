import { Types } from "mongoose";

export function isValidMongoId(id: any) {
  return Types.ObjectId.isValid(id);
}
