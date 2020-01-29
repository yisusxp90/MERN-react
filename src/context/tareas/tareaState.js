import React, {useReducer} from 'react';
import TareaReducer from "./tareaReducer";
import TareaContext from "./tareaContext";
import {TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA} from "../../types";
import uuid from 'uuid';

const TareaState = props => {

    const inicialState = {
        tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 1},
            {id: 4, nombre: 'Elegir histing', estado: true, proyectoId: 2},
            {id: 5, nombre: 'Elegir histing', estado: true, proyectoId: 3},
            {id: 6, nombre: 'Elegir histing', estado: true, proyectoId: 4}
        ],
        tareasProyecto: null,
        errorTarea: false,
        tareaSeleccionada: null
    };
    const [state, dispatch] = useReducer(TareaReducer, inicialState);

    // obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    };

    // agregar tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuid.v4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    };

    // valida y muestra error en caso de ser necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    const eliminarTarea = (id) => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        });
    };

    const cambiarEstadoTarea = (tarea) => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    };

    // extrae una tare para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    };

    // editar tarea
    // extrae una tare para edicion
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        });
    };

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );
};

export default TareaState;