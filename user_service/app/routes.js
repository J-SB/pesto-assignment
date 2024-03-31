const express = require('express')
const logger = require('../logger')
const {validateToken, decodeToken, createToken} = require("./utils")
const manager = require('./manager')
const app = express()

app.use(express.json())
app.get("/",  (req, res)=>{return res.send("Request recieved")})

app.get("/user/validateUser", validateToken)
app.get("/user/:id", validateToken, manager.getUserbyId)
app.post("/user/register", manager.createUser)
app.put("/user/update/:id", validateToken, manager.updateUser)
app.post("/user/token", manager.getToken)
app.get("/address/list", validateToken, manager.getAddress)
app.post("/address/add", manager.addAddress)
app.put("/address/:id", validateToken, manager.updateAddress)

module.exports = app