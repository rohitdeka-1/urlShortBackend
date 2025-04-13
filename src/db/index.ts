import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async() => {
    try{

        const con = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("DB connected")
    }
    catch(error){
        console.log("Error in connecting db",error)
    }
}

export default connectDB;