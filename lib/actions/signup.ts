"use server";
import { connectToDB } from "../mongoose";
import Users from "../models/users.model";

export async function Signup(email: string, password: string) {
    try {
        await connectToDB();

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User already exists!" };
        } else {
            const newUser = new Users({
                email,
                password: Users.prototype.generateHash(password),
            });

            await newUser.save();
            return { success: true, message: "User Registration successful!" };
        }
    } catch (error: any) {
        console.error("Signup Failed:", error);
        return { success: false, message: `Signup Failed: ${error.message}` };
    }
}