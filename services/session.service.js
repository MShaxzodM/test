var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserCredentials } from '../models/user.model';
import { cache } from "../services/codesender.service";
import { Op } from 'sequelize';
class SessionService {
    static Auth(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.authenticated = false;
            if (req.session.AUTH_TYPE === 'password') {
                const user = yield UserCredentials.findOne({ where: { [Op.and]: [{ username: req.body.username }, { password: req.body.password }] } });
                if (user) {
                    req.session.authenticated = true;
                }
                else {
                    req.session.authenticated = false;
                    return null;
                }
            }
            else if (req.session.AUTH_TYPE === 'mail') {
                if (cache.get('CodeMail') === req.body.CodeMail) {
                    req.session.authenticated = true;
                }
                else {
                    req.session.authenticated = false;
                }
            }
            else if (req.session.AUTH_TYPE === 'phone') {
                if (cache.get('CodePhone') === req.body.CodePhone) {
                    req.session.authenticated = true;
                }
                else {
                    req.session.authenticated = false;
                }
            }
        });
    }
    static Confirm(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cache.get('CodePhone') === req.body.CodePhone && cache.get('CodeMail') === req.body.CodeMail) {
                return true;
            }
            else
                return false;
        });
    }
}
export default SessionService;
