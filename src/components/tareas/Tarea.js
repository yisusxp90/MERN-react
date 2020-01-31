import React, {useContext} from 'react';
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({tarea}) => {

    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, guardarTareaActual, actualizarTarea } = tareasContext;

    // obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyectoSeleccionado} = proyectosContext;
    // array distructuring para extraer el proyecto seleccionado
    const [proyectoActualSeleccionado] = proyectoSeleccionado;

    // eliminar tarea
    const handleEliminar = (id) => {
        eliminarTarea(id, proyectoActualSeleccionado._id);
        obtenerTareas(proyectoActualSeleccionado._id);
    };

    const cambiarEstado = (tarea) => {
        if(tarea.estado){
            tarea.estado = false
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    };

    const seleccionarTarea = (tarea) => {
        guardarTareaActual(tarea);
    };

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                ?
                    (
                    <button
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                    >Completo</button>
                    )
                :
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() => cambiarEstado(tarea)}
                    >Incompleto</button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => handleEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;