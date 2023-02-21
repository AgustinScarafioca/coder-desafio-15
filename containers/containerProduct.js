import mongoose from 'mongoose'
import models from '../models/models.js'
import dotenv from 'dotenv'
import logger from '../utils/loggers.js'

dotenv.config()

const mongoDB = process.env.MONGO

mongoose.set('strictQuery', false)
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err){
        logger.log(err)
    } 
    else{
        logger.log('MongoDB connected')
    }
})

export default class Container{
    
    async add(data){
        const dataAdd = new models(data)
        const add = dataAdd.save()
        return add
    } 

    async get(id){
        if(id){
            const data = await models.findById(id)
            return data
        }
        else{
            const data = await models.find()
            return data
        }
    }

    async update(id, data){
        const update = await models.updateOne( {_id: id}, data)
        return update
    }

    async delete(id){
        const del = await models.deleteOne( { _id: id } )
        return del
    }
}