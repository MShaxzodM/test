var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SessionService from "../services/session.service";
import UserService from "../services/user.service";
import CodeSender from "../services/codesender.service";
class AuthController {
    static entryPoint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.AUTH_TYPE === 'phone' && req.body.phone) {
                req.session.regenerate;
                req.session.AUTH_TYPE = "phone";
                const user = yield UserService.FindOne("phone", req.body.phone);
                if (user) {
                    req.session.user_id = user.user_id;
                    const sms = yield CodeSender.SendSms(req.body.phone);
                    return res.send("SMS sent");
                }
                else {
                    return res.status(400).send('Insert right phone number');
                }
            }
            else if (req.body.AUTH_TYPE === 'mail' && req.body.email) {
                req.session.regenerate;
                req.session.AUTH_TYPE = "mail";
                const user = yield UserService.FindOne("email", req.body.email);
                if (user) {
                    req.session.user_id = user.user_id;
                    const mail = yield CodeSender.sendMail(req.body.email);
                    return res.send('Mail sent');
                }
                else {
                    return res.status(400).send('no user has this email');
                }
            }
            else if (req.body.AUTH_TYPE === 'password' && req.body.username) {
                req.session.regenerate;
                req.session.AUTH_TYPE = "password";
                const user = yield UserService.FindOne("username", req.body.username);
                if (user) {
                    req.session.user_id = user.user_id;
                    res.send("user found");
                }
                else {
                    return res.status(400).send('no user has this username');
                }
            }
            else {
                res.status(400).send('Choose Authorization type');
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SessionService.Auth(req);
            if (req.session.authenticated) {
                const data = yield UserService.GetById(req.session.user_id);
                return res.send(data);
            }
            else {
                res.status(403).send('Not authorized');
            }
        });
    }
}
export default AuthController;
