import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ConfirmAnnulDialog({

    open,
    onClose,
    onConfirm

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#d32f2f",
                    fontWeight: "bold"
                }}
            >

                <WarningAmberIcon />

                Confirmar anulación

            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    Está a punto de anular esta venta.

                </DialogContentText>

                <DialogContentText sx={{ mt: 2 }}>

                    El inventario será restaurado automáticamente.

                </DialogContentText>

                <DialogContentText
                    sx={{
                        mt: 2,
                        fontWeight: "bold"
                    }}
                >

                    Esta acción puede afectar los reportes del sistema.

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button

                    onClick={onClose}

                >

                    Cancelar

                </Button>

                <Button

                    variant="contained"

                    color="error"

                    onClick={onConfirm}

                >

                    Anular Venta

                </Button>

            </DialogActions>

        </Dialog>

    );

}