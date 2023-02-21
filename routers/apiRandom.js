import { Router } from 'express'
import { fork } from 'child_process'
import path from 'path'
import logger from '../utils/loggers.js'

const apiRandom = Router()

apiRandom.get('/', (req, res) =>{
    logger.info('Ruta ' + method + url)
    const quantity = req.query.cant || 8000000000

    const operation = fork(path.resolve(process.cwd(), './middleware/operation.js'))
    operation.on('message', result =>{
        if(result == 'ready'){
            operation.send(quantity)
        } else{
            res.json(result)
        }
    })
})

export default apiRandom