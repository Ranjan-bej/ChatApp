import {msgModel} from "../model/msgModel.js"
export async function addMsg(req,res){
    try{
        const {from,to,message:msg}=req.body
        const chat = await new msgModel({
            message:{text:msg},
            users:[from,to],
            sender:from,
        })
        const data =chat.save();
        if(data){
            return res.json({msg:"Message added successfully.."})
        }
        return res.json({msg:"Failed to add message.."})
    }
    catch(err){
        console.log(err);
    }
}
export async function getAllMsg(req,res){
    try{
        const {from ,to}=req.body
        const messages = await msgModel.find({
            users:{
                $all:[from,to],
            }
        }).sort({updatedAt:1})
        const projectMessages = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message:msg.message.text,
            }
        })
        res.json(projectMessages)
    }
    catch(err){
        console.log(err);
    }
}