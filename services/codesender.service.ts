var nodemailer = require('nodemailer');
import { google } from 'googleapis';
import { config } from 'dotenv';
config()
import NodeCache from 'node-cache';
const cache = new NodeCache()
export {cache}
import { SmsAero } from 'smsaero';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const secretkey = process.env.GOOGLE_SECRET_KEY
const redirect = 'https://developers.google.com/oauthplayground'
const token = process.env.GOOGLE_TOKEN
const oauthclient = new google.auth.OAuth2(CLIENT_ID,secretkey,redirect)

oauthclient.setCredentials({refresh_token:token})
const accessToken = oauthclient.getAccessToken()


var transporter = nodemailer.createTransport({
  service: 'gmail',
  host:'smtp-relay.gmail.com',
  port:465,
  auth: {
    type:"OAuth2",
    user: 'masaripovsahzod526@gmail.com',
    clientId : CLIENT_ID,
    clientSecret: secretkey,
    refreshToken:token,
    accessToken
  }
});

const smsSender = new SmsAero('mshaxzodm@gmail.com ',process.env.SMS_CODE );

export default class CodeSender{
    static async sendMail(mail:String):Promise<any>{
        const random = Math.floor(Math.random()*(9999-1000+1)+1000);
        var mailOptions = {
            from: 'masaripovsahzod526@gmail.com',
            to: mail,
            subject: 'Login to app',
            text: `Your code is: ${random}`
        };

        const mailsent = await transporter.sendMail(mailOptions, function(error:any){
            if (error) {
                console.log('mail not sent')
                return null
            } else {
                console.log('mail sent')
                console.log(random)
                cache.set("CodeMail",random,180)
                return 'success'
            }
        });
        return mailsent
    }
    static async SendSms(phone:String):Promise<any>{
        const random = Math.floor(Math.random()*(9999-1000+1)+1000);
        smsSender.send(phone, `Your code is: ${random}`)
        .then((response:Response) => {cache.set("CodePhone",random,180);console.log(random);return 1})
        .catch((error:any) => {return null});
        // Проверка баланса
        smsSender.balance()
        .then((response:Response) => console.log(response))
        .catch((error:any) => console.error(error));
        // Другие методы согласно API...
    }
}