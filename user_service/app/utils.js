const logger = require('../logger')
const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const headers = req.headers
    let authIdToken = headers['auth-id-token'];
    if(!authIdToken){
        logger.info(`${__filename} : validateToken , Token not found !!`)
        return res.send({})
    }

    try{
    const user = decodeToken(authIdToken)
    if(user){
        req.user = user
        next()
    }
    else{
        res.status(400).send("User is not Authorized")
    }
    }
    catch(err){
    res.status(400).send("User is not Authorized")
    }
}

const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error.message);
        return null;
    }
};

const createToken = (user) =>{
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    validateToken,
    decodeToken,
    createToken
}