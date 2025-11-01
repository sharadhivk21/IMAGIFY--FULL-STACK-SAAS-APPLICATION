//connects express with mongo. code for that
import dotenv from "dotenv";

import mongoose from "mongoose";
dotenv.config();


const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("database connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}
export default connectDB;