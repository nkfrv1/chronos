const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Category extends Model { }

Category.init({
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
    }
}, {
    sequelize,
});

module.exports = Category;