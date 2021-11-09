require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const chalk = require('chalk');

const keys = require('./config/keys');

const routes = require('./routes/api');

const projectRoutes = require('./routes/api/project.routes');
const authRoutes = require('./routes/api/auth.routes');
const taskRoutes = require('./routes/api/tasks.routes');
const listRoutes = require('./routes/api/list.routes');

const { database, port } = keys;

const app = express();

// CORS Middleware
app.use(cors());

// express middleware handling the body parsing 
app.use(express.json());

// express middleware handling the form parsing
app.use(express.urlencoded({ extended: false }));

// Error handling
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    );
    next();
});

// create static assets from react code for production only
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( '../client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

// Connection with mongose
mongoose.connect(database.url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() =>
        console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
    )
    .catch(err => {
        console.log(err);   
        console.log(`${chalk.red('✓')} ${chalk.redBright('MongoDB error!')}`)
    });

app.listen(port, ()=>{
    console.log(`${chalk.green('✓')} Server started on port ${chalk.green(port)}`);
})

app.use(routes, projectRoutes, authRoutes, taskRoutes, listRoutes);
