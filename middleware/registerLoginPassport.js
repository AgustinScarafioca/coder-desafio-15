import Container from '../containers/containerUser.js'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcrypt'

const dbUser = new Container()

export const register = new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const { name } = req.body
    const user = await dbUser.getUser(username)

    if(user){
        return done('Usuario ya registrado', false)
    }
    const newUser = {
        username,
        password: createHash(password),
        name
    }

    dbUser.addUser(newUser)

    done(null, newUser)
})

export const login = new LocalStrategy(async (username, password, done) =>{
    const user = await dbUser.getUser(username)

    if(!user){
        return done('No existe el usuario', false)
    }
    if(!isValidPassword(user, password)){
        return done('Contraseña incorrecta', false)
    }

    return done(null, user)
})

passport.serializeUser((user, done) =>{
    done(null, user.username)
})

passport.deserializeUser(async(username, done) =>{
    const user = await dbUser.getUser(username)
    done(null, user)
})

function createHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function isValidPassword(user, password){
    return bcrypt.compareSync(password, user.password)
}