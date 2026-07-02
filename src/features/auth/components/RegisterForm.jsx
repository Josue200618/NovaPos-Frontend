import { useState } from "react";
import axios from "../../../config/axios";
import {
    Stack,
    TextField,
    Button,
    Typography,
    Link,
    Divider
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../../../components/ui/SnackbarAlert";


export default function RegisterForm() {

    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({

    open: false,

    severity: "success",

    message: ""

});

    const handleRegister = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        await axios.post("/register", {

            nombre,
            correo,
            telefono,
            password,
            confirmPassword

        });
            setSnackbar({

                open: true,

                severity: "success",

                message: "Cuenta creada correctamente."

            });

            setTimeout(() => {

                navigate("/login");

            }, 1200);

    } catch (error) {

       setSnackbar({

    open: true,

    severity: "error",

    message:

        error.response?.data?.message ||

        "Error al registrar usuario"

});

    } finally {

        setLoading(false);

    }

};

    return (

        <>

        <Stack
            component="form"
            spacing={3}
            onSubmit={handleRegister}
            >

            <TextField
                label="Nombre"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                fullWidth
            />

            <TextField
                label="Correo"
                value={correo}
                onChange={(e)=>setCorreo(e.target.value)}
                fullWidth
            />
            <TextField
                label="Teléfono"
                value={telefono}
                onChange={(e)=>setTelefono(e.target.value)}
                fullWidth
            />

            <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                fullWidth
            />

            <TextField
                label="Confirmar contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                fullWidth
            />

           <Button

                type="submit"

                variant="contained"

                size="large"

                disabled={loading}

            >

                {

                    loading ?

                    "Creando..."

                    :

                    "Crear cuenta"

                }

            </Button>

            <Divider />

            <Typography
                textAlign="center"
            >

                ¿Ya tienes cuenta?

                <Link
                    component="button"
                    sx={{ ml: 1 }}
                    onClick={() => navigate("/login")}
                >

                    Iniciar sesión

                </Link>

            </Typography>

        </Stack>

            <SnackbarAlert

                open={snackbar.open}

                severity={snackbar.severity}

                message={snackbar.message}

                onClose={() =>

                    setSnackbar({

                        ...snackbar,

                        open: false

                    })

                }

            />

        </>

    );

}