export const getSignIn = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos");
    };
    res.render("ingresar");
};

export const getSignUp = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos");
    };
    res.render("registrarse");
};

export const getLogout = (req, res) => {
    const user = req.user.username;
    req.logout(err => {
        const saludo = `Hasta luego ${user}`;
        res.render("saludo", {saludo});
    });
};