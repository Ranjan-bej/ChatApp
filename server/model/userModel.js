import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username:{
        type:String,
        min:3,
    },
    password:{
        type:String,
        min:8
    },
    phone:{
        type:String,
    },
    isAvatarSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
})

export const  userModel = mongoose.model("User",userSchema);