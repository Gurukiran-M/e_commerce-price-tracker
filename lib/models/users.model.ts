import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash the password
usersSchema.methods.generateHash = function (password: string) {
    return bcrypt.hashSync(password, 8);
};

// Validate password
usersSchema.methods.validPassword = function (password: string) {
    return bcrypt.compareSync(password, this.password);
};

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;