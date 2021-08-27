const config = require('./config');
const app = require('./app');
const sql = require('mssql');
require('dotenv').config();


const consulta = "SELECT * FROM Tbl_Deporte;"
let query;
let moroParam ="AU";
var fechaIni =new Date("2021-07-01");
var fechaFin=new Date("2021-08-01");
let aux;

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
async function consultaIngresosCFP(){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Desde',sql.DateTime,desde = new Date(fechaIni))
            .input('Hasta',sql.DateTime,hasta = new Date(fechaFin))
            .execute('PWRPCON_IngresosCFP');
        console.log(result.recordsets)
        console.log(desde)
        console.log(hasta)
        return (await result).recordsets;

        
    } catch (error) {
        console.log(error); console.log(desde)
        console.log(hasta)
        
    }
}

async function consultaMorosidad(){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Estado',sql.Char,moroParam)
            .execute('PCAJREP_Morosidad');
            aux =(await result).recordsets;
            console.log(aux)
            return(await result).recordsets;
        
    } catch (error) {
        console.log(error);
        
    }
    
}
async function testPrueba(){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('PersonaID',sql.BigInt,45922)
            .execute('csGetSocioAntiguedad');
        console.log(result.recordsets)
        return (await result).recordsets;

        
    } catch (error) {
        console.log(error);
        
    }
}

let fechainicial=[];

//routes 
app.get("/consultaMoro", function(req,res,next){
    consultaMorosidad().then(result=>{res.json(result[0])})
    console.log(aux)
})

app.get("/consultaIngresos", function(req,res,next){
    consultaIngresosCFP().then(result=> {res.json(result)})

})

app.post("/consultaIngresos", function(req,res,next){
    
} )

app.get("/getData",function(req,res,next){
    testPrueba().then(result=> {res.json(result[0])})
})




//testPrueba();


module.exports = {
    getDeportes : getDeportes,
    consultaMorosidad:consultaMorosidad,
    consultaIngresosCFP:consultaIngresosCFP
}

