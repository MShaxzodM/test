import {Request,Response} from 'express'
import UserService from '../services/user.service'
import SessionService from '../services/session.service'
import CodeSender, { cache } from '../services/codesender.service'
class UserController {
    static async EntryPoint(req:Request,res:Response):Promise<any>{
        if(UserService.FindOne("phone",req.body.credentials.phone) || UserService.FindOne("email",req.body.credentials.email) || UserService.FindOne("username",req.body.credentials.username)){
            res.send('User with this email or phone number is already exists')
        }else if(CodeSender.sendMail(req.body.credentials.email) && CodeSender.SendSms(req.body.credentials.phone)){
            cache.set('userdata',req.body)
            res.send('You are good to go')
        }else {
            res.status(400).send('Phone number or email incorrect')
        }
    }
    static async Create(req:Request,res:Response):Promise<any>{
        //need to confirm phone number before creation
        if(SessionService.Confirm(req)){
            const user_id = await UserService.Create(cache.get('userdata')) 
            req.session.authenticated = true,
            req.session.user_id = user_id   
        return res.send({user_id})
        }else res.status(400).send("need to confirm phone number and email")
        
    }

    static async GetUser(req:Request,res:Response):Promise<any>{
        if(req.session.authenticated){
            const userData = await UserService.GetById(req.session.user_id)
            res.send(userData)
        }else{
            res.status(404).send('cannot get user')
        }
    }
}
export default UserController