import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/appContext";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState } from "react";


export const FormEdit = () => {

    const params = useParams();
    const navigate = useNavigate();
    const {user, editarUsuario} = useUser();
    const [dataForm, setDataForm] = useState({
        nickname: user.nickname,
        email: user.email,
        password: '',
        state: user.state
    })

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 text-white'>
        <Formik initialValues={dataForm}
                enableReinitialize
                validationSchema={Yup.object({
                    nickname: Yup.string().required("Nombre de usuario requerido"),
                    email: Yup.string().required("Email requerido"),
                    password: Yup.string().required("Contraseña requerida")
                  })}
                onSubmit={async (values, actions) => {
                    await editarUsuario(params.id, values);
                    actions.setSubmitting(true);
                    navigate("/profile");
                }}
        >

            {({handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form-control-sm p-5 rounded border-top border-bottom border-2 border-success">
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h2 className="text-white m-0 pe-5">Edita tus datos</h2>
                        <button className='btn btn-dark btn-sm px-1 py-0' disabled={isSubmitting} onClick={() => navigate("/profile")}>Volver</button>
                    </div>

                    <label className='form-label text-success m-0 fw-bold fst-italic' htmlFor="n">Nombre de usuario</label>
                    <Field className="form-control m-1" placeholder='ejemplo123' name="nickname" id="n"/>
                        <ErrorMessage name='nickname' component="p" className="text-danger"/>

                    <label className='form-label text-success m-0 fw-bold fst-italic' htmlFor="c">Correo electrónico</label>
                    <Field className="form-control m-1" placeholder='ejemplo123@gmail.com' name="email" id="c"/>
                        <ErrorMessage name='email' component="p" className="text-danger"/>
                    
                    <label className='form-label text-success m-0 fw-bold fst-italic' htmlFor="p">Contraseña</label>
                    <Field className="form-control m-1" placeholder='***********' name="password" id="p"/>
                        <ErrorMessage name='password' component="p" className="text-danger"/>

                    
                    <button className='btn btn-primary mt-2' type='submit' disabled={isSubmitting}>{isSubmitting ? "Editando..." : "Editar"}</button>

                </Form>
            )}

        </Formik>
    </div>
  )
};