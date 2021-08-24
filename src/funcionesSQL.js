const config = require('./config');
const sql = require('mssql');


async function getData(){
    try {
        let pool = await sql.connect(config);
        console.log("Aplicando la funcion de getData")
        
    } catch (error) {
        console.log(error);
        
    }
}


module.exports={
    getData:getData
};