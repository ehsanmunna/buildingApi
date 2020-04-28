const sequilize = require('sequelize');
const db = require('../dbConfig');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Object', {
        Id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 'Object'
    });
};
