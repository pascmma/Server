const express = require('express');
const app = express();
var router = express.Router();
const sql = require('./funcionesSQL');
const morgan = require('morgan');
require('dotenv').config()
let cors = require('cors');


/*
 * Settings
 */
app.set('port',process.env.PORT || 5000);
    
/*
 *Middlewares 
 */
app.use(morgan('dev')); // para obtener algunso datos por consola
app.use(cors());  //para evitar problemas con el paso de datos en el navegador
app.use(express.json());  //para poder recibir datos en formato json


//rutas
app.get('/',(req, res)=>{
    res.send('hola mundo');
});

app.get('/about',(req, res)=>{
    res.send('hola mundosss');
});



module.exports= app;





