import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Box
} from "@mui/material";

export default function PurchaseDetailDialog({

    open,
    onClose,
    purchase

}) {

    if (!purchase) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                DETALLE DE COMPRA

            </DialogTitle>

            <DialogContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >

                    Proveedor

                </Typography>

                <Typography>

                    <strong>Nombre:</strong>{" "}

                    {purchase.proveedor?.nombre}{" "}

                    {purchase.proveedor?.apellido}

                </Typography>

                <Typography>

                    <strong>Teléfono:</strong>{" "}

                    {purchase.proveedor?.telefono}

                </Typography>

                <Typography>

                    <strong>Correo:</strong>{" "}

                    {purchase.proveedor?.correo}

                </Typography>

                <Typography sx={{ mt: 1 }}>

                    <strong>Fecha:</strong>{" "}

                    {new Date(purchase.fecha).toLocaleString("es-CO")}

                </Typography>

                <Typography>

                    <strong>Estado:</strong>{" "}

                    {purchase.estado ? "🟢 Activa" : "🔴 Anulada"}

                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >

                    PRODUCTOS

                </Typography>

                {

                    purchase.detalles.map((item, index) => (

                        <Box key={index} mb={3}>

                            <Typography>

                                <strong>

                                    {item.nombre}

                                </strong>

                            </Typography>

                            <Typography>

                                Cantidad: {item.cantidad}

                            </Typography>

                            <Typography>

                                Precio Compra:

                                ${item.precioCompra.toLocaleString()}

                            </Typography>

                            <Typography>

                                Subtotal:

                                ${item.subtotal.toLocaleString()}

                            </Typography>

                            {

                                index < purchase.detalles.length - 1 &&

                                <Divider sx={{ mt:2 }} />

                            }

                        </Box>

                    ))

                }

                <Divider sx={{ my:2 }} />

                <Typography fontWeight="bold">

                    TOTAL PRODUCTOS:

                    {" "}

                    {purchase.detalles.length}

                    {" "}

                    producto{purchase.detalles.length > 1 ? "s" : ""}

                </Typography>

                <Typography
                    fontWeight="bold"
                    variant="h6"
                >

                    TOTAL:

                    ${purchase.total.toLocaleString()}

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    variant="contained"
                    onClick={onClose}
                >

                    Cerrar

                </Button>

            </DialogActions>

        </Dialog>

    );

}