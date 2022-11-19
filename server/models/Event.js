const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Calendar = require('./calendar');
const Category = require('./category');

class Event extends Model { }

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    start: {
        type: DataTypes.DATE
    },
    end: {
        type: DataTypes.DATE
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    calendar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Calendar,
            key: 'id'
        }
    }
}, {
    sequelize,
});

module.exports = Event;