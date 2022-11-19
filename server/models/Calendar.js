const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = require('./user');

class Calendar extends Model { }

Calendar.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    main: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
});

module.exports = Calendar;