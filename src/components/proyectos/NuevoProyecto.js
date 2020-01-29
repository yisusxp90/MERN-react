import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);

    const {formulario, mostrarFormulario, agregarProyecto, mostrarError, errorFormulario} = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const onChangeProyecto = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitProyecto = (e) => {
        e.preventDefault();
        if(nombre.trim() === '') {
            mostrarError();
            return
        };

        agregarProyecto(proyecto);
        guardarProyecto({
            nombre: ''
        });
    };

    const {nombre} = proyecto;
    return (

        <Fragment>

            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >Nueevo Proyecto</button>

            {
                formulario
                ?
                    (
                        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />

                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="AgregarProyecto"
                            />
                        </form>
                    )
                :
                    null
            }
            {errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>

    );
};

export default NuevoProyecto;