
const users = require('./usuarios')
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
/** Verificacion que el usuario este  */
const verificacionUno=(_body)=>{
    const unico = users.filter(item =>{
        return (item.username === _body.username )
    })
    console.log("Comprobando valicacion");
    return (unico[0].password ===md5(_body.password) ? true:false)

}


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