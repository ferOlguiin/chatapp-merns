import fs from "fs-extra";
import { borrarImagen, subirImagen } from "../cloudinary/cloudinary.js";
import Chats from "../models/Chats.js"
import Users from "../models/Users.js";

//INICIO
export const welcome = (req, res) => {
    return res.send("Bienvenido, conectado al puerto: " + PORT);
}

//FUNCIONES PARA CHATS

export const obtenerChat = async (req, res) => {
    try {
        
        const {destinatario, emisor, destinatario2, emisor2} = req.body;
        let chat = [];
        chat.push(await Chats.find({destinatario: destinatario, emisor: emisor}));
        chat.push(await Chats.find({destinatario: destinatario2, emisor: emisor2}));
        return res.send(chat.flat().sort());
        
    } catch (error) {
        return res.send(error);
    }
};

export const crearChat = async (req, res) => {
    try {

        const {description, destinatario, emisor, emisorNickname, hora} = req.body;
        const chat = new Chats({description, destinatario, emisor, emisorNickname, hora});


        if(req.files?.image){
            const result = await subirImagen(req.files.image.tempFilePath);
            chat.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            
            await fs.unlink(req.files.image.tempFilePath)

        }

        await chat.save();
        return res.send(chat);

    } catch (error) {
        return res.send(error);
    }
};

export const editarChat = async (req, res) => {

    try {

        const { id } = req.params;
        const chatEditado = await Chats.findByIdAndUpdate(id, req.body, {new: true});
        return res.send(chatEditado)

    } catch (error) {
        return res.send(error);
    }

};

export const eliminarChat = async (req, res) => {

    try {
        const {id} = req.params;
        const chatBorrado = await Chats.findByIdAndDelete(id);

        if(chatBorrado.image?.public_id){
            await borrarImagen(chatBorrado.image.public_id);
        }

        return res.send("chat borrado");

    } catch (error) {
        return res.send(error);
    }

};




//FUNCIONES PARA USUARIOS

export const obtenerUsuario = async (req, res) => {
    try {
        const {email, password} = req.body;
        const getUser = await Users.find({email, password}).lean();
        delete getUser[0].password;
        return res.send(getUser);

    } catch (error) {
        return res.send(error);
    }
};

export const crearUsuario = async (req, res) => {
    try {
        
        const {nickname, email, password, state, connection} = req.body;
        const revisarMail = await Users.find().lean();
        for(let key in revisarMail){
            if(revisarMail[key].email === email){
                await fs.unlink(req.files.image.tempFilePath);
                return res.status(400).send("error hay un mail duplicado")
            }
        }
        

        const usuarionuevo = new Users({nickname, email, password, state, connection});
        if(req.files?.image){
            const result = await subirImagen(req.files.image.tempFilePath);
            usuarionuevo.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }

        }
        await fs.unlink(req.files.image.tempFilePath);

        await usuarionuevo.save();
        return res.send(usuarionuevo);

    } catch (Error) {
        return res.send(Error);
    }
};

export const editarUsuario = async (req, res) => {
    try {

        const {id} = req.params;
        const usuarioParaEditar = await Users.findById(id);
        if(req.files?.image){
            await borrarImagen(usuarioParaEditar.image.public_id);
            const result = await subirImagen(req.files.image.tempFilePath);
            req.body.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            await fs.unlink(req.files.image.tempFilePath);

        }
        const usuarioEditado = await Users.findByIdAndUpdate(id, req.body, {new: true});
        usuarioEditado.password = '';

        return res.send(usuarioEditado);

    } catch (error) {
        return res.send(error);
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        
        const {id} = req.params;
        const usuarioBorrado = await Users.findByIdAndDelete(id);
        if(usuarioBorrado.image?.public_id){
            await borrarImagen(usuarioBorrado.image.public_id);
        }
        return res.send("usuario eliminado");

    } catch (error) {
        return res.send(error);
    }

};

export const obtenerTodosLosUsuarios = async (req, res) => {
    try {

        const usuarios = await Users.find().lean();
        const arr = [];
        for(let key in usuarios){
           delete usuarios[key].password;
           arr.push(usuarios[key]);
        }
        return res.send(arr);


    } catch (error) {
        return res.send(error);
    }
};

export const obtenerUnUsuario = async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Users.findById(id);
        usuario.password = '';
        return res.send(usuario);
    } catch (error) {
        return res.send(error);
    }
};
