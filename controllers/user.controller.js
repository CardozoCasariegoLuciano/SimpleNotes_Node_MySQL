const connection = require("../database/DB_conection");
const bycrypt = require("bcrypt");
const {
	user_exceptions,
	generic_exceptions,
} = require("../helpers/exceptions");
const user_validation = require("./validations/user_validation");

async function getAllUsers(req, res) {
	sql = "SELECT u_name, u_email, u_id FROM User";

	connection.query(sql, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
}

async function getOneUser(req, res) {
	const id = req.params.id;

	if (isNaN(id)) {
		res.status(400).json(generic_exceptions.invalid_id);
		return;
	}
	const sql = `SELECT u_id, u_email, u_name FROM User WHERE u_id = ${id}`;

	connection.query(sql, (err, result) => {
		if (err) throw err;

		if (result.length === 0) {
			res.json([]);
			return;
		}

		res.json(result[0]);
	});
}

async function deleteUser(req, res) {
	const id = req.params.id;

	if (isNaN(id)) {
		res.status(400).json(generic_exceptions.invalid_id);
		return;
	}

	const sql = `DELETE FROM User WHERE u_id = ${id}`;

	connection.query(sql, (err, result) => {
		if (err) throw err;

		if (result.affectedRows === 0) {
			res.json(user_exceptions.user_not_found);
			return;
		}

		res.json("Usualio eliminado correctamente");
	});
}

async function editUser(req, res) {
	const id = req.params.id;

	const { name, password } = req.body;

	if (isNaN(id)) {
		res.status(400).json(generic_exceptions.invalid_id);
		return;
	}

	const { error, value } = user_validation.validate({ name, password });

	if (!error) {
		const encriptedPass = bycrypt.hashSync(
			value.password,
			Number(process.env.bcrypt_salt)
		);
		const sql = `UPDATE User SET u_name = "${value.name}", u_password = "${encriptedPass}" WHERE u_id = "${id}"`;

		connection.query(sql, (err, result) => {
			if (err) throw err;

			if (result.affectedRows === 0) {
				res.status(400).json(user_exceptions.user_not_found);
				return;
			}

			res.json("Usuario modificado");
		});
	} else {
		res.status(400).json(generic_exceptions.badDataTypes(error));
	}
}

module.exports = {
	getAllUsers,
	getOneUser,
	deleteUser,
	editUser,
};
