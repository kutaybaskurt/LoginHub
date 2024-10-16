import express from "express";
import { AuthMiddleware } from "@middlewares";
import { AuthController } from "./auth";
import { UserController } from "./user";

export const V1Controller = express.Router();

V1Controller.use("/auth", AuthController);

V1Controller.use("/user", AuthMiddleware);
V1Controller.use("/user", UserController);
