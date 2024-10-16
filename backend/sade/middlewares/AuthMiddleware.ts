import { DB, verifytoken } from "@utils";
import express, { Request, Response, NextFunction } from "express";

export async function AuthMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    // Check the Authorization header and extract the token
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) { 
      return res.status(401).json({
        status: "error",
        message: "Authorization token missing",
      });
    }

    // Token verification
    const verifiedToken: any = verifytoken(token);

    if (verifiedToken?.valid) {
      // Find the user
      const user = await DB.users.findUnique({
        where: {
          email: verifiedToken?.decoded?.email,
        },
      });

      if (user?.id) { 
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          status: "error",
          message: "User not found",
        });
      }
    } else {
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.error("AuthMiddleware error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
