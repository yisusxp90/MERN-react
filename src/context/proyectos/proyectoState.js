import React, {useReducer} from 'react';
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR} from "../../types";
import clienteAxios from "../../config/axios";

const ProyectoState = props => {

    const inicialState = {
        formulario: false,
        proyectos: [

        ],
        errorFormulario: false,
        proyectoSeleccionado: null,
        mensaje: null
    };

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, inicialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    };

    const obtenerProyectos = async () => {

        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });
        }catch (e) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            };
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    };

    const agregarProyecto = async proyecto => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            });
        }catch (e) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            };
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    };

    // VALIDA FORMULARIO ṔOR ERRORES
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    };

    // Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    };

    // ELMINA un proyectio
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
        }catch (e) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            };
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    };

    return (
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorFormulario: state.errorFormulario,
                proyectoSeleccionado: state.proyectoSeleccionado,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );

};

export default ProyectoState;