const sequilize = require('sequelize');
const db = require('../dbConfig');

module.exports = function (sequelize, DataTypes) {
    // DataTypes.DATE._stringify = function _stringify(date, options) {
    //     date = this._applyTimezone(date, options);
      
    //     // Z here means current timezone, _not_ UTC
    //     // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    //     return date.format('YYYY-MM-DD HH:mm:ss.SSS');
    //   };
    return sequelize.define('Reading', {
        BuildingId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            primaryKey: true,
            references: {
                model: 'Building',
                key: 'Id'
            }
        },
        ObjectId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            primaryKey: true,
            references: {
                model: 'Object',
                key: 'Id'
            }
        },
        DataFieldId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            primaryKey: true,
            references: {
                model: 'DataField',
                key: 'Id'
            }
        },
        Value: {
            type: DataTypes.DECIMAL
        },
        Timestamp: {
            type: DataTypes.DATE,
            //defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false,
        tableName: 'Reading'
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