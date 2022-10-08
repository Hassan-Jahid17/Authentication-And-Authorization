import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	UserName: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
		unique: true,
	},
	Password: {
		type: String,
		required: true,
	},
	Roles: {
		type: [String],
		enum: ["user", "admin", "super_admin"],
		default: ["user"],
	}
});

const User = mongoose.model("User", userSchema);

export default User;