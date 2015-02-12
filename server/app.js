'use strict';

var config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 9000,
    ip: process.env.IP || '127.0.0.1',
    root: './'
};

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var errorHandler = require('composable-middleware');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);


// Setup server
var app = express();

app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

var server = require('http').createServer(app);


app.use(express.static(path.join(config.root, 'dev')));
// app.use(express.static(path.join(config.root, 'client')));
app.set('appPath', 'client');
app.use(morgan('dev'));
app.use(errorHandler()); // Error handler - has to be last

mongoose.connect('mongodb://localhost/test', { db: { safe: true } });

app.use(session({
    secret: 'test-secret',
    store: new mongoStore({ mongoose_connection: mongoose.connection })
}));


// All other routes should redirect to the index.html
app.route('/*')
    .get(function (req, res) {
        res.sendFile(app.get('appPath') + '/index.html', { root: config.root });
    });

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, config.env);
});

