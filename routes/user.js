"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.default)();
router.post('/', user_controller_1.default.EntryPoint);
router.post('/confirm', user_controller_1.default.Create);
router.get("/:id", user_controller_1.default.GetUser);
exports.default = router;
