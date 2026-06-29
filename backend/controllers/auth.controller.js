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

//Login Controller 

export const login = async (req,res) => {
    try{

        const {email,password} = req.body
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user doesn't exists"})
        }
        //compare the password

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"})
        }

        //token will be generated while we login 
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:process.env.NODE_ENVIRONMENT==="development"
        })
        return res.status(200).json(user)



       } catch (error) {
        console.log(error);
        return res.status(500).json({message:"login error"})


    }
}

export const logOut = async (req,res) => {
    try{
        //if we clear the cookie we will be logout 
        res.clearCookie("token")
        return res.status(200).json({message:"logout Successfully"})

    } catch(error){

        console.log(error);
        return res.status(500).json({message:"logout successfully"})

    }
}