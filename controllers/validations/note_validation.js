const Joi = require("joi")


const note_validation = Joi.object({
	title: Joi.string().min(5),
	description: Joi.string().min(10)
})

module.exports = note_validation;
