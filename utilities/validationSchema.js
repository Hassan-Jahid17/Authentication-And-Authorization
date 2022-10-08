import Joi from "joi";


const signUpValidation = (userModel) => {
	const schema = Joi.object({
		UserName: Joi.string().required().label("User Name"),
		Email: Joi.string().email().required().label("Email"),
		Password: Joi.string().min(4).max(8).required().label("Password"),
	})

	return schema.validate(userModel);
}

const loginValidation = (userModel) => {
	const schema = Joi.object({
		Email: Joi.string().email().required().label("Email"),
		Password: Joi.string().min(4).max(8).required().label("Password"),
	});

	return schema.validate(userModel);
}

const validaionForRefreshToken = (tokenModel) => {
	const schema = Joi.object({
		AccessToken: Joi.string().required().label("AccessToken"),
		RefreshToken: Joi.string().required().label("RefreshToken")
	});

	return schema.validate(tokenModel);
}

export {
	signUpValidation,
	loginValidation,
	validaionForRefreshToken,
}