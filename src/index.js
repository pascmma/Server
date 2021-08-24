const config = require('./config');
const app = require('./app');
const sql = require('mssql');
require('dotenv').config();


const consulta = "SELECT Descripcion FROM Tbl_Deporte;"
let query;


app.listen(app.get('port'),()=>console.log("server funcionando en: ",app.get('port')));



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
async function testPrueba(){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('discount',sql.BigInt,45922)
            .execute('csGetSocioAntiguedad');
        console.log(result)

        
    } catch (error) {
        console.log(error);
        
    }
}





app.get("/getData",function(req,res,next){
    getDeportes().then(result=>{
        res.json(result[0]);
    })
})


testPrueba();


module.exports = {
    getDeportes : getDeportes,
    testPrueba:testPrueba
}

