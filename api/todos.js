const route = require('express').Router();
const Todo = require('../db/models').models.Todo

//Remember this - a file is run when it is required by some other file
//Fetch all the todos
route.get('/', (req, res) => {
    Todo.findAll({ //findAll will work as select *
        //here if we want to find according to some condition in that case we can add where clause etc
    }).then((todos) => res.send(todos))
      .catch((err) => console.error(err))
})

//Add a new todo
route.post('/', (req,res) => {
    Todo.create({
        task: req.body.task,
        done: false, //setting value false
        userId: req.body.userId
    }).then((result) => res.redirect('.'))
        .catch((err) => console.error(err))
})

//parseInt accepts the string and convert into integer
// req.params comes from path segments of the URL that match a parameter in the route definition
route.post('/:id', (req, res) => { //id is whatever is available after /, isse id variable ban jata hai string ki jagah
    if (isNaN(parseInt(req.params.id))) { //agar yeh int nahi hai
        return res.status(404).send({
            message: "Todo not found"  //while creating rest api all should be in rest, json data
        })
    }

    console.log(req)
    Todo.update({ //to-do ko change karna hai accrd to whatever value is coming
        done: req.body.done,
        task: req.body.task
        //sequelize automatically removes undefined keys
    }, {
        where: {
            id: req.params.id // request ke 3 parts hote hai..query , body and params
        },
    }) //.update ke ander first argument is new values, second arg is options and options ke ander where clause jata hai
        .then((result) => res.redirect('.'))
        .catch(err => console.error(err))
}) //colon se variable parts bante hai
// only /id se ussi jagah jata hai but agar /:id kare toh
// but /:id means /---/ slash ke beech ka jo bhi paet hai
// id is whatever is available btw the slash , it is not the part of route here
//isse id variable ban jata hai string ki jagah

exports.route = route;