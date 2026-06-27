import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async (req,res)=>{
    try{
        let {firstName,lastName,userName,email,password}=req.body
        let existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"email.already exist !"})
        }

        let existUsername = await User.findOne({userName})
        if(existUsername){
            return res.status(400).json({message:"username already exist"})
        }

        if(password.length < 8){
            return res.status(400).json({message:"password must be at least 8 characters"})
        }

        //hash the password using bcryptjs
        let hashedPassword = await bcrypt.hash(password,10)


        //Now we  will create the user 
        const user = await User.create({

            firstName,
            lastName,
            userName,
            email,
            password:hashedPassword

        })

        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000, //millisecond
            sameSite:"strict",
            secure:process.env.NODE_ENVIRONMENT==="production"
        })

        res.status(201).json(user)

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"signup error"})


    }
}