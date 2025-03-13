"use server";
import { connectToDB } from "../mongoose";

import Users from "../models/users.model";

export async function getUsernameByEmail(email: string){
    try {
        await connectToDB();
        // console.log("Users Model:", Users);
        if (!Users) {
            throw new Error("Users model is undefined");
        }
        const user = await Users.findOne({ email });
        if (user) {
            return user.Username;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching username:", error);
        throw error;
    }
};

