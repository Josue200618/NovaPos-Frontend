import api from "../../../config/axios";

export const purchaseService = {

getAll: async (page = 1, limit = 10) => {

    const { data } = await api.get(
        `/compras?page=${page}&limit=${limit}`
    );

    return data;

},

getAllDashboard: async () => {

    const { data } = await api.get("/compras", {

        params: {

            page: 1,

            limit: 1000

        }

    });

    return data;

},

    create: async (purchase) => {

        const { data } = await api.post("/compras", purchase);

        return data;

    },

    annul: async (id) => {

        const { data } = await api.put(`/compras/anular/${id}`);

        return data;

    }

};