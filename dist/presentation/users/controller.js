"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(creatorUserService, finderAllUserService, consumePaService) {
        this.creatorUserService = creatorUserService;
        this.finderAllUserService = finderAllUserService;
        this.consumePaService = consumePaService;
        this.register = (req, res) => {
            this.creatorUserService
                .execute(req.body)
                .then((msg) => {
                return res.status(200).json(msg);
            })
                .catch((err) => {
                return res.status(500).json({
                    message: "internal server error",
                });
            });
        };
        this.findAll = (req, res) => {
            this.finderAllUserService
                .execute()
                .then((users) => {
                return res.status(200).json(users);
            })
                .catch((err) => {
                return res.status(500).json({
                    message: "internal server error",
                });
            });
        };
        this.consumePa = (req, res) => {
            try {
                // Obtener el parámetro desde query string: /consume_pa?estadoPag=2
                const payStatus = parseInt(req.query.payStatus);
                if (isNaN(payStatus)) {
                    return res.status(400).json({
                        error: "El parámetro 'payStatus' es requerido y debe ser un número",
                        example: "/consume_pa?payStatus=2",
                    });
                }
                this.consumePaService
                    .execute(payStatus)
                    .then((msg) => {
                    return res.status(200).json(msg);
                })
                    .catch((err) => {
                    return res.status(500).json({
                        message: "internal server error",
                    });
                });
            }
            catch (error) {
                return res.status(400).json({
                    error: "Error en los parámetros de entrada",
                    message: error instanceof Error ? error.message : "Error desconocido",
                });
            }
        };
    }
}
exports.UserController = UserController;
