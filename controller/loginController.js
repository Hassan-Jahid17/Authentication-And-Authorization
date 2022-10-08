import { loginValidation, signUpValidation } from "../utilities/validationSchema.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {generateAccessToken, generateRefreshToken} from "../utilities/TokenService.js";
import UserToken from "../models/UserToken.js";
import { addMinutes } from "date-fns";
import createHttpError from "http-errors";


async function signup(req, res, next) {
	
	try{
		const {error} = signUpValidation(req.body);
		if(error) {
			return next(createHttpError(400, error.details[0].message));
		}
	
		const user = await User.findOne({
			Email: req.body.Email
		})
	
		if(user) {
			return next(createHttpError(400, "User with given email already exist"))
		}
	
		const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
		const hashPassword = await bcrypt.hash(req.body.Password, salt);
	
		await new User({...req.body, Password: hashPassword}).save();
	
		res.status(201).json({
			message: "Account created sucessfully"
		})
	}catch(err) {
		console.log(err);
		return next(createHttpError(500, {
			error: true,
			message: "Internal Server Error"
		}))
	}
}

async function login(req, res, next) {
	try {
		const {value, error} = loginValidation(req.body);

		if(error) {
			return next(createHttpError(400, error.details[0].message));
		}
	
		const user = await User.findOne({
			Email: req.body.Email
		});
		if(!user) {
			return next(createHttpError(401, "Invalid email or password"));
		}
	
		const isVerifiedPassword = await bcrypt.compare(
			req.body.Password,
			user.Password
		);
	
		if(!isVerifiedPassword) {
			return next(createHttpError(401, "Invalid email or password"));
		}
	
		const accessToken = generateAccessToken({
			Email: req.body.Email,
			UserName: user.UserName
		});
	
		const refreshToken = generateRefreshToken();
	
		await UserToken.updateOne(
			{UserId : user._id},
			{$set : {
				RefreshToken: refreshToken,
				RefreshTokenExpiryTime: addMinutes(Date.now(), process.env.REFRESH_TOKEN_EXPIRY_TIME)
			}},
			{upsert: true}
		);
	
		res.status(200).json({
			AccessToken: accessToken,
			RefreshToken: refreshToken,
			message: "Logged in sucessfully",
		});
	}catch(err) {
		console.log(err);
		return next(500, "Internal Server Error");
	}
}

export {signup, login};