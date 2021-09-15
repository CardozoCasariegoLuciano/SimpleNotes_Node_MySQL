const mysql = require("mysql");

const connection = mysql.createConnection({
	host: process.env.DB_host,
	user: process.env.DB_user,
	password: process.env.DB_password,
	database: process.env.DB_database,
});

async function init() {
	try {
		await connection.connect();
		console.log("Data base conected...");
	} catch (err) {
		console.log(err);
	}
}


init();

module.exports = connection;
