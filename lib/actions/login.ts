"use server";
import { connectToDB } from "../mongoose";

import Users from "../models/users.model";

export async function Login(email:String,Password:String){
    try{
        await connectToDB();

        const user=await Users.findOne({email });
        
        if (!user){
            return {success:false,message: "User Not found!!"};
        }
        
        if (!user.validPassword(Password)) {
            return {success:false,message: "Incorrect Password"};
        }

        return {success:true,message: "Login Successful !!"};

    }
    catch (error: any) {
        console.error("Login Failed:", error);
        return { success: false, message: `Login Failed: ${error.message}` };
      }
}