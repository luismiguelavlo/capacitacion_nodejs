"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./users/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/users", routes_1.UserRoutes.routes);
        //router.use("/tasks", TaskRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
