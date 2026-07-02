import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {

    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {

        setLoading(true);

        try {

            const data = await authService.login({

                correo: email,
                password

            });

            localStorage.setItem("token", data.token);

                localStorage.setItem(

                "usuario",

                JSON.stringify(data.usuario)

            );

            return true;

        } catch (error) {

            console.log(error);

            if (error.response) {
                console.log("STATUS:", error.response.status);
                console.log("DATA:", error.response.data);
            }

            return false;

        } finally {

            setLoading(false);

        }

    };

    const verifyLoginCode = async (correo, codigo) => {

    setLoading(true);

    try {

        const data = await authService.verifyLoginCode(

            correo,

            codigo

        );

        localStorage.setItem(

            "token",

            data.token

        );

        localStorage.setItem(

            "usuario",

            JSON.stringify(data.usuario)

        );

        return true;

    } catch (error) {

        console.log(error);

        return false;

    } finally {

        setLoading(false);

    }

};

    return {

        login,

        verifyLoginCode,

        loading

    };

};