import express from "express";
import { ProfileController } from "./ProfileController";

export const UserController = express.Router();
UserController.use(express.json());

UserController.use("/profile", ProfileController);
