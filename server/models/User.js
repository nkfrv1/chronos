const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(75),
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
    },
    fullname: {
        type: DataTypes.STRING(64),
        validate: { is: /^[a-zA-Z]+ [a-zA-Z]+$/ }
    },
    profpic: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
});

module.exports = User;