var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserService from '../services/user.service';
import SessionService from '../services/session.service';
import CodeSender, { cache } from '../services/codesender.service';
class UserController {
    static EntryPoint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (UserService.FindOne("phone", req.body.credentials.phone) || UserService.FindOne("email", req.body.credentials.email) || UserService.FindOne("username", req.body.credentials.username)) {
                res.send('User with this email or phone number is already exists');
            }
            else if (CodeSender.sendMail(req.body.credentials.email) && CodeSender.SendSms(req.body.credentials.phone)) {
                cache.set('userdata', req.body);
                res.send('You are good to go');
            }
            else {
                res.status(400).send('Phone number or email incorrect');
            }
        });
    }
    static Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //need to confirm phone number before creation
            if (SessionService.Confirm(req)) {
                const user_id = yield UserService.Create(cache.get('userdata'));
                req.session.authenticated = true,
                    req.session.user_id = user_id;
                return res.send({ user_id });
            }
            else
                res.status(400).send("need to confirm phone number and email");
        });
    }
    static GetUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.authenticated) {
                const userData = yield UserService.GetById(req.session.user_id);
                res.send(userData);
            }
            else {
                res.status(404).send('cannot get user');
            }
        });
    }
}
export default UserController;
