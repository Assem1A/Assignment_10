import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";
import { userModel } from "./model/user.model.js";
export const connectDataBase=async()=>{
try{
    
    await mongoose.connect(DB_URI)
    console.log("database connected succefully ✌️");
    await userModel.syncIndexes()
    
}
catch(err){console.log(err)}

}