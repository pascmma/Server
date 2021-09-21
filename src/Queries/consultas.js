const config = require('../config');
const express = require('express');
const sql_db =require('mssql');
const app = require('../app');


//funciones de las queries 

//contabilidad
async function consultaIngresosCFP_POST(fechainicial){
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


async function consultaMorosidad_POST(estado){
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


async function consultasPeriodos(procedimiento,fechas){
    console.log("Inicia las conslta por  los siguientes periodos :",fechas);

    let pool = await sql.connect(config);
    let result = await pool.request()
        .input('desde',sql.DateTime,(fechas[0]))
        .input('hasta',sql.DateTime,(fechas[1]))
        .execute(procedimiento);
    return result.recordsets;
}
async function consultasParametro(procedimiento, estado){
    console.log("Inicia la consulta de el siguiente estado: ", estado)
    let pool = await sql.connect(config);
    let result = await pool.request()
        .input('estado',sql.Char,estado)
        .execute(procedimiento)
    return result.recordsets;
}
