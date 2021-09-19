const routes = require("express").Router();
const {getAllUsers, getOneUser, deleteUser, editUser} = require("../controllers/user.controller")
const token_validation = require("../middlewares/token_validation")

routes.route("/")
	.get(token_validation,getAllUsers)


routes.route("/:id")
	.get(token_validation, getOneUser)
	.delete(token_validation, deleteUser)
	.put(token_validation, editUser)

module.exports = routes
