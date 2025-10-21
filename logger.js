const {createLogger, transports, format, } = require("winston");

const logger = createLogger({
    level: "info", //contiene level, message, timestamp
    format: format.combine(
        format.timestamp({
            format: () => new Date().toLocaleString() //formatto l'orario in ora locale
        }),
        format.printf(info => `${info.timestamp} [${info.level}] ${info.message}`) //stampo timestamp, il livello e il message che arriva da morgan
    ),
    transports: [
        new transports.Console(), //stampa i log su console
        new transports.File({filename: "server.log"}) // salvali sul file server.log

    ]
});

module.exports = logger;