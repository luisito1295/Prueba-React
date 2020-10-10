'use stict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Middleware de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cargar rutas
const user_routes = require('./routes/user');

//Cabeceras o cors HTTP
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


//Rutas base
app.use('/api',user_routes);

module.exports = app;