import { get, add, update, Delete, } from "../controllers/controllerProduct";
import { getSignIn, getSignUp, getLogout, } from "../controllers/controllerUser";
import passport from "passport";
import { register, login } from '../middleware/registerLoginPassport'
import requireAuth from "../middleware/requireAuth";
import { Router } from 'express'

const products = Router();
const ingresar = Router();
const register = Router();
const exit = Router();

passport.use('register', register)
passport.use('login', login)

ingresar.get("/", getSignIn)

ingresar.post("/", passport.authenticate("login", { 
    failureRedirect: "/ingresar/errorIngresar", 
    successRedirect: "/products",
}))

ingresar.get("/errorIngresar", (req, res) => {
    res.render("login-error")
});

register.get("/", getSignUp)

register.post("/", passport.authenticate("register", {
    failureRedirect: "/registro/errorRegistro", 
    successRedirect: "/products",
}));

register.get("/errorRegistro", (req, res)=> {
    res.render("register-error")
});

exit.get("/", getLogout)


products.get("/:id?", requireAuthentication, get);
products.post("/", requireAuthentication, add);
products.put("/:id", requireAuthentication, update);
products.delete("/:id", requireAuthentication, Delete);

export {ingresar, products, register, exit};