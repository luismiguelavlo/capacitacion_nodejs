import express, { Router } from "express";

interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    this.port = options.port;
    this.routes = options.routes;
  }

  start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api", this.routes);
    this.app.use((req, res) => {
      return res.status(404).json({
        status: "error",
        message: "Route not found",
      });
    });

    this.app.listen(this.port, () => {
      console.log("Server is running on port", this.port);
    });
  }
}
