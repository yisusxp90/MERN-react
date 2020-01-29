import React, {useState, useContext, useEffect} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {

    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    const {nombre} = tarea;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { agregarTarea, validarTarea, errorTarea, obtenerTareas, tareaSeleccionada, actualizarTarea } = tareasContext;

    // si hay una tarea seleccionada en la edicion
    useEffect(() => {
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada);
        }else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaSeleccionada]);

    // obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);

    const {proyectoSeleccionado} = proyectosContext;

    // si no hay proyecto seleccionado
    if (!proyectoSeleccionado) return null;

    // array distructuring para extraer el proyecto seleccionado
    const [proyectoActualSeleccionado] = proyectoSeleccionado;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log(nombre);
        if(nombre.trim() === ''){
            validarTarea(true);
            return;
        }

        // si es edicion o es nueva tarea
        if(tareaSeleccionada === null){
            // tarea nueva
            tarea.proyectoId = proyectoActualSeleccionado.id;
            tarea.state = false;
            agregarTarea(tarea);
        }else{
            actualizarTarea(tarea);
        }

        //obtener y fltrar las tareas del proyecto actual
        obtenerTareas(proyectoActualSeleccionado.id);
        guardarTarea({
            nombre: ''
        });

    };

    return (
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea....."
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTarea ? <p className="error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTarea;