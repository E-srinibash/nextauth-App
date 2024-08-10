import {connect} from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"

connect()

export async function GET(request:NextRequest) {
    //extract data from token

    try{
        const userId = await getDataFromToken(request);
    const user = await User.findOne({_id: userId}).select("-password");
    
    // if(!user){
    //     return NextResponse.json({
    //         message:"User not Found"
    //     })
    // }
    return NextResponse.json({
        message:"User found",
        data: user
    })
    }
    catch(error:any){
        return NextResponse.json(
            {error:error.message},
            {status:400});
    }
}