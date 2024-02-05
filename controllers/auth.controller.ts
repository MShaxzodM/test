import SessionService from "../services/session.service";
import UserService from "../services/user.service";
import CodeSender from "../services/codesender.service";
import { Request,Response } from "express";

class AuthController{
    static async entryPoint(req:Request,res:Response):Promise<any>{
        
        if (req.body.AUTH_TYPE==='phone' && req.body.phone){
            req.session.regenerate
            req.session.AUTH_TYPE = "phone"
            const user =await UserService.FindOne("phone",req.body.phone)
            
            if(user){
                req.session.user_id = user.user_id
                const sms = await CodeSender.SendSms(req.body.phone)
                return res.send("SMS sent")
            }else{
                return res.status(400).send('Insert right phone number')
            }
            
            
        }else if(req.body.AUTH_TYPE==='mail' && req.body.email){
            req.session.regenerate
            req.session.AUTH_TYPE = "mail"
            const user =await UserService.FindOne("email",req.body.email)
            if(user){
                req.session.user_id = user.user_id
                const mail = await CodeSender.sendMail(req.body.email)
                return res.send('Mail sent')
            }else{
                return res.status(400).send('no user has this email')
            }
            
            
        }else if(req.body.AUTH_TYPE==='password' && req.body.username){
            req.session.regenerate
            req.session.AUTH_TYPE = "password"
            const user =await UserService.FindOne("username",req.body.username)
            if(user){
                req.session.user_id = user.user_id
                res.send("user found")
            }else{
                return res.status(400).send('no user has this username')
            }
        }else {
            res.status(400).send('Choose Authorization type')
        }
    }


    static async login(req:Request,res:Response):Promise<any>{
        await SessionService.Auth(req)
        if(req.session.authenticated){
            const data = await UserService.GetById(req.session.user_id)
            return res.send(data)
        }else{res.status(403).send('Not authorized')}
        
    }
}
export default AuthController