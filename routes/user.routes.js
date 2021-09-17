const routes = require("express").Router();
const {getAllUsers} = require("../controllers/user.controller")
const token_validation = require("../middlewares/token_validation")

routes.route("/")
	.get(token_validation,getAllUsers)

module.exports = routes
