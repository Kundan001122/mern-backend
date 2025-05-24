import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

if (!process.env.MONGODB_URL) {
    throw new Error(
        "Please provide MONGODB_URL in the dotEnv File"
    )
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected database")

    } catch (error) {
        console.log("MongoDb connect error", error)
        process.exit(1)
    }
}

export default connectDB