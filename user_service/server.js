require('dotenv').config();
const app =  require('./app/routes')
const MySQLClient = require('./app/dbConnection')
MySQLClient.init()

app.listen(3000, ()=>{console.log("server is running on port 3000")})