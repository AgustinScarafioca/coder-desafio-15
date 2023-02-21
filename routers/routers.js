import { get, add, update, Delete } from "../controllers/controllerProduct.js"
import { getSignIn, getSignUp, getLogout, } from "../controllers/controllerUser.js"
import passport from "passport";
import { register, login } from '../middleware/registerLoginPassport.js'
import requireAuth from "../middleware/requireAuth.js"
import { Router } from 'express'
import logger from '../utils/loggers.js'

const products = Router();
const ingresar = Router();
const registrarse = Router();
const exit = Router();

passport.use('register', register)
passport.use('login', login)

ingresar.get("/", getSignIn)

ingresar.post("/", passport.authenticate("login", { 
    failureRedirect: "/ingresar/errorIngresar", 
    successRedirect: "/products",
}))

ingresar.get("/errorIngresar", (req, res) => {
    logger.info("Ruta " + method + url)
    res.render("login-error")
});

registrarse.get("/", getSignUp)

registrarse.post("/", passport.authenticate("register", {
    failureRedirect: "/registro/errorRegistro", 
    successRedirect: "/products",
}));

registrarse.get("/errorRegistro", (req, res)=> {
    logger.info("Ruta " + method + url)
    res.render("register-error")
});

exit.get("/", getLogout)


products.get("/:id?", requireAuth, get)
products.post("/", requireAuth, add)
products.put("/:id", requireAuth, update)
products.delete("/:id", requireAuth, Delete)

export {ingresar, products, registrarse, exit}