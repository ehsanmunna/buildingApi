const sequilize = require('sequelize');
const db = require('../dbConfig');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DataField', {
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
        tableName: 'DataField'
    });
};

// const Building = db.define('Building', {
//     Id: {
//         type: sequilize.NUMBER,
//         primaryKey: true
//     },
//     Name: {
//         type: sequilize.STRING
//     },
//     Location: {
//         type: sequilize.DATE
//     }
// }, {freezeTableName: true})

// module.exports = Building;