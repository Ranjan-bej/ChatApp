import 'dotenv/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from "express"
import cors from "cors"
import {register} from "./controllers/userController.js"
import {login} from "./controllers/userController.js"
import { getAllUsers } from './controllers/userController.js';
import { setAvatar } from './controllers/userController.js';
import { addMsg, getAllMsg } from './controllers/messagesController.js';
export const app = express();
app.use(cors());
app.use(bodyParser.json())
mongoose
    .connect(process.env.URL)
    .then(() => {
    console.log("DB connection successful...");
})
app.get("/",(req,res)=>[
    res.send("hello there!")
])
app.post("/api/auth/register",register)
app.post("/api/auth/login",login)
app.post("/api/auth/setAvatar",setAvatar)
app.post("/api/auth/allusers",getAllUsers)
app.post("/api/addmsg",addMsg)
app.post("/api/getmsg",getAllMsg)
app.listen(process.env.PORT, (req, res) => {
    console.log("Server running on port 5000");
})