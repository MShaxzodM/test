const { Sequelize, Model, DataTypes } = require("sequelize");
import { config } from "dotenv";
config()
const sequelize = new Sequelize(
    "test",
    "postgres",
    process.env.POSTGRES_PASSWORD,
    {
        port: 5432,
        host: "localhost",
        dialect: "postgres",
    }
);
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
})
// Create database object
const UserCredentials = sequelize.define("user_credentials", {
    user_id:{
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

(async () => {
  await sequelize.sync({ force: true });
})();

export {UserModel,UserCredentials}
