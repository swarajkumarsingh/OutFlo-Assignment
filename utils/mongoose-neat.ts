import { Document } from "mongoose";

function neatMongoose(doc: Document | Record<string, any>): Record<string, any> {
  const obj = doc instanceof Document ? doc.toObject() : { ...doc };

  obj.id = obj._id;

  const fieldsToDelete = ["__v", "_id"];
  for (const field of fieldsToDelete) {
    delete obj[field];
  }

  return obj;
}

export default neatMongoose;