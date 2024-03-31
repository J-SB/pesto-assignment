const express  = require('express')
const axios = require('axios')

const app = express()

// list of server to proxy or balance load to
const servers = ["http://localhost:5001", "http://localhost:5002", "http://localhost:5003"] 

let current=0, server;

// Handler to offload requests
const handler = async (req, res) =>{
    const {method, url, headers, body: data} = req
    server = servers[current]
    current === (servers.length - 1) ? current=0 : current++;
    try{
        const resp = await axios({
            url: `${server}${url}`,
            method,
            headers,
            data
        })

        console.log(`Proxy to ${server} succeeded`)
        res.send(resp.data)
    }
    catch(err){
        console.log(`Proxy to ${server} failed`)
        handler(req, res);
    }
}

// Object to store request counts for each IP address
const requestCount = {};

// Middleware function to perform rate limiting
const rateLimiter = (req, res, next) => {
  const { ip } = req;
  
  if (!requestCount[ip]) {
    requestCount[ip] = 1;
  } else {
    requestCount[ip]++;
  }

  // Check if the request count exceeds the limit = 100
  if (requestCount[ip] > 100) { 
    return res.status(429).send('Too many requests from this IP, please try again later');
  }

  // If within the limit, proceed to the next middleware
  next();
};

// Apply the rate limiter middleware to all routes
app.use(rateLimiter);

app.use((req, res)=>{handler(req, res)})
app.listen(3030)