import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TablePagination,
    IconButton,
    Chip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProviderTable({

    providers,

    totalCount,

    page,

    rowsPerPage,

    onPageChange,

    onRowsPerPageChange,

    onEdit,

    onDelete

}) {

    return (

        <Paper sx={{ mt:3, overflow:"hidden", boxShadow:3 }}>

            <TableContainer>

                <Table>

                    <TableHead sx={{ background:"#f5f5f5" }}>

                        <TableRow>

                            <TableCell><strong>Nombre</strong></TableCell>

                            <TableCell><strong>Apellido</strong></TableCell>

                            <TableCell><strong>Correo</strong></TableCell>

                            <TableCell><strong>Teléfono</strong></TableCell>

                            <TableCell><strong>Dirección</strong></TableCell>

                            <TableCell><strong>Estado</strong></TableCell>

                            <TableCell align="center">

                                <strong>Acciones</strong>

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            providers.map(provider=>(

                                <TableRow

                                    hover

                                    key={provider._id}

                                >

                                    <TableCell>

                                        {provider.nombre}

                                    </TableCell>

                                    <TableCell>

                                        {provider.apellido}

                                    </TableCell>

                                    <TableCell>

                                        {provider.correo}

                                    </TableCell>

                                    <TableCell>

                                        {provider.telefono}

                                    </TableCell>

                                    <TableCell>

                                        {provider.direccion}

                                    </TableCell>

                                    <TableCell>

                                        {

                                            provider.estado

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

                                            onClick={()=>onEdit(provider)}

                                        >

                                            <EditIcon/>

                                        </IconButton>

                                        <IconButton

                                            color="error"

                                            onClick={()=>onDelete(provider)}

                                        >

                                            <DeleteIcon/>

                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

            <TablePagination

                rowsPerPageOptions={[5,10,25]}

                component="div"

                count={totalCount}

                page={page}

                rowsPerPage={rowsPerPage}

                onPageChange={onPageChange}

                onRowsPerPageChange={onRowsPerPageChange}

                labelRowsPerPage="Filas por página"

            />

        </Paper>

    );

}