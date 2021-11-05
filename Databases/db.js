const Sequelize = require('sequelize');
const db = {} ;

try {
    const sequelize = new Sequelize('thesis','root','root',{
        host: 'localhost' ,
        dialect: 'mysql' 
    })

    db.sequelize = sequelize ;
    db.Sequelize = Sequelize ;

} catch (error) {
    console.log(error.massage);
}

module.exports = db ;