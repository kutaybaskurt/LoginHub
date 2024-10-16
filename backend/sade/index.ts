import cors from "cors";
import express, { Express } from "express";
import { V1Controller } from "@controllers";
import { DB } from "@utils";

export class Sade {
  app: Express;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.API_PORT || 3001;
  }

  start() {
    this.app.use(
      // Here we set the CORS configuration
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );

    this.app.use("/v1", V1Controller);

    this.app.listen(this.port, () => {
      console.log(`Sade API is running on port ${this.port}`);
    });
  }
}

new Sade().start();
