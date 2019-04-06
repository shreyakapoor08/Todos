const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;  //sequelize ka datatype wala variable ko declare kara ha
//cz vo baar baar use hoga toh hum Sequelize.DataType likhne se bach jayenge
const DB = require('../config.json').DB;


//creating database like
const db =  new Sequelize(
    DB.DATABASE,
    DB.USER,
    DB.PASSWORD,
    {
        host: DB.HOST,
        dialect: "mysql"
    }

);

const Todo = db.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: DataTypes.STRING,
    done: {
        type: DataTypes.BOOLEAN,
        default: false
    }
})

db.sync({alter: true}) //sync se sequelize db ke sath connect karta hai
//aur jo models humne yaha define kare hai unn table ko create karega
//we have to do when we are running server for the first time cz next time se
//db bana hua hoga. altr: true se database ko vo edit kr sakta hai agar already bana hua hoga toh
    .then(() => console.info("Database configured"))
    .catch((err) => console.error(err)) //sync hua ya nahi pata karne ke liye as it is a promise object so .then method and .catch method se pata kar sakte hai

exports.models = {
    Todo
}