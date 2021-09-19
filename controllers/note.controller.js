const conection = require("../database/DB_conection");
const { generic_exceptions } = require("../helpers/exceptions");
const note_validation = require("./validations/note_validation");

async function getNotes(req, res) {
	const sql = `SELECT n_id,n_title,n_description, u_id,u_name,u_email FROM Note LEFT JOIN User ON Note.n_authorID = User.u_id`;

	conection.query(sql, (err, result) => {
		if (err) throw err;

		let list = [];
		result.map((res) => {
			const data = {
				title: res.n_title,
				description: res.n_description,
				id: res.n_id,
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

	const sql = `SELECT n_id,n_title,n_description, u_id,u_name,u_email FROM Note LEFT JOIN User ON Note.n_authorID = User.u_id WHERE n_id = "${id}"`;

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
	const { title, description } = req.body;

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


async function mynotes(req,res){
}

async function deleteNote(req,res){
}

async function editNote(req,res){
}


module.exports = {
	getNotes,
	getOneNote,
	postNote,
	deleteNote,
	editNote,
	mynotes,
};
