
import express from "express";
import { register } from "../controllers/userController.js";
import { app } from "../index.js";

app.post("/api/auth/register",register)