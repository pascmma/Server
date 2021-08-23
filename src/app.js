const express = require('express');
const app = express();


app.use(express.json());


//rutas
app.get('/',(requ, res)=>{
    res.send('hola mundo');
});


app.get('/about',(requ, res)=>{
    res.send('hola mundosss');
});



app.listen(4000,()=> console.log("servidor funcionando ..."));

module.exports= app;

//configuracion


