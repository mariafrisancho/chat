import {Router} from"express";

const router=Router();

// configuracion de rutas views

router.get("/",(req,res)=>{
    res.render("home");

});

export {router as viewsRouter};