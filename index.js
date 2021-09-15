const app = require("./app");
require("./database/DB_conection");

const port = app.get("PORT");
async function main() {
	await app.listen(port);
	console.log("API running on port", port);
}

main();
