const config = require('./config');
const app = require('./app');

const sql = require('mssql');

const consulta = "SELECT COUNT(*) AS cantidad FROM Tbl_Deporte;"
var query;

async function getDeportes(){
    try {
        let pool = await sql.connect(config);
        let salida = pool.request().query(consulta);  
        query = (await salida).recordsets;
        console.log(query);
        
    } catch (err) {
        console.log(err);

        
    }
}



getDeportes();


module.exports = {
    getDeportes : getDeportes
}