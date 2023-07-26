import mongoose from "mongoose";
import {config} from "./config";

type ConnectDatabase = () => Promise<mongoose.Mongoose>;

export const connectDatabase : ConnectDatabase  = async ()  => {
    const mongoConnection = await mongoose.connect(config.mongoose.url, config.mongoose.options);

    mongoConnection.connection.on("error", (error: Error)=>{
        console.log(error)
    })
    return mongoConnection;
}


module.exports = {
    connectDatabase
}