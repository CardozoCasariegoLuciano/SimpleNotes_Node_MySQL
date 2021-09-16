const connection = require("../database/DB_conection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_validation = require("./validations/user_validation");
const { user_exceptions } = require("../helpers/exceptions");

async function login(req, res) {
	const { email, password } = req.body;

	const { error, value } = user_validation.validate({ email, password });

	if (!error) {
		const sql = `SELECT * FROM User WHERE u_email = "${value.email}"`;

		connection.query(sql, (err, result) => {
			if (err) throw err;

			const isLoginOk =
				result.length > 0 &&
				bcrypt.compareSync(password, result[0].u_password);
			if (!isLoginOk) {
				res.status(400).json(user_exceptions.loginFailed);
				return;
			}

			jwToken = jwt.sign(
				{
					data: {
						id: result[0].u_id,
						name: result[0].u_name,
						email: result[0].u_email,
					},
				},
				process.env.token_seed
			);

			res.json({
				Mensaje: "Usuario logeado exitosamente",
				User: {
					id: result[0].u_id,
					name: result[0].u_name,
					email: result[0].u_email,
				},
				token: jwToken,
			});
		});
	} else {
		res.status(400).json(user_exceptions.badDataTypes(error));
	}
}

module.exports = {
	login,
};
