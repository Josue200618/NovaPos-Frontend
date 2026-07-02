import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Box
} from "@mui/material";

export default function SaleDetailDialog({

    open,
    onClose,
    sale

}) {

    if (!sale) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    textAlign: "center"
                }}
            >

                DETALLE DE VENTA

            </DialogTitle>

            <DialogContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >

                    Cliente

                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography>

                    <strong>Nombre:</strong>{" "}

                    {sale.cliente?.nombre} {sale.cliente?.apellido}

                </Typography>

                <Typography>

                    <strong>Teléfono:</strong>{" "}

                    {sale.cliente?.telefono}

                </Typography>

                <Typography>

                    <strong>Correo:</strong>{" "}

                    {sale.cliente?.correo}

                </Typography>

                <Typography>

                    <strong>Fecha:</strong>{" "}

                    {

                        new Date(sale.fecha).toLocaleString("es-CO", {

                            day: "2-digit",

                            month: "2-digit",

                            year: "numeric",

                            hour: "2-digit",

                            minute: "2-digit",

                            hour12: true

                        })

                    }

                </Typography>

                <Box mt={1} mb={3}>

                    <strong>Estado:</strong>{" "}

                    {

                        sale.estado

                            ?

                            <Chip

                                label="Activa"

                                color="success"

                                size="small"

                            />

                            :

                            <Chip

                                label="Anulada"

                                color="error"

                                size="small"

                            />

                    }

                </Box>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >

                    Productos

                </Typography>

                <Divider sx={{ mb: 2 }} />

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>

                                    Producto

                                </TableCell>

                                <TableCell align="center">

                                    Cantidad

                                </TableCell>

                                <TableCell align="right">

                                    Precio Unitario

                                </TableCell>

                                <TableCell align="right">

                                    Subtotal

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {

                                sale.detalles.map((item, index) => (

                                    <TableRow key={index}>

                                        <TableCell>

                                            {item.nombre}

                                        </TableCell>

                                        <TableCell align="center">

                                            {item.cantidad}

                                        </TableCell>

                                        <TableCell align="right">

                                            $

                                            {item.precioVenta.toLocaleString()}

                                        </TableCell>

                                        <TableCell align="right">

                                            $

                                            {item.subtotal.toLocaleString()}

                                        </TableCell>

                                    </TableRow>

                                ))

                            }

                        </TableBody>

                    </Table>

                </TableContainer>

                <Box mt={3}>

                    <Typography fontWeight="bold">

                        Total Productos:

                        {" "}

                        {sale.detalles.length}

                        {" "}

                        {

                            sale.detalles.length === 1

                                ? "producto"

                                : "productos"

                        }

                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                    >

                        Total:

                        {" "}

                        $

                        {sale.total.toLocaleString()}

                    </Typography>

                </Box>

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