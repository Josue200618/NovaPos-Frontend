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

export default function ForgotPasswordForm() {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");

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

            await axios.post("/forgot-password", {

                correo

            });

            setSnackbar({

                open: true,

                severity: "success",

                message: "Se envió un código a tu correo."

            });

            setTimeout(() => {

                navigate("/reset-password", {

                    state: {

                        correo

                    }

                });

            }, 1200);

        } catch (error) {

            setSnackbar({

            open: true,

            severity: "error",

            message:

                error.response?.data?.message ||

                "Error al enviar el código."

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

                Escribe el correo asociado a tu cuenta.

            </Typography>

            <TextField

                label="Correo"

                fullWidth

                value={correo}

                onChange={(e) =>

                    setCorreo(e.target.value)

                }

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

                        "Enviando..."

                        :

                        "Enviar código"

                }

            </Button>

            <Divider />

            <Typography

                textAlign="center"

            >

                ¿Recordaste tu contraseña?

                <Link

                    component="button"

                    sx={{ ml: 1 }}

                    onClick={() =>

                        navigate("/login")

                    }

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