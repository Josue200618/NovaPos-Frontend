import api from "../../../config/axios";

export const providerService = {

 getAll: async (page = 1, limit = 5) => {

    const { data } = await api.get("/proveedores", {

        params: {

            page,

            limit

        }

    });

    return data;

},

getAllDashboard: async () => {

    const { data } = await api.get("/proveedores", {

        params: {

            page: 1,

            limit: 1000

        }

    });

    return data;

},

    create: async (provider) => {

        const { data } = await api.post("/proveedores", provider);

        return data;

    },

    update: async (id, provider) => {

        const { data } = await api.put(`/proveedores/${id}`, provider);

        return data;

    },

    delete: async (id) => {

        const { data } = await api.delete(`/proveedores/${id}`);

        return data;

    }

};