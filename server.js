const express = require('express')
const config =  require('./config.json')

const app = express();

app.listen(config.SERVER.PORT, () => {
    console.log('Server started at http://localhost:' + config.SERVER.PORT);
})