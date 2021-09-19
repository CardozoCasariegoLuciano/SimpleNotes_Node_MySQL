const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

//config
app.set("PORT", process.env.PORT || 4000)

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes

app.use("/register", require("./routes/register.routes"))
app.use("/login", require("./routes/login.routes"))

app.use("/api/user", require("./routes/user.routes"))
app.use("/api/note", require("./routes/note.routes"))

module.exports = app
