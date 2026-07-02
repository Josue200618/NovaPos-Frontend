import api from '../../../config/axios';

export const authService = {

    login: async (credentials) => {
         console.log("Enviando:", credentials);

        const response = await api.post('/login', credentials);
          
        console.log("Respuesta:", response);

        return response.data;

    },

    verifyLoginCode: async (correo, codigo) => {

    const { data } = await api.post(

        "/verify-login-code",

        {

            correo,

            codigo

        }

    );

    return data;

},

};