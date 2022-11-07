import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useUser } from '../context/appContext';
import {useNavigate, Link} from 'react-router-dom';
import toast from 'react-hot-toast';

export const Homepage = () => {
    
    const navigate = useNavigate();
    const {obtenerUsuario} = useUser();
    const [dataForm, setDataForm] = useState({
        email: '',
        password: ''
      })

  return (
    <div className='bg-dark d-flex justify-content-center align-items-center vh-100'>
      <Formik initialValues={dataForm}
              validationSchema={Yup.object({
                email: Yup.string().email().trim().lowercase().required("Email requerido"),
                password: Yup.string().trim().required("Contraseña requerida")
              })}
              onSubmit={async (values, actions) => {
                        const res = await obtenerUsuario(values);
                        if(res.length === 1){
                          actions.setSubmitting(true);
                          navigate("/userpanel");
                        } else {
                          toast.error("Mail o contraseña incorrecta", {
                            duration: 4000
                          });
                          actions.resetForm();
                        }
              }}
              enableReinitialize
      >
        {({handleSubmit, isSubmitting}) => (
          <Form onSubmit={handleSubmit} className='form-control-sm p-5 rounded flex-column d-flex'>
              <h3 className="text-white text-center mb-3">Iniciar sesión</h3>
              <label className='form-label text-info m-0 fw-bold fst-italic' htmlFor="e">Email</label>
              <Field className="form-control mt-1 mb-3 mx-0" name="email" id="e"/>
                <ErrorMessage name='email' component="p" className="text-danger"/>

              <label className='form-label text-info m-0 fw-bold fst-italic' htmlFor="c">Contraseña</label>
              <Field className="form-control mt-1 mb-3 mx-0" name="password" id="c"/>
                <ErrorMessage name='password' component="p" className="text-danger"/>
                
              <Link to="/registro" className='text-end text-info text-decoration-none'>¿Sin cuenta? Regístrate</Link>
              <button type='submit' className='btn btn-warning fw-bold mt-4' disabled={isSubmitting}>{isSubmitting ? 'Iniciando sesion...' : 'Iniciar sesion'}</button>  
          </Form>
        )}
      </Formik>
    </div>
  )
};
