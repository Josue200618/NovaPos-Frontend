import { Snackbar, Alert } from "@mui/material";

export default function SnackbarAlert({

    open,

    onClose,

    severity = "success",

    message,

    autoHideDuration = 3000,

    anchorOrigin = {

        vertical: "top",

        horizontal: "right"

    }

}) {

    return (

        <Snackbar

            open={open}

            autoHideDuration={autoHideDuration}

            onClose={onClose}

            anchorOrigin={anchorOrigin}

        >

            <Alert

                severity={severity}

                variant="filled"

                elevation={6}

                onClose={onClose}

                sx={{

                    minWidth: 320,

                    fontWeight: "bold"

                }}

            >

                {message}

            </Alert>

        </Snackbar>

    );

}