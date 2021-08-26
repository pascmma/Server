/**
 * Ruta de una area especifica
 */
const {Router} = require('express');
const router = Router();


router.get('/', (req,res)=>{
    res.json({"titulo": "hola mundo"})
});


module.exports =router;
