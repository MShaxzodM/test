import bodyParser from "body-parser";
import session from "express-session";
import express from "express";
import Auth from "./routes/auth";
import user from './routes/user';
const app = express();
app.use(session({
    secret: 'secret-key',
    cookie: { maxAge: 86400000 },
    resave: true,
    saveUninitialized: false,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/favicon.ico", (req, res) => {
    res.send("favicon");
});
app.use('/user', user);
app.use("/auth", Auth);
app.listen(3000, () => console.log("Goo"));
