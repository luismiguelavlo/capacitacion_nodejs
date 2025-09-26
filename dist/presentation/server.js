"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        this.port = options.port;
        this.routes = options.routes;
    }
    start() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
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
exports.Server = Server;
