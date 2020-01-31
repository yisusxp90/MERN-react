import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";


const NuevaCuenta = (props) => {

    // extraemos lo enviado en el alertaState a traves del alertaContext.js
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    // extraemos lo enviado en el authState a traves del authContext.js
    const authContext = useContext(AuthContext);
    const {registrarUsuario, mensaje, autenticado} = authContext;

    // en caso de que el usuario ya este registrado
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
        nombre: '',
        email: '',
        password: '',
        confirmarPassword: ''
    });

    const {nombre, email, password, confirmarPassword} = usuario;

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(email.trim() === '' || nombre.trim() === '' || password.trim() === '' || confirmarPassword === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // password minimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password Posee una longitud invalida', 'alerta-error');
            return;
        }
        // password iguales
        if(password !== confirmarPassword) {
            mostrarAlerta('Los password no son iguales', 'alerta-error');
            return;
        }
        // pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });

    };

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>

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
                        <label htmlFor="confirmarPassword">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmarPassword"
                            name="confirmarPassword"
                            placeholder="Confirmar password"
                            onChange={onChange}
                            value={confirmarPassword}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesion
                </Link>
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            </div>
        </div>
    );
}

export default NuevaCuenta;