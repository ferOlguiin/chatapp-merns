import axios from 'axios';



//FUNCIONES PARA EL USUARIO
export const crearUsuarioRequest = async (nuevoUser) => {
    const form = new FormData();
    for(let key in nuevoUser){
        form.append(key, nuevoUser[key]);
    };
    return await axios.post("/crearusuario", form, {
        headers: {
            "Content-Type": "Multipart/form-data"
        }
    })
};
export const obtenerUsuarioRequest = async (dataUser) => await axios.post("/usuario", dataUser);
export const obtenerAllUsuariosRequest = async () => await axios.get("/todoslosusuarios");
export const borrarUsuarioRequest = async (id) => await axios.delete("/eliminarusuario/" + id);
// export const editarUsuarioRequest = async (id, nuevaData) => await axios.put("/editarusuario/" + id, nuevaData);

export const editarUsuarioRequest = async (id, nuevaData) => {
    const form = new FormData();
    for(let key in nuevaData){
        form.append(key, nuevaData[key]);
    };
    return await axios.put("/editarusuario/" + id, form, {
        headers: {
            "Content-Type": "Multipart/form-data"
        }
    });
};

export const verPerfilDeOtroUsuarioRequest = async id => await axios.get("/user/" + id);



//FUNCIONES PARA EL CHAT
export const obtenerChatRequest = async (idDeLosQueChatean) => await axios.post("/chat", idDeLosQueChatean);
export const crearChatRequest = async (destinatarioemisor) => await axios.post("/crearchat", destinatarioemisor);
export const borrarChatRequest = async (id) => await axios.delete("/eliminarchat/" + id);


