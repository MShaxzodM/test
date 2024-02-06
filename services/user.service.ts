import {UserCredentials, UserModel} from '../models/user.model'
class UserService {
    static async Create(data:any):Promise<any>{
        const user = await UserModel.create(data.userData)
        const Data = {...data.credentials,user_id:user.id}
        const credits = await UserCredentials.upsert(Data)
        return user.id
    }
    static async GetById(id:any):Promise<any>{
        const user = await UserModel.findByPk(id)
        return user
    }
    static async FindOne(key:any,value:String):Promise<any>{
        const user = await UserCredentials.findOne({
            where:{[key]:value}
        })
        console.log(user)
        if(user){
            return user
        }else return false
        
    }
}
export default UserService