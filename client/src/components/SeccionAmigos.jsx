import { useState, useEffect, useRef } from "react"
import { useUser } from "../context/appContext";
import { VscTrash } from "react-icons/vsc";
import { Link } from "react-router-dom";
import {IoPaperPlaneSharp, IoReloadOutline} from 'react-icons/io5';
import { Footer } from "./Footer";
import toast from "react-hot-toast";


export const SeccionAmigos = ({user, socket}) => {
    
    //estado para la referencia
    const messagesEndRef = useRef(null);

    //estado para que al seleccionar un usuario de la lista de usuarios, este sea marcado como un destinatario
    const [destinatario, setDestinatario] = useState('');

    //estados para la busqueda de usuarios
    const [userSearch, setUserSearch] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    //estado para colocar el valor del input de los mensajes
    const [message, setMessage] = useState('');

    //estado para mostrar el nomobre y la imagen del usuario destinatario como titulo en la parte de mensajes
    const [usuario, setUsuario] = useState({
        nickname: '',
        image: null
    });
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const {conversacion, obtenerAllUsuarios, setConversacion, obtenerChat, borrarChat, crearChat} = useUser();

    //estado para la obtecion de todos los usuarios que vengan de la function obtenerAllUsuarios
    const [usuarios, setUsuarios] = useState([]);


    //obtencion de todos los usuarios con una funcion anonima autoinvocada
    useEffect(() => { 
            
            (async() => {
                const res = await obtenerAllUsuarios();
                setUsuarios(res);
                setUserSearch(res);
            })();
        
    }, []);
    

    //recepcion de datos del backend luego de la emision del evento 'user'
    useEffect(() => {
        const datos = (data) => {
            setUsuarios(usuarios.map((item) => (item._id === data._id ? data : item)));    
            setUserSearch(userSearch.map((item) => (item._id === data._id ? data : item)));    
        }
        socket.on('user', datos);

        return () => {socket.off('user', datos);}

    }, [usuarios]);

    //filtracion de usuarios para que el usuario que ingresa no aparezca en la lista de usuarios para chatear
    let nuevoDatos = usuarios.filter((item) => item.email !== user.email);

    
    //funcion para que al momento de entrar al chat de un usuario se muestren los mensajes mas recientes, o sea los ultimos.
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      };

    //funcion submit del formulario de mensajes  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message !== ''){
            const chat = await crearChat({description: message, destinatario: destinatario, emisor: user._id, emisorNickname: user.nickname, hora: time});
            socket.emit('message', message, user._id, user.nickname, time, destinatario);
            setMessage('');
            if(user._id === chat.emisor && chat.destinatario === destinatario){
                setConversacion([...conversacion, chat]);
            }
        } else {
            toast.error("No se permiten mensajes vacios", {
                duration: 3000,
                style: {
                    background: "black",
                    color: "white"
                }
            })
        }
    };

    
    //renderizado de mensajes recibiendo la data del backend en "message" para luego insertarlos en la conversacion  
    useEffect(() => {
        scrollToBottom();
        const receiveMessage = (message) => {
            if(message.destinatario === user._id && message.emisor && destinatario){
                setConversacion([...conversacion, message])
            }else{
                console.log("error")
            }
        };
        
        socket.on("message", receiveMessage);

        return () => {
            socket.off("message", receiveMessage);
        }
    }, [conversacion]);

    const handleSearch = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    };

    const filtrar = (dato) => {
        const result = userSearch.filter((item) => {
            if(item.nickname.toString().toLowerCase().includes(dato.toLowerCase())){
              return item
            }
          })
        setUsuarios(result);
      };

