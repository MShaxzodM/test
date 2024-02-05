var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserCredentials, UserModel } from '../models/user.model';
class UserService {
    static Create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.create(data.userData);
            const Data = Object.assign(Object.assign({}, data.credentials), { user_id: user.id });
            const credits = yield UserCredentials.upsert(Data);
            return user.id;
        });
    }
    static GetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findByPk(id);
            return user;
        });
    }
    static FindOne(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserCredentials.findOne({
                where: { [key]: value }
            });
            if (user) {
                return user;
            }
            else
                return false;
        });
    }
}
export default UserService;
