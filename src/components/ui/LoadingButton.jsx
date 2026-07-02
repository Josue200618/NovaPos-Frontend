import { Button, CircularProgress } from "@mui/material";

export default function LoadingButton({

    loading = false,

    children,

    startIcon = null,

    loadingText = "Guardando...",

    disabled = false,

    ...props

}) {

    return (

        <Button

            {...props}

            disabled={loading || disabled}

            startIcon={

                loading

                    ? (

                        <CircularProgress

                            size={20}

                            color="inherit"

                        />

                    )

                    : startIcon

            }

        >

            {

                loading

                    ? loadingText

                    : children

            }

        </Button>

    );

}