return (
    <div>
        <main className="bg-dark">
            <div className="container-fluid px-3">
                <div className="row">

                    {/* COLUMNA IZQUIERDA */}

                    <div className="col-sm-4 d-flex flex-column">
                                <h3 className="text-center text-white mt-3 mb-4">Usuarios</h3>
                                <div className="d-flex mb-3">
                                    <input type="text" className="form-control bg-dark text-white" value={busqueda} onChange={handleSearch} placeholder="Buscar usuario por nombre..."/>
                                    <button className="btn btn-dark btn-sm ms-1" onClick={() => {filtrar(''); setBusqueda('')}}><IoReloadOutline className="text-white fs-5"/></button>
                                </div>
                                <div className="user_container px-2">
                                    {
                                        
                                    nuevoDatos.length > 0 ? nuevoDatos.map(item => <div className="m-1 p-2 d-flex justify-content-center align-items-center btn btn-outline-dark rounded-pill border-none" onClick={async () => {
                                        await obtenerChat({destinatario: item._id, emisor: user._id, destinatario2: user._id, emisor2: item._id});
                                        setUsuario({nickname: item.nickname, image: item.image});
                                        setDestinatario(item._id);
                                    }} key={item._id}>
                                        <img src={item.image.secure_url} alt="imgUser" style={{width:25, height:25}} className="rounded-circle me-2"/>
                                        <h6 className={item.connection === "🟢" ? "m-0 p-0 text-success" : "m-0 p-0 text-white"}>{item.nickname}  {item.connection}</h6>    
                                    </div>) : <div className="d-flex justify-content-center align-items-center">No hay usuarios</div>

                                    }
                                </div>   

                    </div>
                    
                    {/* COLUMNA DERECHA */}

                    {
                        destinatario !== '' ? 
                        <div className="col-sm-8 p-0 flex-column d-flex text-white border-start border-1 border-secondary">

                            {/* EL NAVBAR DEL CONTENEDOR DE MENSAJES CON LA IMAGEN Y EL NICKNAME DEL USUARIO SELECCIONADO */}

                            <div className="pt-3 pb-2 shadow d-flex justify-content-center align-items-center">
                                <Link className="text-decoration-none" to={`/user/${destinatario}`}>
                                    <img alt="imgUsers" src={usuario.image.secure_url} style={{width: 45, height: 45}} className="rounded-circle me-3 border-1 border"/>
                                </Link>
                                <Link className="text-decoration-none" to={`/user/${destinatario}`}>
                                    <h3 className="m-0 fw-bold text-white">{usuario.nickname}</h3>
                                </Link>
                            </div>

                            {/* CONTENEDOR DE MENSAJES, LA PRIMER FILA DE 12 ES DEL EMISOR, LA SEGUNDA DEL RECEPTOR */}
                            <div className="d-flex flex-column">
                                <div className="container container_conversacion py-3" id="msj">
                                {
                                conversacion.length > 0 ? conversacion.map((item, index) => <div key={index} className="row text-dark">
                                        {
                                            item.emisor === user._id ? <div className="col-sm-12 d-flex justify-content-end align-items-center">
                                                <div className="d-flex bg-danger bg-opacity-50 py-2 px-3 m-1 rounded">
                                                    <p className="my-0 me-3 text-break text-light">{item.description}</p>
                                                    <p className="my-0 text-secondary fw-light">{item.hora}</p>
                                                    <button className="btn p-0 m-0" onClick={async () => borrarChat(item._id)}><VscTrash className="ms-1 pb-1 fs-5 text-danger"/></button>
                                                </div>
                                            </div> 
                                            : 
                                            item.destinatario === user._id && item.emisor === destinatario ? <div className="col-sm-12 d-flex justify-content-start align-items-center">
                                                <div className="d-flex bg-primary bg-opacity-50 py-2 px-3 m-1 rounded">
                                                    <p className="my-0 text-secondary me-3 fw-light">{item.hora}</p>
                                                    <p className="my-0 text-light text-break">{item.description}</p>
                                                </div>
                                            </div> : ''
                                            
                                        }
                                </div>) : <div className="overflow-auto text-white d-flex justify-content-center align-items-center" style={{height: 450}}>No hay mensajes</div>
                                }
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* FORMULARIO PARA ENVIAR MENSAJES ENTRE USUARIOS */}

                                <form className="d-flex justify-content-center align-items-center pt-1 pb-2 px-3" onSubmit={handleSubmit}>
                                    <input onChange={e => setMessage(e.target.value)} placeholder="Envía un mensaje..." className="form-control p-2 border border-1 border-secondary rounded-pill text-white bg-dark" value={message}/>
                                    <button className="btn btn-warning p-2 ms-1 btn-sm rounded-circle" type="submit"><IoPaperPlaneSharp className="text-dark fs-4"/></button>
                                </form>
                        </div>
                    </div> : <div className="col-sm-8 d-flex justify-content-center align-items-center border-start border-secondary border-1 text-white" style={{height: 603}}>
                        <h3 className="text-center m-0 p-0">Seleccione un usuario para abrir una conversación</h3>
                    </div>
                    }
                    
                </div>
            </div>
        </main>

        <Footer/>

    </div>
  )
}

