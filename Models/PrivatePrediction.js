const Sequelize = require('sequelize');
const DB = require('../Databases/db');

module.exports = DB.sequelize.define(
    'privateprediction', {
    pp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    citizen_id: {
        type: Sequelize.STRING,
    },
    first_name_th: {
        type: Sequelize.STRING
    },
    last_name_th: {
        type: Sequelize.STRING
    },
    priority: {
        type: Sequelize.STRING
    }
    ,
    gpax: {
        type: Sequelize.STRING
    }
    ,
    pat1: {
        type: Sequelize.STRING
    }
    ,
    pat2: {
        type: Sequelize.STRING
    }
    ,
    school_name: {
        type: Sequelize.STRING
    }
    ,
    school_province_name: {
        type: Sequelize.STRING
    }
    ,
    credit_sum: {
        type: Sequelize.STRING
    }
    ,
    onet01: {
        type: Sequelize.STRING
    }
    ,
    onet02: {
        type: Sequelize.STRING
    }
    ,
    onet03: {
        type: Sequelize.STRING
    }
    ,
    onet04: {
        type: Sequelize.STRING
    }
    ,
    onet05: {
        type: Sequelize.STRING
    }
    ,
    gat1_current: {
        type: Sequelize.STRING
    }
    ,
    gat2_current: {
        type: Sequelize.STRING
    }
    ,
    predic: {
        type: Sequelize.STRING
    }
    ,
    scoredProbabilities: {
        type: Sequelize.STRING
    }
    ,
    user_id: {
        type: Sequelize.INTEGER
    }

}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'privateprediction'
}
)