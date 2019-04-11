const route = require('express').Router();
const Todo = require('../db/models').models.Todo

//Remember this - a file is run when it is required by some other file
//Fetch all the todos
route.get('/', (req, res) => {
    Todo.findAll({

    }).then((todos) => res.send(todos))
      .catch((err) => console.error(err))
})

//Add a new todo
route.post('/', (req,res) => {
    Todo.create({
        task: req.body.task,
        done: false
    }).then((result) => res.redirect('.'))
        .catch((err) => console.error(err))
})

route.post('/:id', (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(404).send({
            message: "Todo not found"
        })
    }
    //Management wala dekhna hai ?
    //ARRE  mEIN Dikha raha hu maine pull kr liya tha issi pr dekhle
    //Ismein DB NHI HAI S>O> >>.....hai maine bana liya tha , BADYA -
    console.log(req)
    Todo.update({
        done: req.body.done,
        task: req.body.task
    }, {
        where: {
            id: req.params.id
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