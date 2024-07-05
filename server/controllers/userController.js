import mongoose from "mongoose";
import {userModel} from "../model/userModel.js";
import bcrypt from "bcrypt";
export  async function register(req,res){
    try{
        const {username:user,phone:num,password:pass}=req.body;
        const usernameCheck = await userModel.findOne({username:user})
        if(usernameCheck){
            return res.json({msg:"*Username already exits",status:false})
        }
        const phoneCheck = await userModel.findOne({phone:num})
        if(phoneCheck){
            return res.json({msg:"*Phone number already exits",status:false})
        }
        const hashPass = await bcrypt.hash(pass,10)
        const User= new userModel({
            username:user,
            phone:num,
            password:hashPass
        })
        User.save();
        return res.json({status:true,User,msg:""})
    }
    catch(err){
        console.log(err);
    }
    }


export  async function login(req,res){
    try{
        const {phone:num,password:pass}=req.body;
        const phoneCheck = await userModel.findOne({phone:num})
        if(!phoneCheck){
            return res.json({msg:"*Phone number doesn't exits",status:false})
        }
        const user = await userModel.findOne({phone:num})
        const  hashPass = user.password;
        bcrypt.compare(pass,hashPass,(err,result)=>{
            if(result==false){
                return res.json({msg:"*Wrong Password",status:false})
            }
        })
        delete user.password
        return res.json({status:true,msg:"",user})
    }
    catch(err){
        console.log(err);
    }
    }

export async function setAvatar(req,res){
    try{
        const userId = req.body.id
        const image = req.body.image
        const userData= await userModel.findByIdAndUpdate(userId,{
            isAvatarSet:true,
            avatarImage:image
        })
        res.json({isSet:userData.isAvatarSet,image:userData.avatarImage})
    }
    catch(err){
        console.log(err);
    }
}


export async function getAllUsers(req,res){
    try{
        const users = await userModel.find({_id:{$ne:req.body.id}}).select([
            "email","username","avatarImage","_id","isSetAvatar"
        ]);
        res.json(users);
    }
    catch(err){
        console.log(err);
    }
}