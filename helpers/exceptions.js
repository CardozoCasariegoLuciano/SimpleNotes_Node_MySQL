const slq_exceptions = {
	isUser_repited: (err) => (err && err.code === "ER_DUP_ENTRY")
};


const user_exceptions = {
	badDataTypes: (error) =>( { Mensaje: "Error con los datos ingresados", error }),
	user_already_exists: (email) => ({Mensaje: `Ya existe un usuario con el mail: ${email}`}),
	passwords_doesnot_match: {Mensaje: "Las contraseñas no son iguales"},
	loginFailed: {Mensaje: "Email o contraseña incorrectos"},
};


const note_exceptions = {

}

module.exports = {
	slq_exceptions,
	user_exceptions,
	note_exceptions,
};
