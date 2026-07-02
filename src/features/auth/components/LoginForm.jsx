import {

TextField,
Button,
Stack,
CircularProgress

} from "@mui/material";

import {
    Typography,
    Divider,
    Link,
    Box
} from "@mui/material";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import LoginCodeDialog from "./LoginCodeDialog";
import SnackbarAlert from "../../../components/ui/SnackbarAlert";

export default function LoginForm(){

    const navigate=useNavigate();
    const {

    login,

    verifyLoginCode,

    loading

} = useAuth();

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [dialogOpen,setDialogOpen]=useState(false);
    const [code,setCode]=useState("");


    const handleSubmit=async(e)=>{

        e.preventDefault();

        const ok=await login(email,password);

        if(ok){

             setDialogOpen(true);

        }else{

    setSnackbar({

        open: true,

        severity: "error",

        message: "Correo o contraseña incorrectos"

    });

}
    }

    const [snackbar, setSnackbar] = useState({

    open: false,

    severity: "success",

    message: ""

});

    return(

        <>

        <form onSubmit={handleSubmit}>

            <Stack spacing={3}>

                <TextField

                    label="Correo"

                    fullWidth

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <TextField

                    label="Contraseña"

                    type="password"

                    fullWidth

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                />

                <Button

                    type="submit"

                    variant="contained"

                    size="large"

                    disabled={loading}

                >

                    {

                        loading ?

                        <CircularProgress size={22}/>

                        :

                        "Iniciar sesión"

                    }

                </Button>

                <Box textAlign="center">

                    <Link
                        component="button"
                        underline="hover"
                        onClick={() => navigate("/forgot-password")}
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>

                </Box>

                <Divider>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        o
                    </Typography>

                </Divider>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        ¿No tienes cuenta?
                    </Typography>

                    <Link
                        component="button"
                        underline="hover"
                        fontWeight="bold"
                        onClick={() => navigate("/register")}
                    >
                        Registrarse
                    </Link>

                </Box>

            </Stack>

            

        </form>

            <LoginCodeDialog

                open={dialogOpen}

                code={code}

                setCode={setCode}

                email={email}

                onClose={()=>setDialogOpen(false)}

                onConfirm={async()=>{

                const ok = await verifyLoginCode(

                    email,

                    code

                );

                if(ok){

                    // Cerrar el diálogo
                    setDialogOpen(false);

                    // Mostrar mensaje de éxito
                    setSnackbar({

                        open: true,

                        severity: "success",

                        message: "¡Inicio de sesión exitoso!"

                    });

                    // Esperar un momento antes de entrar al Dashboard
                    setTimeout(()=>{

                        navigate("/dashboard");

                    },1200);

                }else{

                    setSnackbar({

                        open: true,

                        severity: "error",

                        message: "Código incorrecto"

                    });

                }

            }}
            />

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

    )
    

}