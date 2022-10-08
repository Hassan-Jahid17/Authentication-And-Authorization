import mongoose, { mongo } from "mongoose";

const dbConnect = () => {
	const connectionParams = {
		useNewUrlParser: true,
    	useUnifiedTopology: true
	};

	mongoose.connect(process.env.MONGO_CONNECTION_STRING).on;

	mongoose.connection.on("error", (error) => {
		console.log("Error while connecting to database :" + err);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongodb connection disconnected");
	});
}

export default dbConnect;