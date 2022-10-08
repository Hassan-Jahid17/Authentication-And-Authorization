import { getTime } from "date-fns";
import User from "../models/User.js";
import UserToken from "../models/UserToken.js";
import {generateAccessToken, generateRefreshToken, getClaimsFromToken} from "../utilities/TokenService.js";
import { validaionForRefreshToken } from "../utilities/validationSchema.js";
import { addMinutes } from "date-fns";
import createHttpError from "http-errors";


async function refresh(req, res, next) {
	try{
		const {error} = validaionForRefreshToken(req.body);
		if(error) {
			return next(createHttpError(400, error.details[0].message));
		}
	
		const claims = getClaimsFromToken(req.body.AccessToken);
		console.log(claims);
	
		if(!claims || !claims.Email) {
			return next(createHttpError(400, "Token Not Valid"));
		}
	
		const user = await User.findOne({
			Email: claims.Email
		});
		console.log(user);
		
		if(!user || !user._id) {
			return next(createHttpError(400, "Token not Valid. User Not Found"));
		}
	
		const userTokenInfo = await UserToken.findOne({
			UserId: user._id,
		});
		console.log(userTokenInfo);
	
		if(!userTokenInfo || !userTokenInfo.RefreshToken || userTokenInfo.RefreshToken !== req.body.RefreshToken || getTime(userTokenInfo.RefreshTokenExpiryTime) <= getTime(Date.now()) ) {
			return next(createHttpError(400, "Invalid Client Request"));
		}
	
		const accessToken = generateAccessToken({
			Email: claims.Email,
			UserName: claims.UserName
		});
		const refreshToken = generateRefreshToken();
	
		await UserToken.updateOne(
			{UserId : user._id},
			{$set : {
				RefreshToken: refreshToken
			}},
			{upsert: true}
		);
	
		res.status(200).json({
			AccessToken: accessToken,
			RefreshToken: refreshToken,
			message: "AccessToken Refresh Successfully",
		});
	}catch(err) {
		console.log(err);
		return next(createHttpError(500, {
			error: true,
			message: "Internal Server Error " + err.message
		}))
	}
}

async function revoke(req, res, next) {

}

export {
	refresh,
	revoke,
}