import express from "express";
import { config } from "dotenv";
import dbConnect from "./database/connection/dbConnect.js";
import { errorHandler, notFoundHandler } from "./middlewares/shared/errorHandler.js";
import router from "./router/router.js";
import cors from "cors";

const app = express();

// Environment Variable setup
config();

// database connection
dbConnect();

//handing cors
app.use(cors({
	origin: "http://localhost:3000"
}))

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Router
app.use('/', router);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`app listening to port ${process.env.PORT}`);
});