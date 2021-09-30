
const users = require('../usuarios.json')
const md5 =require('md5')
// validar las queries, ademas de tener los procedimeitnos y su nombre en la quer


async function validarProcedimiento(consulta){
switch (consulta) {
    case "procedimiento_1": // procedimiento de fechas
        
        break;

    default:
        break;
}
}
 // recibes de los us
/* verificacion del tipo de usuario */



/** Verificacion que el usuario este en los registros de la base de datos  */

const verificacionUno= async(usuario)=>{
    let obj = {}
    const unico =  users.filter(item =>{
        return (item.username === usuario.username )
    })
    console.log("USUARIO ", unico.length)
    if(unico.length=== 0){
        console.log("NO EXISTE EL USUARIO ");
    }
    else{
    
    
    console.log("Comprobando valicacion");
    if(unico[0].password === md5(usuario.password)){
        obj["nombre"] = unico[0].nombre
        obj["username"] = unico[0].username
        console.log("VALIDACION CORRECTA..,")
        return obj;
    }
    else{
        return console.log("error en la pantalla")
    }
}
}

/**
 * Con el usuario validado podemos ver que tipo de usuario es el registrado
 */


const autorizacionUsuario = async(usuarioss)=>{
    return(req,res,next)=>{

        const validarUsuario = req.body.username;
        const usuario = map.users(item =>{
            item.username === users.username;
        })
        if(validarUsuario.username === usuario.username && req.body.password === usuario.password ){
            next();

        }
        else{
            res.json("this is an error")
        }
        
    }
}

module.exports = verificacionUno;