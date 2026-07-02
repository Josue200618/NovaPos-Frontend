import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography
} from "@mui/material";

export default function LoginCodeDialog({

    open,

    code,

    setCode,

    email,

    onClose,

    onConfirm

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle>

                Verificación de seguridad

            </DialogTitle>

            <DialogContent>

                <Typography
                    mb={2}
                    color="text.secondary"
                >

                    Hemos enviado un código de 6 dígitos al correo:

                </Typography>

                <Typography
                    fontWeight="bold"
                    mb={3}
                >

                    {email}

                </Typography>

                <TextField

                    autoFocus

                    fullWidth

                    label="Código"

                    value={code}

                    onChange={(e)=>setCode(e.target.value)}

                    inputProps={{

                        maxLength:6

                    }}

                />

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >

                    Cancelar

                </Button>

                <Button

                    variant="contained"

                    onClick={onConfirm}

                >

                    Confirmar

                </Button>

            </DialogActions>

        </Dialog>

    );

}