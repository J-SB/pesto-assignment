const express = require('express')
const logger = require('../logger')
const {validateToken} = require("./utils")
const manager = require('./manager')
const app = express()

app.use(express.json())
app.get("/",  (req, res)=>{return res.send("Request recieved")})

app.put("/product/:id", validateToken, manager.updateProduct)
app.get("/product/list", validateToken, manager.getProduct)
app.post("/product/add", validateToken, manager.addProduct)

module.exports = app