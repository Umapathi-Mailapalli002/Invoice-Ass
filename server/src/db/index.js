import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectInstence = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB is connected !! DB HOST: ${connectInstence.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection field !!!", error);
    process.exit(1);
  }
};


export default connectDB;