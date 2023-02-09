import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { ingresar, products, register, exit } from "./routers/routers.js";
import productosTest from "./routers/routersTest.js";
import info from "./routers/info.js";
import apiRandom from "./routers/apiRandom.js";
import { createServer } from "http";
import { Server } from "socket.io";
import container from "./containers/containerChat.js";
import { normalize, schema } from "normalizr";
import util from "util";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import parseArgs from 'minimist';
import dotenv from 'dotenv';

dotenv.config()

const MONGO = process.env.MONGO

const config = {
    alias: { p: 'port', },
    default: { port: 8080, },
};

const { port } = parseArgs(process.argv.slice(2), config);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chat = new container();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true};

app.set("views", "./views");
app.set("view engine", "pug");

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse:coderhouse@cluster0.detnzhp.mongodb.net/ecommerce1?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 600000},
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + "/Public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ingresar", ingresar);
app.use("/productos", products);
app.use("/registrarse", register);
app.use("/salir", exit);
app.use("/test", productosTest);

app.get('/', (req, res) => {
    res.redirect('/productos')
})

io.on("connection", async socket =>{

    const listaMensajes = await chat.getChat();
    const strin = JSON.stringify(listaMensajes);
    const data = JSON.parse(strin);
    const mensajes = {
        id: "backendCoder09",
        messages: data,
    };
    print(mensajes)

    const authorSchema = new schema.Entity("author",{},{idAttribute: "email"});
    const messageSchema = new schema.Entity("message", {
        author: authorSchema,
    });
    const messagesSchema = new schema.Entity("messages", {
        messages: [messageSchema],
    });
    const messagesNorm = normalize(mensajes, messagesSchema);
    print(messagesNorm)

    const compresion =100 - JSON.stringify(messagesNorm).length * 100 / JSON.stringify(mensajes).length + "%";
    socket.emit("messages", messagesNorm);
    socket.emit("compre", compresion);

    socket.on("new-message", async data => {
        if (listaMensajes.length === 0) {
            return await chat.addChat({...data, fyh: new Date().toLocaleString(), id: 1});
        };
        await chat.addChat({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1});

        io.sockets.emit("messages", messagesNorm);
    });
});

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true));
};

httpServer.listen(port, () => {
    console.log(`Servidor corriento en ${port}`);
});