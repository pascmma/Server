const express = require('express');
const app = express();
var router = express.Router();
const sql = require('./funcionesSQL');
const morgan = require('morgan');
const {body, ValidationResult} = require('express-validator');
require('dotenv').config();
let cors = require('cors');
const { user } = require('./config');


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

//validacion en login
app.post(
    './login',
    body('username').isEmail(), //verificar si el usuario e un email
    body('password').isLength({min:8}),
    (req,res)=>{
        const errors = ValidationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        User.create({
            username:req.body.username,
            password:req.body.password,
        }).then(user=>res.json(user));
    },
    );


module.exports= app;





