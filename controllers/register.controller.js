const connection = require("../database/DB_conection");
const { user_exceptions, slq_exceptions } = require("../helpers/exceptions");
const user_Validation = require("./validations/user_validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {
	const { name, password, repited_password, email } = req.body;

	if (password != repited_password) {
		res.status(400).json(user_exceptions.passwords_doesnot_match);
		return;
	}

	const { error, value } = user_Validation.validate({
		name,
		password,
		email,
	});

	if (!error) {
		const sql = `INSERT INTO User SET ?`;

		const newUser = {
			u_name: value.name,
			u_password: bcrypt.hashSync( value.password, Number(process.env.bcrypt_salt)),
			u_email: value.email,
		};

		connection.query(sql, newUser, (err, result) => {
			if (slq_exceptions.isUser_repited(err)) {
				res.status(400).json(user_exceptions.user_already_exists(email));
				return;
			}

			if (err) throw err;

			jwToken = jwt.sign(
				{
					data: {
						name: newUser.u_name,
						email: newUser.u_email,
						id: result.insertId,
					},
				},
				process.env.token_seed
			);

			res.json({
				Mensaje: "Usuario agregado",
				Usuario: { name: newUser.u_name, email: newUser.u_email, id: result.insertId },
				token: jwToken,
			});
		});
	} else {
		res.status(400).json(user_exceptions.badDataTypes(error));
	}
}

module.exports = {
	register,
};
