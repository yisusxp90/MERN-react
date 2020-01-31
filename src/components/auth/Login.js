import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {

    // extraemos lo enviado en el alertaState a traves del alertaContext.js
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    // extraemos lo enviado en el authState a traves del authContext.js
    const authContext = useContext(AuthContext);
    const {iniciarSesion, mensaje, autenticado} = authContext;

    // en caso de que el password o usuario no existe
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history]);

    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    const {email, password} = usuario;

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        iniciarSesion({
            email,
            password
        });
    };

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesion</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa Email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar sesion"/>
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            </div>
        </div>
    );
}

export default Login;