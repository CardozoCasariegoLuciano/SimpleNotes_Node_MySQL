const token_validation = require("../middlewares/token_validation");
const routes = require("express").Router();
const {getNotes, getOneNote, postNote, deleteNote, editNote, mynotes} = require("../controllers/note.controller")

routes.route("/")
	.get(token_validation, getNotes)
	.post(token_validation,postNote)

routes.route("/mynotes")
	.get(token_validation,mynotes)

routes.route("/:id")
	.get(token_validation, getOneNote)
	.delete(token_validation, deleteNote)
	.put(token_validation, editNote)

module.exports = routes;
