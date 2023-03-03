import axios from 'axios';

const url = process.env.REACT_APP_API_BASE_URL;

//FUNCIONES PARA EL USUARIO
export const crearUsuarioRequest = async (nuevoUser) => {
    const form = new FormData();
    for(let key in nuevoUser){
        form.append(key, nuevoUser[key]);
    };
    return await axios.post(`${url}/crearusuario`, form, {
        headers: {
            "Content-Type": "Multipart/form-data"
        }
    })
};
export const obtenerUsuarioRequest = async (dataUser) => await axios.post(`${url}/usuario`, dataUser);
export const obtenerAllUsuariosRequest = async () => await axios.get(`${url}/todoslosusuarios`);
export const borrarUsuarioRequest = async (id) => await axios.delete(`${url}/eliminarusuario/${id}`);
export const editarUsuarioRequest = async (id, nuevaData) => {
    const form = new FormData();
    for(let key in nuevaData){
        form.append(key, nuevaData[key]);
    };
    return await axios.put(`${url}/editarusuario/${id}`, form, {
        headers: {
            "Content-Type": "Multipart/form-data"
        }
    });
};
export const verPerfilDeOtroUsuarioRequest = async id => await axios.get(`${url}/user/${id}`);



//FUNCIONES PARA EL CHAT
export const obtenerChatRequest = async (idDeLosQueChatean) => await axios.post(`${url}/chat`, idDeLosQueChatean);
export const crearChatRequest = async (destinatarioemisor) => await axios.post(`${url}/crearchat`, destinatarioemisor);
export const borrarChatRequest = async (id) => await axios.delete(`${url}/eliminarchat/${id}`);


