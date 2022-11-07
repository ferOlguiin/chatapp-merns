import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { useUser } from '../context/appContext';


export const Registro = () => {

    const navigate = useNavigate();
    const {crearUsuario} = useUser();
    const [dataForm, setDataForm] = useState({
        nickname: '',
        email: '',
        password: '',
        image: null,
        state: 'Sin estado, agrega uno',
        connection: 'Offline'
    });




  return (
    <div className='bg-dark d-flex justify-content-center align-items-center vh-100 text-white'>
        <Formik initialValues={dataForm}
                enableReinitialize
                validationSchema={Yup.object({
                    nickname: Yup.string().max(13, 'El nickname no puede tener mas de 13 caracteres').trim().required("Nombre de usuario requerido"),
                    email: Yup.string().email('Introduce un email válido porfavor, no olvides el @').trim().lowercase().required("Email requerido"),
                    password: Yup.string().min(8, 'Necesitas una contraseña con un minimo de 8 caracteres').trim().required("Contraseña requerida")
                  })}
                onSubmit={async (values, actions) => {
                    await crearUsuario(values);
                    actions.setSubmitting(true);
                    navigate("/");
                }}
        >

            {({handleSubmit, setFieldValue, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form-control-sm p-5 rounded border-top border-bottom border-2 border-success">
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h2>Registrar usuario</h2>
                        <button className='btn btn-outline-light btn-sm px-1 py-0' disabled={isSubmitting} onClick={() => navigate("/")}>Volver</button>
                    </div>

                    <label className='form-label text-success m-0 fw-bold fst-italic' htmlFor="n">Nombre de usuario</label>
                    <Field className="form-control mx-0 mt-1 mb-4" placeholder='ejemplo123' name="nickname" id="n"/>
                        <ErrorMessage name='nickname' component="p" className="text-danger"/>

                    <label className='form-label text-success m-0 fw-bold fst-italic' htmlFor="c">Correo electronico</label>
                    <Field className="form-control mx-0 mt-1 mb-4" placeholder='ejemplo123@gmail.com' name="email" id="c"/>
                        <ErrorMessage name='email' component="p" className="text-danger"/>
                    
                    <label className='form-label text-success m-0 fw-bold fst-italic' htmlFor="p">Contraseña</label>
                    <Field className="form-control mx-0 mt-1 mb-4" placeholder='***********' name="password" id="p"/>
                        <ErrorMessage name='password' component="p" className="text-danger"/>

                    <label className='form-label text-success fw-bold m-0 fst-italic' htmlFor="i">Agregue una foto de perfil</label>
                    <input disabled={isSubmitting} className="form-control mb-4 mt-1 mx-0" id='i' type="file" onChange={(e) => setFieldValue("image", e.target.files[0])} name="image" />
                        <ErrorMessage name='image' component="p" className="text-danger"/>
                    
                    <button className='btn btn-primary' type='submit' disabled={isSubmitting}>{isSubmitting ? "Registrando..." : "Registrarse"}</button>

                </Form>
            )}
        </Formik>
    </div>
  )
}

