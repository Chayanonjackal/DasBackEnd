const Sequelize = require('sequelize');
const DB = require('../Databases/db');

module.exports = DB.sequelize.define(
    'user',{
        user_id:{
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true 
        },
        user_name:{
            type: Sequelize.STRING,
        },
        password:{
            type: Sequelize.STRING
        },
        first_name:{
            type: Sequelize.STRING
        },
        last_name:{
            type: Sequelize.STRING
        },
        role:{
            type: Sequelize.CHAR
        }

    },{
        timestamps: false ,
        freezeTableName: true ,
        tableName: 'user'
    }
)