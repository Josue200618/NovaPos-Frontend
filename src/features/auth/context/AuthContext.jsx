import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(

        localStorage.getItem("token")

    );

    const login = (jwt) => {

        localStorage.setItem("token", jwt);

        setToken(jwt);

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setToken(null);

    };

    return (

        <AuthContext.Provider

            value={{

                token,

                login,

                logout,

                isAuthenticated: !!token

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuthContext = () =>

    useContext(AuthContext);