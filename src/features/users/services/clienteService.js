import api from '../../../config/axios';

export const clienteService = {

   getAll: async (page = 1, limit = 5) => {

        const response = await api.get("/clientes", {
            params: {
                page,
                limit
            }
        });

        return response.data;

    },

getAllDashboard: async () => {

    const response = await api.get("/clientes", {

        params: {

            page: 1,

            limit: 1000

        }

    });

    return response.data;

},


create: async (userData) => {
const response = await api.post('/clientes/', userData);
return response.data;

},


update: async (id, userData) => {
const response = await api.put(`/clientes/${id}`, userData);
return response.data;

},


delete: async (id) => {
const response = await api.delete(`/clientes/${id}`);
return response.data;

}

};