import { Router } from "express";
import AuthController from "../controllers/auth.controller";
const auth = Router();
auth.post('/entryPoint', AuthController.entryPoint);
auth.post('/login', AuthController.login);
export default auth;
