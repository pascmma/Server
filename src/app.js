const express = require('express');
const app = express();
var router = express.Router();
const sql = require('./funcionesSQL');
require('dotenv').config()
let cors = require('cors');


/*
 * Settings
 */
app.set('port',process.env.PORT || 5000);
    
/*
 *Middlewares 
 */
app.use(cors());
app.use(express.json());


//rutas
app.get('/',(req, res)=>{
    res.send('hola mundo');
});

app.get('/about',(req, res)=>{
    res.send('hola mundosss');
});



module.exports= app;





