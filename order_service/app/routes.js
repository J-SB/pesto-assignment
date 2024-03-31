const express = require('express')
const logger = require('../logger')
const {validateToken} = require("./utils")
const manager = require('./manager')
const app = express()

app.use(express.json())
app.get("/",  (req, res)=>{return res.send("Request recieved")})

app.get("/order/list", validateToken, manager.getOrder)
app.post("/product/create", validateToken, manager.addOrder)
app.put("/order/:id", validateToken, manager.updateOrder)

module.exports = app