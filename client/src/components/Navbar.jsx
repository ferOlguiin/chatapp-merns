import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/appContext";
import {VscComment} from 'react-icons/vsc';

export const Navbar = ({socket}) => {

  const navigate = useNavigate();
  const {user, setUser} = useUser();


  const handleSesion = () => {
    socket.disconnect();
    setUser('');
    navigate("/");    
  };

  return (
    <div>
        <nav className="navbar bg-dark shadow px-5 py-2 justify-content-sm-between justify-content-center">
            <Link to="/userpanel" className="m-0 p-0 fs-2 text-decoration-none text-warning fw-bold">Chat-App <VscComment className="text-warning mb-1"/></Link>
            <div className="d-flex flex-column justify-content-center align-items-center p-1 me-3">
              <div className="dropdown">
                  <button className="btn btn-outline-warning px-3 btn-sm dropdown-toggle rounded-pill fs-6" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img alt="imgUser" src={user.image.secure_url} className="rounded-circle me-2" style={{width: 34, height: 34}}/>
                    {user.nickname}
                  </button>
                  <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
                    <li><Link className="dropdown-item text-warning rounded" to="/profile">Ver perfil</Link></li>
                    <li><button className="dropdown-item text-danger rounded" onClick={handleSesion}>Cerrar sesion</button></li>
                  </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

