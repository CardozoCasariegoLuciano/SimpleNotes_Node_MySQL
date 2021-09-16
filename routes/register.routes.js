const router = require("express").Router()
const {register} = require("../controllers/register.controller")

router.route("/")
	.post(register)


module. exports = router
