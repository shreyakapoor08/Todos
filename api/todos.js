const route = require('express').Router();


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

exports.route = route;