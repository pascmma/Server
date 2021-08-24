const config = require('./config');
const sql = require('mssql');

async function getData(){
    try {
        let pool = await sql.connect(config);
        console.log("Conexion con la base de datos exitosa");
        
    } catch (error) {
        console.log(error);
        
    }
}


async function getData_query(){
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().query("SELECT * FROM Tbl_Deporte");
        return res.recordsets;

        
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    getData:getData,
    getData_query:getData_query
}
