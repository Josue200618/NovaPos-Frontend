import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

export default function ConfirmPurchaseDialog({

    open,
    onClose,
    onConfirm

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
        >

            <DialogTitle>

                ⚠ Confirmar anulación

            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    ¿Está seguro que desea anular esta compra?

                    <br /><br />

                    Esta acción descontará nuevamente el stock agregado al inventario.

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancelar

                </Button>

                <Button

                    color="error"

                    variant="contained"

                    onClick={onConfirm}

                >

                    Anular compra

                </Button>

            </DialogActions>

        </Dialog>

    );

}