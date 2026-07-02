import axios from "axios";

const API = "https://api-rest-pos-g48r.onrender.com/api/productos";

const getToken = () => {

    return localStorage.getItem("token");

};

const config = () => ({

    headers: {

        Authorization: `Bearer ${getToken()}`

    }

});

export const productService = {

    async getAll(page = 1, limit = 5) {

    const response = await axios.get(API, {

        ...config(),

        params: {

            page,

            limit

        }

    });

    return response.data;

},

async getAllDashboard() {

    const response = await axios.get(API, {

        ...config(),

        params: {

            page: 1,

            limit: 1000

        }

    });

    return response.data;

},

    async create(producto) {

        const response = await axios.post(

            API,

            producto,

            config()

        );

        return response.data;

    },

    async update(id, producto) {

        const response = await axios.put(

            `${API}/${id}`,

            producto,

            config()

        );

        return response.data;

    },

    async delete(id) {

        const response = await axios.delete(

            `${API}/${id}`,

            config()

        );

        return response.data;

    }

};