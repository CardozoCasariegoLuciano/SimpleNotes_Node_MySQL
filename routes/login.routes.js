const routes = require("express").Router();
const {login} = require("../controllers/login.controller")

routes.route("/")
	.post(login)

module.exports = routes
