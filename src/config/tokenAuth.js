import clienteAxios from './axios';

// mandamos el token cuando se logea en los headers para que sea autorizado el request
const tokenAuth = token => {
    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else {
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
};
export default tokenAuth;