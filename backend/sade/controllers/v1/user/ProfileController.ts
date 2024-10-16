import { createtoken, DB } from "@utils";
import express, { Response } from "express";

export const ProfileController = express.Router();
ProfileController.use(express.json());

ProfileController.get("/", async (Request: any, Response: Response) => {
  try {
    const user = await DB.users.findUnique({
      where: { phone: Request.user.phone },
    });

    if (user) {
      Response.status(200).json({
        status: "success",
        access_token: createtoken(
          JSON.stringify({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
          })
        ),
        user: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
        },
      });
    }
  } catch (error) {
    Response.status(401).json({
      status: "error",
      message: "Not Authorized",
    });
  }
});

ProfileController.post("/update", async (Request: any, Response: Response) => {
  try {
    const user = await DB.users.update({
      where: { phone: Request.user.phone },
      data: {
        firstname: Request.body.firstname,
        lastname: Request.body.lastname,
        email: Request.body.email,
        phone: Request.body.phone,
        birthdate: new Date(Request.body.birthdate),
        address: Request.body.address,
      },
    });

    if (user) {
      Response.status(200).json({
        status: "success",
        access_token: createtoken(
          JSON.stringify({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
          })
        ),
        user,
      });
    }
  } catch (error) {
    console.log(error);
    Response.status(401).json({
      status: "error",
      message: "Not Authorized",
    });
  }
});

ProfileController.post(
  "/password",
  async (Request: any, Response: Response) => {
    try {
      const user = await DB.users.update({
        where: { email: Request.user.email, password: Request.body.password },
        data: {
          password: Request.body.newpassword,
        },
      });

      if (user) {
        Response.status(200).json({
          status: "success",
          access_token: createtoken(
            JSON.stringify({
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              phone: user.phone,
            })
          ),
          user,
        });
      } else {
        Response.status(200).json({
          status: "error",
          message: "Mevcut şifre yanlış.",
        });
      }
    } catch (error) {
      Response.status(200).json({
        status: "error",
        message: "Mevcut şifre yanlış.",
      });
    }
  }
);
