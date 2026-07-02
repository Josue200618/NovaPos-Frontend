import api from "../../../config/axios";

export const saleService = {

    getAll: async (page = 1, limit = 10) => {

    const { data } = await api.get(
        `/ventas?page=${page}&limit=${limit}`
    );

    return data;

},

getAllDashboard: async () => {

    const { data } = await api.get("/ventas", {

        params: {

            page: 1,

            limit: 1000

        }

    });

    return data;

},

    create: async (sale) => {

        const { data } = await api.post("/ventas", sale);

        return data;

    },

    annul: async (id) => {

        const { data } = await api.put(`/ventas/anular/${id}`);

        return data;

    }

};