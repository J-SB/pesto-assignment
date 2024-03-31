const logger = require('../logger')
const jwt = require('jsonwebtoken')
const request = require('requestretry')

const validateToken = (req, res, next) => {
    const headers = req.headers
    request(
        {
            url: "http://localhost:3000/validateUser",
            method: "GET",
            headers: headers
        },
        (err, res, body)=>{
            if(err){
                console.log(`############\n\n ${err} \n\n #########`)
            }
            else{
                next()
            }
        }
    )
}

module.exports = {
    validateToken
}