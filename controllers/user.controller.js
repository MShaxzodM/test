"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const session_service_1 = __importDefault(require("../services/session.service"));
const codesender_service_1 = __importStar(require("../services/codesender.service"));
class UserController {
    static EntryPoint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield user_service_1.default.FindOne("phone", req.body.credentials.phone)) || (yield user_service_1.default.FindOne("email", req.body.credentials.email)) || (yield user_service_1.default.FindOne("username", req.body.credentials.username))) {
                const ourfuckinguser = user_service_1.default.FindOne("phone", req.body.credentials.phone);
                console.log(`bitch is ${ourfuckinguser}`);
                res.send('User with this email or phone number is already exists');
            }
            else if (codesender_service_1.default.sendMail(req.body.credentials.email) && codesender_service_1.default.SendSms(req.body.credentials.phone)) {
                codesender_service_1.cache.set('userdata', req.body);
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
            if (session_service_1.default.Confirm(req)) {
                const user_id = yield user_service_1.default.Create(codesender_service_1.cache.get('userdata'));
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
                const userData = yield user_service_1.default.GetById(req.session.user_id);
                res.send(userData);
            }
            else {
                res.status(404).send('cannot get user');
            }
        });
    }
}
exports.default = UserController;
