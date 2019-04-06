const express = require('express')
const config =  require('./config.json')
const bodyParser = require('body-parser')

const routes = {
    todos: require('./api/todos').route
}

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/todos', routes.todos)

app.listen(config.SERVER.PORT, () => {
    console.log('Server started at http://localhost:' + config.SERVER.PORT);
})