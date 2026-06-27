import mongoose from "mongoose"

const connectDB = async () => {

    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    }catch(err){

        console.log("DB error",err)
    }


}

export default connectDB