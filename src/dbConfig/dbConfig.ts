import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        
        const connection = mongoose.connection.on("connected",()=>{
           console.log("MongoDB connected");   
        })

        connection.on("error",(error)=>{
            console.log("MongoDB connection error, please make sure db is up and running" + error);
            process.exit();
        })

    }
    catch(error){
        console.log("Something went wrong while connecting to DB");
        console.log(error);
                
    }
}