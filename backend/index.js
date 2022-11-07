import express from 'express';
import router from './routes/index.routes.js';
import { PORT } from "./config.js";
import { conectarDB } from "./db.js";
import {Server as SocketServer} from 'socket.io';
import http from 'http';
import cors from 'cors';
import Users from './models/Users.js';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());



//ROUTES
app.use(router);
app.use(express.static(join(__dirname, '../client/build')));

app.get("*", (req, res) => {
    res.sendFile(join(__dirname, '../client/build/index.html'))
})


conectarDB();


//SOCKET IO

const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {}
});



io.on('connection', (socket) => {

    socket.on('user', async (id) => {
        const user = await Users.findById(id);
        const userUpdated = await Users.findByIdAndUpdate(id, {connection: "🟢"}, {new: true});
        socket.usuarioId = String(user._id);
        socket.broadcast.emit('user', userUpdated);
    })
    
    socket.on('message', (message, param, param2, param3, param4) => {
         socket.broadcast.emit('message', {
             description: message,
             emisor: param,
             emisorNickname: param2,
             hora: param3,
             destinatario: param4
         });
     });

    socket.on('disconnect', async () => {
        //deberia hacer q si el dato existe emita el socket broacast porq aca esta el problema
        if(socket.usuarioId){
            const dato = await Users.findByIdAndUpdate(socket.usuarioId, {connection: "🔴"}, {new: true});
            socket.broadcast.emit('user', dato);
        } else {            
            console.log("d")
        }
    });
})


server.listen(PORT);
console.log(`server conectado al puerto ${PORT}`);