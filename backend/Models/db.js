import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl)
  .then(() => {
    console.log("MongoDb connected!");
  })
  .catch((error) => {
    console.log("MongoDb connection error: ", error);
  });
