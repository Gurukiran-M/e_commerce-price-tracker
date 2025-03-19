"use server";
import { connectToDB } from "../mongoose";
import Users from "../models/users.model";
import { checkEmail } from "./checkEmail";

export async function Signup(email: string, password: string, Username: string) {
    try {
        await connectToDB();

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User already exists!" };
        } else {
            const isValid = await checkEmail(email);
            if (isValid) {
                const newUser = new Users({
                    email,
                    password: Users.prototype.generateHash(password),
                    Username,
                });
                await newUser.save();
                return { success: true, message: "User Registration successful!" };
            }
            else{
                return { success: false, message: `Invalid email ❌,Please enter a valid email` };
            }
        }
    } catch (error: any) {
        console.error("Signup Failed:", error);
        return { success: false, message: `Signup Failed: ${error.message}` };
    }
}