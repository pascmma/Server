const config = require('./config');
const app = require('./app');
const sql = require('mssql');
const users = require('./usuarios')
require('dotenv').config();
const md5 = require('md5');

const consulta = "SELECT * FROM Tbl_Deporte;"
let query;
let moroParam ="AU";
var fechaIni =new Date("2021-07-01");
var fechaFin=new Date("2021-08-01");
let aux;
let fechainicial;
let tipoEstado;
const usuarioTest = "martin@gmail.com";
const admin = "adminosaurio"
const passwordTest = "conta";
app.listen(app.get('port'),()=>console.log("server funcionando en: ",app.get('port')));

//20210801', '20210825'

async function getDeportes(){
    try {
        let pool = await sql.connect(config);
        let salida = pool.request().query(consulta);  
        query = (await salida).recordsets;
        console.log(query);
        return (await salida).recordsets;
        
        
    } catch (err) {
        console.log(err);
        
        
    }
}

// prueba con el procedimiento de de csGetSocioAntiguedad con parametros de 
// Tipo de descuento CHAR(3)
let desde;
let hasta;

async function consultaIngresosCFP(fechainicial){
        console.log("desde antes:" ,fechainicial[0])
        console.log("hasta antes:",fechainicial[1])
    
        let pool = await sql.connect(config);
        console.log("Conexion establecida en la base de datos")
        let result = await pool.request()
            .input('Desde',sql.DateTime,(fechainicial[0]))
            .input('Hasta',sql.DateTime,(fechainicial[1]))
            .execute('PWRPCON_IngresosCFP');
        //console.log(result.recordsets)
        console.log("desde :" ,fechainicial[0])
        console.log("hasta :" ,fechainicial[1])
        return result.recordsets;
};


const users_temp = users;
const pruebaUser = {"username":"adminosaurio", "password":"leadmin0"}




async function validarLogin(body){
    console.log("LOS VALORES DEL LOGIN",body);
    const users_temp = users;
    
    const usuario = users_temp.map(item => {
        item.username === body.username ? usuario= item  : item 
    })

    if(body.username === usuarioTest && body.password === passwordTest){
        let result = body.username;
        console.log("es valido el usuario", result);
        return result;
    }
    else{
        let result = "invalido"
        return result
    }
}


async function consultaMorosidad(estado){
    console.log("el valor de el estado es:", estado);
    
        let pool = await sql.connect(config);
        console.log("Conexion establecida en la base de datos con los para",estado)
        let result = await pool.request()
            .input('Estado',sql.Char,estado)
            .execute('PCAJREP_Morosidad');
            console.log("el estado de la consulta es",estado)
           // aux =(await result).recordsets;
            console.log((result).recordsets);
            return result.recordsets;

}
async function testPrueba(){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('PersonaID',sql.BigInt,45922)
            .execute('csGetSocioAntiguedad');
        //console.log(result.recordsets)
        return result.recordsets;

        
    } catch (error) {
        console.log(error);
        
    }
}


//routes 
app.get("/consultaMoro", function(req,res,next){
    tipoEstado = 'AC';
    console.log("")
    consultaMorosidad(tipoEstado).then(result=>{res.json(result)})
    //console.log(aux)
})

app.post("/consultaMoro", function(req,res,next){
    console.log("el request body para moros es ", req.body)
    let tipoEstado = req.body;
    console.log("la consulta con el estado es",tipoEstado);
    consultaMorosidad(tipoEstado).then(result=>{res.json(result)});
    
})
console.log("PRUEBA DE GET FECHAS DESPUES DEL POST",fechainicial);

app.get("/consultaIngresos", function(req,res,next){
     fechainicial= ['2021-01-01','2021-09-07'];
    consultaIngresosCFP(fechainicial).then(result=> {res.json(result)})

})

app.post("/consultaIngresos", function(req,res,next){
    console.log("el request body para fecha es ", req.body)
   let fechainicial = req.body;
    consultaIngresosCFP(fechainicial).then(result=>{res.json(result)})
    console.log("si se pudo conectar", fechainicial);

} )
app.post("/login",function(req,res,next){
    console.log("REQUEST SOLICITADAA :",req.body);
    validarLogin(req.body).then(result=>{res.json(result)})
    
})

app.get("/getData",function(req,res,next){
    testPrueba().then(result=> {res.json(result[0])})
})

app.get("/usuarios",function(req,res,next){
    res.json(users);

    
    
})

//testPrueba();
//console.log(users);

module.exports = {
    getDeportes : getDeportes,
    consultaMorosidad:consultaMorosidad,
    consultaIngresosCFP:consultaIngresosCFP
}

