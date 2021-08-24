
/**
 * Configuracion de valores para acceder a la base de datos,
 */

const config = {
    user:'',
    password:'',
    server:'',
    database:'',
    options:{
        trustedconnection:true,   
        enableArithAbort:true,
        encrypt:false,

    }
}

module.exports = config;