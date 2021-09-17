const jwt = require("jsonwebtoken");
const { token_exceptions } = require("../helpers/exceptions");

async function token_validation(req, res, next) {
	const token = req.headers.authorization;

	jwt.verify(token, process.env.token_seed, (err, decoded) => {
		if (err) {
			res.status(401).json(token_exceptions.no_valid_token(err));
			return;
		}
		req.user = decoded.data;
		next();
	});
}

module.exports = token_validation;
