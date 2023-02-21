import mongoose from 'mongoose'
import modelsUser from '../models/models.js'
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

    async getUser(data){
        const user = await modelsUser.findOne({ username: data })
        return user
    }

    async addUser(data){
        const dataAdd = new modelsUser(data)
        const add = await dataAdd.save()
        return add
    }
}