const winston = require('winston');

module.exports = winston.createLogger({
    level: 'info', // Set the minimum level of messages to log
    format: winston.format.json(), // Use JSON format for log messages
    transports: [
        new winston.transports.Console() // Log to the console
    ]
});
