"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const codesender_service_1 = require("../services/codesender.service");
const sequelize_1 = require("sequelize");
class SessionService {
    static Auth(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.authenticated = false;
            if (req.session.AUTH_TYPE === 'password') {
                const user = yield user_model_1.UserCredentials.findOne({ where: { [sequelize_1.Op.and]: [{ username: req.body.username }, { password: req.body.password }] } });
                if (user) {
                    req.session.authenticated = true;
                }
                else {
                    req.session.authenticated = false;
                    return null;
                }
            }
            else if (req.session.AUTH_TYPE === 'mail') {
                if (codesender_service_1.cache.get('CodeMail') === req.body.CodeMail) {
                    req.session.authenticated = true;
                }
                else {
                    req.session.authenticated = false;
                }
            }
            else if (req.session.AUTH_TYPE === 'phone') {
                if (codesender_service_1.cache.get('CodePhone') === req.body.CodePhone) {
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
            if (codesender_service_1.cache.get('CodePhone') === req.body.CodePhone && codesender_service_1.cache.get('CodeMail') === req.body.CodeMail) {
                return true;
            }
            else
                return false;
        });
    }
}
exports.default = SessionService;
