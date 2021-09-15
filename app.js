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



module.exports = app
