import { Navbar } from "../components/Navbar";
import { SeccionAmigos } from "../components/SeccionAmigos";
import { useUser } from "../context/appContext"
import io from 'socket.io-client';
import { useEffect } from "react";


export const UserPanel = () => {

    const socket = io('http://localhost:4000');
    const {user} = useUser();

    useEffect(() => {
      if(user){
        socket.emit('user', user._id);
        return () => {
          socket.off('user', user._id);
        }
      }
    });


  return (
    <div>
        {
            user === undefined ? <div className="d-flex justify-content-center align-items-center vh-100"><h1>No se encontro ningun usuario con ese nombre o esa contraseña</h1></div> : 
            <div>
                <Navbar socket={socket}/>
                <SeccionAmigos user={user} socket={socket}/>
            </div> 
        }
    </div>
  )
}

