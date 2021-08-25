const {Router} = require('express');
const router = Router();


router.get('/about',(req,res)=>{
    res.json({"name": "martin"})
});

module.exports = router;