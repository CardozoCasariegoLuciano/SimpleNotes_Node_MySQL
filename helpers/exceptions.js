const generic_exceptions = {
	badDataTypes: (error) =>( { Mensaje: "Error con los datos ingresados", error }),
	invalid_id: {Mensaje: "ID no valida"},
	
};


const user_exceptions = {
	user_already_exists: (email) => ({Mensaje: `Ya existe un usuario con el mail: ${email}`}),
	passwords_doesnot_match: {Mensaje: "Las contraseñas no son iguales"},
	loginFailed: {Mensaje: "Email o contraseña incorrectos"},
	user_not_found : {Mensaje: "Usuario no encontrado"},
	isUser_repited: (err) => (err && err.code === "ER_DUP_ENTRY"),
};


const note_exceptions = {
	note_not_found : {Mensaje: "Nota no encontrada"},

}


const token_exceptions = {
	no_valid_token : (err) => ({Mensaje: "Usuario no autorizado", Error: err}),
}



module.exports = {
	generic_exceptions,
	user_exceptions,
	note_exceptions,
	token_exceptions,
};
