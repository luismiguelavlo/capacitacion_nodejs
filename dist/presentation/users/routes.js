"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const creator_user_service_1 = require("./services/creator-user.service");
const finder_all_user_service_1 = require("./services/finder-all-user.service");
const consume_pa_service_1 = require("./services/consume-pa.service");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const userController = new controller_1.UserController(new creator_user_service_1.CreatorUserService(), new finder_all_user_service_1.FinderAllUserService(), new consume_pa_service_1.ConsumePaService());
        router.post("/register", userController.register);
        router.get("/consume_pa", userController.consumePa);
        router.get("/", userController.findAll);
        http: return router;
    }
}
exports.UserRoutes = UserRoutes;
