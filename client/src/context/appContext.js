import { createContext, useContext, useState } from "react";
import { borrarChatRequest, borrarUsuarioRequest, crearChatRequest, crearUsuarioRequest, editarUsuarioRequest, obtenerAllUsuariosRequest, obtenerChatRequest, obtenerUsuarioRequest, verPerfilDeOtroUsuarioRequest } from "../api/backendConection";
import toast from 'react-hot-toast';


const userContext = createContext();




export const useUser = () => {
    const context = useContext(userContext);
    return context;
}

export const AppContext = ({children}) => {

    const [user, setUser] = useState();
    const [conversacion, setConversacion] = useState([]);



    //FUNCIONES DE USUARIOS
    const obtenerUsuario = async (dataUser) => {
        try {

          const res = await obtenerUsuarioRequest(dataUser);
          setUser(res.data[0]);
          return res.data
        
        } catch (error) {
          console.log(error);
        }
    };
    const obtenerAllUsuarios = async () => {
      const res = await obtenerAllUsuariosRequest();
      return res.data;
    };

    const borrarUsuario = async (id) => {
      await borrarUsuarioRequest(id);
      toast.success("Usuario eliminado correctamente")
      setUser('');
    };
    const editarUsuario = async (id, nuevaData) => {
      const res = await editarUsuarioRequest(id, nuevaData, {new: true});
      setUser(res.data);
    };
    const crearUsuario = async (values) => {
        try {
          await crearUsuarioRequest(values);
          toast.success("Usuario creado correctamente, ahora ingresa con tu mail y contraseña")
        } catch (error) {
          toast.error("El mail que intentaste registrar ya existe, prueba con otro", {
            duration: 5000,
          });
        }
    };
    const verPerfilDeOtroUsuario = async (id) => {
      const res = await verPerfilDeOtroUsuarioRequest(id);
      return res.data;
    };

    //FUNCIONES DE CHATS
    const obtenerChat = async (datos) => {
      const res = await obtenerChatRequest(datos);
      setConversacion(res.data);
    };
    const crearChat = async (obj) => {
      const res = await crearChatRequest(obj);
      return res.data;
    };
    const borrarChat = async (id) => {
      await borrarChatRequest(id);
      setConversacion(conversacion.filter((item) => item._id !== id));
    };


  return (
    <userContext.Provider value={{user, setUser, obtenerUsuario, borrarUsuario, editarUsuario, crearUsuario, verPerfilDeOtroUsuario, crearChat, obtenerChat, conversacion, setConversacion, borrarChat, obtenerAllUsuarios}}>
        {children}
    </userContext.Provider>
  )
};