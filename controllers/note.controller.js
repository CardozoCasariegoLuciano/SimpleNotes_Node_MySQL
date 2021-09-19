const conection = require("../database/DB_conection");
const {
	generic_exceptions,
	note_exceptions,
} = require("../helpers/exceptions");
const note_validation = require("./validations/note_validation");

async function getNotes(req, res) {
	const sql = `SELECT n_id,n_title,n_description,n_createdAt, u_id,u_name,u_email FROM Note LEFT JOIN User ON Note.n_authorID = User.u_id`;

	conection.query(sql, (err, result) => {
		if (err) throw err;

		let list = [];
		result.map((res) => {
			const data = {
				title: res.n_title,
				description: res.n_description,
				id: res.n_id,
				createdAt: res.n_createdAt,
				author: {
					authorID: res.u_id,
					name: res.u_name,
					mail: res.u_email,
				},
			};
			list.push(data);
		});

		res.json(list);
	});
}

async function getOneNote(req, res) {
	const id = req.params.id;

	if (isNaN(id)) {
		res.status(400).json(generic_exceptions.invalid_id);
		return;
	}

	const sql = `SELECT n_id,n_title,n_description,n_createdAt, u_id,u_name,u_email FROM Note LEFT JOIN User ON Note.n_authorID = User.u_id WHERE n_id = "${id}"`;

	conection.query(sql, (err, result) => {
		if (err) throw err;

		if (result.length === 0) {
			res.json([]);
			return;
		}

		const data = {
			title: result[0].n_title,
			description: result[0].n_description,
			id: result[0].n_id,
			createdAt: result[0].n_createdAt,
			author: {
				authorID: result[0].u_id,
				name: result[0].u_name,
				mail: result[0].u_email,
			},
		};
		res.json(data);
	});
}

async function postNote(req, res) {
	const { title = "default title", description = "default description" } =
		req.body;

	const { error, value } = note_validation.validate({ title, description });

	if (!error) {
		const user = req.user;

		const sql = `INSERT INTO Note SET ?`;

		const newNote = {
			n_title: value.title,
			n_description: value.description,
			n_authorID: user.id,
		};
		conection.query(sql, newNote, (err, result) => {
			if (err) throw err;

			console.log(result);
			res.json(newNote);
		});
	} else {
		res.status(400).json(generic_exceptions.badDataTypes(error));
	}
}

async function mynotes(req, res) {
	const me = req.user;

	const sql = `SELECT * FROM Note WHERE n_authorID = "${me.id}"`;

	conection.query(sql, (err, result) => {
		if (err) throw err;

		res.json(result);
	});
}

async function deleteNote(req, res) {
	const id = req.params.id;

	if (isNaN(id)) {
		res.status(400).json(generic_exceptions.invalid_id);
		return;
	}

	const sql = `DELETE FROM Note WHERE n_id = "${id}"`;

	conection.query(sql, (err, result) => {
		if (err) throw err;

		if (result.affectedRows === 0) {
			res.status(400).json(note_exceptions.note_not_found);
			return;
		}

		res.json("Nota eliminada");
	});
}

async function editNote(req, res) {
	const id = req.params.id;
	if (isNaN(id)) {
		res.status(400).json(generic_exceptions.invalid_id);
		return;
	}

	const { title = "default title", description = "default description" } =
		req.body;

	const { error, value } = note_validation.validate({ title, description });

	if (!error) {
		const sql = `UPDATE Note SET ? WHERE n_id = "${id}"`;

		const newData = {
			n_title: value.title,
			n_description: value.description,
		};

		conection.query(sql, newData, (err, result) => {
			if (err) throw err;

			if (result.affectedRows === 0) {
				res.status(400).json(note_exceptions.note_not_found);
				return;
			}
			res.json("Nota modificada");
		});
	} else {
		res.status(400).json(generic_exceptions.badDataTypes(error));
	}
}

module.exports = {
	getNotes,
	getOneNote,
	postNote,
	deleteNote,
	editNote,
	mynotes,
};
