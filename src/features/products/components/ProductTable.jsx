import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
    Chip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductTable({

    products,
    totalCount,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onEdit,
    onDelete

}) {

    return (

        <Paper

            sx={{

                width: "100%",
                mt: 3,
                boxShadow: 3,
                overflow: "hidden"

            }}

        >

            <TableContainer>

                <Table>

                    <TableHead

                        sx={{

                            backgroundColor: "#f5f5f5"

                        }}

                    >

                        <TableRow>

                            <TableCell><strong>Nombre</strong></TableCell>

                            <TableCell><strong>Descripción</strong></TableCell>

                            <TableCell><strong>Tipo</strong></TableCell>

                            <TableCell><strong>Precio</strong></TableCell>

                            <TableCell><strong>Stock</strong></TableCell>

                            <TableCell><strong>Estado</strong></TableCell>

                            <TableCell align="center">

                                <strong>Acciones</strong>

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            products.map((producto) => (

                                <TableRow

                                    key={producto._id}

                                    hover

                                >

                                    <TableCell>

                                        {producto.nombre}

                                    </TableCell>

                                    <TableCell>

                                        {producto.descripcion}

                                    </TableCell>

                                    <TableCell>

                                        <Chip

                                            label={producto.tipo}

                                            color={

                                                producto.tipo === "Servicio"

                                                    ? "secondary"

                                                    : "primary"

                                            }

                                            size="small"

                                        />

                                    </TableCell>

                                    <TableCell>

                                        ${Number(producto.precio).toLocaleString()}

                                    </TableCell>

                                    <TableCell>

                                        {producto.stock}

                                    </TableCell>

                                    <TableCell>

                                        {

                                            producto.estado

                                                ?

                                                <Chip

                                                    label="Activo"

                                                    color="success"

                                                    size="small"

                                                />

                                                :

                                                <Chip

                                                    label="Inactivo"

                                                    color="error"

                                                    size="small"

                                                />

                                        }

                                    </TableCell>

                                    <TableCell align="center">

                                        <IconButton

                                            color="primary"

                                            onClick={() => onEdit(producto)}

                                        >

                                            <EditIcon />

                                        </IconButton>

                                        <IconButton

                                            color="error"

                                            onClick={() => onDelete(producto)}

                                        >

                                            <DeleteIcon />

                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                        {

                            products.length === 0 && (

                                <TableRow>

                                    <TableCell

                                        colSpan={7}

                                        align="center"

                                        sx={{ py: 3 }}

                                    >

                                        No hay productos registrados.

                                    </TableCell>

                                </TableRow>

                            )

                        }

                    </TableBody>

                </Table>

            </TableContainer>

            <TablePagination

                rowsPerPageOptions={[5,10,25]}

                component="div"

                count={totalCount}

                rowsPerPage={rowsPerPage}

                page={page}

                onPageChange={onPageChange}

                onRowsPerPageChange={onRowsPerPageChange}

                labelRowsPerPage="Filas por página"

            />

        </Paper>

    );

}