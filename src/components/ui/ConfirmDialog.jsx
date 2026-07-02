import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export default function ConfirmDialog({

    open,
    title,
    message,
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    confirmColor = "error",
    onConfirm,
    onCancel

}) {

    return (

        <Dialog
            open={open}
            onClose={onCancel}
            fullWidth
            maxWidth="xs"
        >

            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: "bold"
                }}
            >

                <WarningAmberRoundedIcon
                    color="warning"
                    fontSize="large"
                />

                {title}

            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    {message}

                </DialogContentText>

            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3
                }}
            >

                <Button

                    onClick={onCancel}

                    variant="outlined"

                >

                    {cancelText}

                </Button>

                <Button

                    onClick={onConfirm}

                    variant="contained"

                    color={confirmColor}

                >

                    {confirmText}

                </Button>

            </DialogActions>

        </Dialog>

    );

}