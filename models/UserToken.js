import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
	UserId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	RefreshToken: {
		type: String,
		required: true,
	},
	RefreshTokenExpiryTime: {
		type: Date,
		default: Date.now,
		required: true,
	}
});

const UserToken = mongoose.model("UserToken", userTokenSchema);
export default UserToken;