import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateAccessToken = (claims) => {
	const accessToken = jwt.sign(
		claims,
		process.env.ACCESS_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME
		}
	);


	return accessToken;
}

const generateRefreshToken = () => {
	return crypto.randomBytes(32).toString('hex');
}

const getClaimsFromToken = (token) => {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {
		ignoreExpiration : true,
	});
}

export {
	generateAccessToken,
	generateRefreshToken,
	getClaimsFromToken
}