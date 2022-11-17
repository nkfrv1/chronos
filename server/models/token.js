const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = require('./user');

class Token extends Model { }

Token.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
});

module.exports = Token;