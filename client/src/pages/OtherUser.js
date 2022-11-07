import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../context/appContext";
import {Navbar} from '../components/Navbar';
import { Footer } from "../components/Footer";

export const OtherUser = () => {

    const navigate = useNavigate();
    const [perfil, setPerfil] = useState({
        nickname: '',
        email: '',
        state: '',
        connection: '',
        image: null
    })
    
    const params = useParams();
    const {verPerfilDeOtroUsuario} = useUser();


    useEffect(() => {
        (async () => {
          const data = await verPerfilDeOtroUsuario(params.id);
          setPerfil(data);
        })();
      }, [params.id]);

  return (
    <div>
      <Navbar/>
      <div className="text-white my-5 py-5 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center border-bottom border-4 border-secondary rounded mb-4 p-4">
            {
              perfil.image ? <img src={perfil.image.secure_url} className="rounded-circle me-4" style={{width: 110, height: 110}}/> : 'IMG not found'
            }
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="m-0">{perfil.nickname}</h1>
                <span className="ms-1 mt-1">{perfil.connection}</span>
              </div>
              <p>{perfil.email}</p>
            </div>
          </div>
          <h2 className="m-1">Estado</h2>
          <h4>"{perfil.state}"</h4>
          <button className="btn btn-outline-danger mt-5" onClick={() => navigate("/userpanel")}>Volver</button>      
        </div>
        <Footer/>
    </div>
  )
}

