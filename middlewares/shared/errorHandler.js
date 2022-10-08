import createHttpError from "http-errors";

// 404 not found handler
export function notFoundHandler(req, res, next) {
  next(createHttpError(404, "Your requested content was not found!"));
}

// default error handler
export function errorHandler(err, req, res, next) {
	console.log(err.message);
	var error =
	  process.env.NODE_ENV === "development" ? err : { message: err.message };
  
	res.status(err.status || 500);
  
	res.json(error);
}
