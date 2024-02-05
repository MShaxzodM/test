import  express  from "express";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
const router = express()
router.post('/',UserController.EntryPoint)
router.post('/confirm',UserController.Create)
router.get("/:id",UserController.GetUser)
export default router