const Sequelize = require('sequelize'); //sabse pehle sequelize ko fetch karte hai
const DataTypes = Sequelize.DataTypes;  //sequelize ka datatype wala variable ko declare kara hai
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
    task: DataTypes.STRING, //ismai sirf datatype hi set krni hai toh direct hi kardo
    done: {
        type: DataTypes.BOOLEAN,
        default: false
    }
})

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Todo.belongsTo(User)
User.hasOne(Todo)
// .hasOne happens where we want to split a single data into 2 tables like user aur password wale table ko alag alag rakhte hai

User.hasMany(Todo)
// .hasMany ek user ke multiple todos ho sakte hai
//Todo.belongsToMany(User)
// belongs to many is for mapping table jaha apne mamy to many mapping karni hai\
// mapping table is created here in this case name of mapping table will be todouser
// if we do User.belongsToMany(Todo) then mapping table ka naam will be usertodo
//rest everything is same in both case
// as parameter is used to create multiple mapping table

db.sync({force: true}) //sync se sequelize db ke sath connect karta hai
//aur jo models humne yaha define kare hai unn table ko create karega
//we have to do when we are running server for the first time cz next time se
//db bana hua hoga. altr: true se database ko vo edit kr sakta hai agar already bana hua hoga toh
    .then(() => console.info("Database configured"))
    .catch((err) => console.error(err)) //sync hua ya nahi pata karne ke liye as it is a promise object so .then method and .catch method se pata kar sakte hai

exports.models = {
    Todo, User
}