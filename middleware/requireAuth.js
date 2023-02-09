export default function requireAuth(req, res, next){
    if(req.isAuthenticater()){
        next()
    }

    else{
        res.redirect('/ingresar')
    }
}