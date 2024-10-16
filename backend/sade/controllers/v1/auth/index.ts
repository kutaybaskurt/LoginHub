import express from "express";
import { UserController } from "./UserController";

export const AuthController = express.Router();
AuthController.use(express.json());

AuthController.use("/user", UserController);
