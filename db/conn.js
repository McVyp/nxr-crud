// require('dotenv').config({path: '../.env'})

const MONGO_URI= "mongodb+srv://admin:admin@nxt-crud.zdhhsty.mongodb.net/?retryWrites=true&w=majority"
import mongoose from 'mongoose';


const connectMongo = async() =>{
    try{
        const {connection} = await mongoose.connect(MONGO_URI)

        if(connection.readyState === 1)
        {
            console.log("Database connected")
        }
    }catch(err){
        return Promise.reject(err);
    }
}
export default connectMongo;