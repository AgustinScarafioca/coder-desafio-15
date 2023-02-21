import winston, { format } from 'winston'

const { combine, prettyPrint, timestamp } = winston.format
const LEEVEL = Symbol.for('level')
function filter(level){
    return format(function(info){
        if(info[LEEVEL] === level){
            return info
        }
    })()
}

function buildDefaultLogger(){
    return winston.createLogger({
        format: combine(timestamp(), prettyPrint()),
        transports: [new winston.transports.Console({ level: 'info' })]
    })
}

function buildProdLogger(){
    return winston.createLogger({
        format: combine(timestamp(), prettyPrint()),
        transports: [
            new winston.transports.File({
                level: warn,
                format: filter('warn'),
                filename: 'warn.log'
            }),
            new winston.transports.File({ filename: 'error.log', level: 'error' })
        ]
    })
}

let logger = buildDefaultLogger()
if(process.env.NODE_ENV == 'prod'){
    logger = buildProdLogger()
}

export default logger



