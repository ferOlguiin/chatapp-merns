import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/appContext";
import {Formik, Form, ErrorMessage} from 'formik';
import toast from "react-hot-toast";
import {VscNote, VscEdit, VscDeviceCamera, VscCheck, VscChromeClose, VscHome, VscSignOut} from 'react-icons/vsc';
import {BsFillPersonFill} from 'react-icons/bs'

export const Profile = () => {

    const navigate = useNavigate();
    const {user, editarUsuario, borrarUsuario} = useUser();
    const [activar, setActivar] = useState(false);
    const [activar2, setActivar2] = useState(false);
    const [newState, setNewState] = useState(user.state);
    const [wait, setWait] = useState(false);
    const [newImage, setNewImage] = useState({
      image: null
    });

    const handleSubmitState = async (e) => {
      e.preventDefault();
      await editarUsuario(user._id, {state: newState});
      setActivar(false);
    };
   
    const handleDelete = (id) => {
      toast((t) => (
          <div className='container-fluid'>
              <p className='text-white fw-bold'>¿Quieres borrar tu usuario permanentemente?</p>
              <div>
                  <button className='btn btn-danger me-1' onClick={async () => {setWait(true); await borrarUsuario(id); toast.dismiss(t.id); navigate("/")} }>Sí</button>
                  <button className='btn btn-light' onClick={ () => toast.dismiss(t.id) }>No</button>
              </div>
          </div>
      ),
      {
          style: {
              background: "#000000"
          }
      }
      )
  };
    
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
        
                  <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <img src={user.image.secure_url} alt="img" className="rounded-circle" style={{width: 120, height: 120}} />
                    <VscDeviceCamera onClick={() => setActivar2(true)} className="cameraOpacity fs-1 text-white p-2 editImg rounded-circle bg-success"/>
                    {
                        activar2 === false ? '' 
                        : 
                        <Formik
                          initialValues={newImage}
                          enableReinitialize
                          onSubmit={async (values, actions) => {
                            if(values.image){
                              await editarUsuario(user._id, values);
                              setActivar2(false);
                            } else{
                              toast.error("No agregaste ningun archivo");
                              setActivar2(false);
                            };
                            actions.setSubmitting(true);
                            
                          }}
                        >
                            {({handleSubmit, setFieldValue, isSubmitting}) => (
                            <Form onSubmit={handleSubmit}>
                                  <label className='form-label text-primary fw-bold mb-0 mt-3 fst-italic' htmlFor="i">Elija su nueva foto de perfil</label>
                                  <input disabled={isSubmitting} className="form-control my-1" id='i' type="file" onChange={(e) => setFieldValue("image", e.target.files[0])} name="image" />
                                  <ErrorMessage name='image' component="p" className="text-danger"/>
                                  <button className='btn' type='submit' disabled={isSubmitting}>{isSubmitting ? "Editando..." : <VscCheck className="text-success fs-5"/>}</button>
                                  <button type="button" className="btn" onClick={() => setActivar2(false)}><VscChromeClose className="text-danger fs-5"/></button>
                            </Form>
                            )}
                        </Formik>
                      }
                  </div>
                  
                  <div className="d-flex flex-column align-items-start p-2 justify-content-center">

                    <div className="d-flex justify-content-between w-100 align-items-center my-3 shadow p-3 rounded">
                      <BsFillPersonFill className="fs-3 text-secondary me-3"/>
                      <div className="d-flex flex-column justify-content-start mx-1">
                        <p className="m-0 p-0 text-secondary text-center">Nombre</p>
                        <h4 className="m-0 p-0 text-white">{user.nickname}</h4>
                      </div>
                      <Link to={`/editarperfil/${user._id}`}>
                        <VscEdit className="fs-5 text-success ms-3"/>
                      </Link>                    
                    </div>
                    
                    <div className="d-flex justify-content-between w-100 align-items-center my-3 shadow p-3 rounded">
                      <VscNote className="text-secondary fs-3 me-3"/>
                      <div className="d-flex flex-column justify-content-start ms-1">
                        <p className="m-0 p-0 text-secondary text-center">Estado</p>
                        <h4 className="m-0 p-0 text-break text-white">{user.state}</h4>
                      </div>
                      <VscEdit onClick={() => setActivar(true)} className="fs-5 cPointer text-success ms-3"/>
                    </div>
                  
                  </div>
                  
                  {
                    activar === false ? ''
                    :
                    <form className="d-flex" onSubmit={handleSubmitState}>
                      <input className="form-control bg-dark text-white" id="e" maxLength={40} value={newState} onChange={(e) => setNewState(e.target.value)}/>
                      <button type="submit" className="btn"><VscCheck className="fs-5 text-success"/></button>
                      <button onClick={() => setActivar(false)} type="button" className="btn"><VscChromeClose className="fs-5 text-danger"/></button>
                      
                    </form>
                  }

                  <div className="d-flex my-3">
                    <button className="btn" onClick={() => navigate("/userpanel")}><VscHome className="fs-1 bg-light rounded-circle p-1 text-dark"/></button>
                    <a href="/" className="btn text-decoration-none"><VscSignOut className="fs-1 bg-light rounded-circle p-1 text-dark"/></a>
                  </div>
                  
                  <h3 className="text-white text-center">¡Para la eliminación permanente de tu cuenta!</h3>
                  <button className="btn btn-danger m-1" disabled={wait} onClick={() => handleDelete(user._id)}>Borrar usuario</button>

        
        
        

    </div>
  )
}

