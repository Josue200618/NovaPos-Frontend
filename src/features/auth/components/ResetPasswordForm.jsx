import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import axios from "../../../config/axios";

import {

    Stack,
    TextField,
    Button,
    Typography,
    Divider,
    Link

} from "@mui/material";
import SnackbarAlert from "../../../components/ui/SnackbarAlert";

export default function ResetPasswordForm() {

    const navigate = useNavigate();

    const location = useLocation();

    const correo = location.state?.correo || "";

    const [codigo, setCodigo] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({

    open: false,

    severity: "success",

    message: ""

});

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post("/reset-password", {

                correo,

                codigo,

                password,

                confirmPassword

            });

           setSnackbar({

                open: true,

                severity: "success",

                message: "Contraseña actualizada correctamente."

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

                    "Error al cambiar la contraseña."

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

            onSubmit={handleSubmit}

        >

            <Typography

                textAlign="center"

                color="text.secondary"

            >

                Ingresa el código que recibiste y tu nueva contraseña.

            </Typography>

            <TextField

                label="Código"

                fullWidth

                value={codigo}

                onChange={(e)=>setCodigo(e.target.value)}

            />

            <TextField

                label="Nueva contraseña"

                type="password"

                fullWidth

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

            />

            <TextField

                label="Confirmar contraseña"

                type="password"

                fullWidth

                value={confirmPassword}

                onChange={(e)=>setConfirmPassword(e.target.value)}

            />

            <Button

                type="submit"

                variant="contained"

                size="large"

                disabled={loading}

            >

                {

                    loading

                    ?

                    "Guardando..."

                    :

                    "Guardar contraseña"

                }

            </Button>

            <Divider />

            <Typography textAlign="center">

                <Link

                    component="button"

                    onClick={()=>navigate("/login")}

                >

                    Volver al Login

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