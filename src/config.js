
/**
 * Configuracion de valores para acceder a la base de datos,
 */
require('dotenv').config();
const config = {
    user:process.env.USER,
    password:process.env.PASSWORD,
    server:process.env.SERVER,
    database:process.env.DATABASE,
    options:{
        trustedconnection:true,   
        enableArithAbort:true,
        encrypt:false,

    }
}

module.exports = config;