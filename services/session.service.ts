
import { Request } from 'express';
import { UserCredentials } from '../models/user.model';
import {cache} from "../services/codesender.service";
import { Op } from 'sequelize';

class SessionService{
    static async Auth(req:Request):Promise<any>{
        req.session.authenticated = false
        if(req.session.AUTH_TYPE==='password'){
            const user:any = await UserCredentials.findOne({where:{[Op.and]:[{username:req.body.username},{password:req.body.password}]}})
            if (user){
                    req.session.authenticated = true         
                }else{
                    req.session.authenticated=false
                    return null
                }
        }else if(req.session.AUTH_TYPE==='mail'){
            if (cache.get('CodeMail')===req.body.CodeMail){
                req.session.authenticated = true
            }else{
                req.session.authenticated=false
            }
        }else if(req.session.AUTH_TYPE==='phone'){
            if (cache.get('CodePhone')===req.body.CodePhone){
                req.session.authenticated = true
            }else{
                req.session.authenticated=false
            }
        }
    }
    static async Confirm(req:Request):Promise<any>{
        if (cache.get('CodePhone')===req.body.CodePhone && cache.get('CodeMail')===req.body.CodeMail){
            return true
        } else return false
    }
}

export default SessionService