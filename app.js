"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'secret-key',
    cookie: { maxAge: 86400000 },
    resave: true,
    saveUninitialized: false,
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/favicon.ico", (req, res) => {
    res.send("favicon");
});
app.use('/user', user_1.default);
app.use("/auth", auth_1.default);
app.listen(3000, () => console.log("Goo"));
