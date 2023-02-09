import mongoose, { model } from 'mongoose'
import modelsChat from '../models/modelsChat'
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
        console.log('MongoDb connected')
    }
})

export default class Container {

    async getChat(){
        const data = await modelsChat.find({}, {_id: 0, __v:0})
        return data
    }

    async addChat(data){
        const dataAdd = new modelsChat(data)
        const add = await dataAdd.save()
        return add
    }
}
