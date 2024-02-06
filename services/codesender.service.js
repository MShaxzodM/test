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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
var nodemailer = require('nodemailer');
const googleapis_1 = require("googleapis");
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
exports.cache = cache;
const smsaero_1 = require("smsaero");
const CLIENT_ID = '1068897745407-4m9hcuvgr8bp05v6n81k4j2tthf47out.apps.googleusercontent.com';
const secretkey = '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';
const redirect = 'https://developers.google.com/oauthplayground';
const token = '1//04uXwzPl7Ahj4CgYIARAAGAQSNwF-L9IrmZ5Z35ei7YYVgckPRYuYi8exJATUGmawBkgRMV3G3vgm751D9a40UezmH7TLaqCsWE4';
const oauthclient = new googleapis_1.google.auth.OAuth2(CLIENT_ID, secretkey, redirect);
oauthclient.setCredentials({ refresh_token: token });
const accessToken = oauthclient.getAccessToken();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp-relay.gmail.com',
    port: 465,
    auth: {
        type: "OAuth2",
        user: 'masaripovsahzod526@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: secretkey,
        refreshToken: token,
        accessToken
    }
});
const smsSender = new smsaero_1.SmsAero('mshaxzodm@gmail.com ', 'dr8hR198L3L9i8_e2Xi9Na_GmFey3Nnb');
class CodeSender {
    static sendMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
            var mailOptions = {
                from: 'masaripovsahzod526@gmail.com',
                to: mail,
                subject: 'Login to app',
                text: `Your code is: ${random}`
            };
            const mailsent = yield transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log('mail not sent');
                    return null;
                }
                else {
                    console.log('mail sent');
                    console.log(random);
                    cache.set("CodeMail", random, 180);
                    return 'success';
                }
            });
            return mailsent;
        });
    }
    static SendSms(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
            smsSender.send(phone, `Your code is: ${random}`)
                .then((response) => { cache.set("CodePhone", random, 180); console.log(random); return 1; })
                .catch((error) => { return null; });
            // Проверка баланса
            smsSender.balance()
                .then((response) => console.log(response))
                .catch((error) => console.error(error));
            // Другие методы согласно API...
        });
    }
}
exports.default = CodeSender;
