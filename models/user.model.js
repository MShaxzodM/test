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
exports.UserCredentials = exports.UserModel = void 0;
const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelize = new Sequelize("test", "postgres", process.env.POSTGRES_PASSWORD, {
    port: 5432,
    host: "localhost",
    dialect: "postgres",
});
const UserModel = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    other: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
exports.UserModel = UserModel;
// Create database object
const UserCredentials = sequelize.define("user_credentials", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Model attributes are defined here
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
exports.UserCredentials = UserCredentials;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync({ force: true });
}))();
