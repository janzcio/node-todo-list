const express = require('express');

const app = express();

const aliases = require('./aliases');  

global.__rootdir = aliases['@root'];
global.__models = aliases['@models'];
global.__controllers = aliases['@controllers'];
global.__validators = aliases['@validators'];
global.__services = aliases['@services'];
global.__repositories = aliases['@repositories'];

const morgan = require('morgan');

const bodyParser = require('body-parser');

const todosRoutes = require('./api/routes/todos');

// midlewares

// logger
app.use(morgan('dev'))

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// to avoid CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Orgin, X-Requested-With', 'Content-Type', 'Authorization');
    if (req.method === 'OPTIONS') {
        req.heade('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// routes with prefix
app.use('/todos', todosRoutes);

// error Handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    console.log(error.status);
    res.status(error.status || 500);
    res.json({
        error : {
            message :  error.message
        }
    })
})

module.exports = app;