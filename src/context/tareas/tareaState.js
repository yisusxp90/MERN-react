import React, {useReducer} from 'react';
import TareaReducer from "./tareaReducer";
import TareaContext from "./tareaContext";
import {TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = props => {

    const inicialState = {
        tareas: [
        ],
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    };
    const [state, dispatch] = useReducer(TareaReducer, inicialState);

    // obtener las tareas de un proyecto
    const obtenerTareas = async proyectoId => {
        try {
            // enviamos parametros en el get y se lee desde el server como req.query
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto: proyectoId}});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        }catch (e) {
            console.log(e);
        }
    };

    // agregar tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });
        }catch (e) {
            console.log(e);
        }
    };

    // valida y muestra error en caso de ser necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    const eliminarTarea = async (id, proyectoId) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto: proyectoId}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        }catch (e) {
            console.log(e);
        }
    };

    // editar tarea
    // extrae una tare para edicion
    const actualizarTarea = async tarea => {

        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
        try {
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        }catch (e) {
            console.log(e);
        }
    };
    // extrae una tare para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    };

    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );
};

export default TareaState;