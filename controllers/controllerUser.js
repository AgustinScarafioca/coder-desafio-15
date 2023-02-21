import logger from '../utils/loggers.js'


export const getSignIn = (req, res) => {
    const { url, method } = req
    logger.info('Ruta ' + method + url)
    if (req.isAuthenticated()) {
        res.redirect("/productos");
    };
    res.render("ingresar");
};

export const getSignUp = (req, res) => {
    const { url, method } = req
    logger.info('Ruta ' + method + url )
    if (req.isAuthenticated()) {
        res.redirect("/productos");
    };
    res.render("register");
};

export const getLogout = (req, res) => {
    const { url, method } = req
    logger.info('Ruta ' + method + url )
    const user = req.user.username;
    req.logout(err => {
        const saludo = `Hasta luego ${user}`;
        res.render("saludo", {saludo});
    });
};