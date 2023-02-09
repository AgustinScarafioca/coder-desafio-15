import mongoose from 'mongoose'
import models from '../models/models'
import dotenv from 'dotenv'

dotenv.config()

const mongoDB = process.env.MONGO

mongoose.set('strictQuery', false)
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err){
        console.log(err)
    } 
    else{
        console.log('MongoDB connected')
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