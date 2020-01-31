import React, {Fragment, useContext} from 'react';
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTarea = () => {

    // obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);

    const { proyectoSeleccionado, eliminarProyecto } = proyectosContext;

    // obtener tareas del proyecto
    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    // si no hay proyecto seleccionado
    if(!proyectoSeleccionado) return <h2>Selecciona un proyecto</h2>;

    // array distructuring para extraer el proyecto seleccionado
    const [proyectoActualSeleccionado] = proyectoSeleccionado;


    const onClickEliminar = () => {
        eliminarProyecto(proyectoActualSeleccionado._id);
    };

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActualSeleccionado.nombre}</h2>
            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ?
                    (
                        <li className="tarea"><p>No hay tareas</p></li>
                    )
                    :
                    <TransitionGroup>
                        {tareasProyecto.map(tarea => (
                            <CSSTransition key={tarea._id} timeout={200} classNames="tarea">

                                <Tarea
                                    tarea={tarea}
                                />

                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-primario"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}

export default ListadoTarea;