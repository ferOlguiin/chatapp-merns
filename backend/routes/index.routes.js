import { Router } from "express";
import { crearChat, crearUsuario, editarChat, editarUsuario, eliminarChat, eliminarUsuario, obtenerChat, obtenerTodosLosUsuarios, obtenerUnUsuario, obtenerUsuario, welcome } from "../controllers/routes.controllers.js";
import fileUpload from "express-fileupload";

const router = Router();

//Inicio
router.get("/", welcome);

//rutas de chats
router.post("/chat", obtenerChat);
router.post("/crearchat", fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}), crearChat);
router.put("/editarchat/:id", editarChat);
router.delete("/eliminarchat/:id", eliminarChat);


//rutas de usuarios
router.post("/usuario", obtenerUsuario);
router.post("/crearusuario", fileUpload({
    useTempFiles : true,
    tempFileDir : './user'
}), crearUsuario);
router.put("/editarusuario/:id", fileUpload({
    useTempFiles : true,
    tempFileDir : './user'
}), editarUsuario);
router.delete("/eliminarusuario/:id", eliminarUsuario);
router.get("/todoslosusuarios", obtenerTodosLosUsuarios);
router.get("/user/:id", obtenerUnUsuario);


export default router