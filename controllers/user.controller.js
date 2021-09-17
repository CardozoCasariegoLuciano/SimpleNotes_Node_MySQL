const connection = require("../database/DB_conection");


async function getAllUsers(req,res){
	sql = "SELECT u_name, u_email, u_id FROM User";

	connection.query(sql, (err, results) => {
		if(err) throw err;
		res.json(results)
	})
}


module.exports = {
	getAllUsers,
}
