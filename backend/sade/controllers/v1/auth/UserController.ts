import { createtoken, DB, decrypt, encrypt } from "@utils";
import express, { Request, Response } from "express";

export const UserController = express.Router();
UserController.use(express.json());

UserController.post("/login", async (Request: Request, Response: Response) => {
  if (!Request.body.email || !Request.body.password) {
    return Response.json({
      status: "error",
      message: "E-posta ve parola gönderilmesi zorunludur.",
    });
  }

  try {
    const user = await DB.users.findUnique({
      where: {
        email: Request.body.email,
        password: Request.body.password,
      },
    });

    if (user) {
      return Response.json({
        status: "success",
        access_token: createtoken({
          firstname: user?.firstname,
          lastname: user?.lastname,
          email: user?.email,
          phone: user?.phone,
        }),
        user: user,
      });
    } else {
      return Response.status(401).json({
        status: "error",
        message: "Kullanıcı adı veya parola hatalı",
      });
    }
  } catch (error) {}
});

UserController.post(
  "/register",
  async (Request: Request, Response: Response) => {
    const {
      firstname,
      lastname,
      username,
      email,
      phone,
      birthdate,
      address,
      password,
    } = Request.body;

    if (!firstname || !lastname || !email || !password) {
      return Response.status(400).json({
        status: "error",
        message: "Tüm zorunlu alanlar doldurulmalıdır.",
      });
    }

    try {
      const newUser = await DB.users.create({
        data: {
          firstname,
          lastname,
          username,
          email,
          phone,
          birthdate: new Date(birthdate),
          address,
          password,
        },
      });

      return Response.status(201).json({
        status: "success",
        message: "Kullanıcı başarıyla kaydedildi.",
        user: newUser,
        access_token: createtoken({
          firstname: newUser?.firstname,
          lastname: newUser?.lastname,
          email: newUser?.email,
          phone: newUser?.phone,
        }),
      });
    } catch (error) {
      console.error("Kayıt işlemi sırasında bir hata oluştu:", error);
      return Response.status(500).json({
        status: "error",
        message: "Sunucu hatası, lütfen daha sonra tekrar deneyin.",
      });
    }
  }
);
