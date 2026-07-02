import {

    Paper,

    Typography,

    Table,

    TableBody,

    TableCell,

    TableContainer,

    TableHead,

    TableRow,

    Chip

} from "@mui/material";

export default function RecentSales({ ventas }) {

    return (

        <Paper

            elevation={3}

            sx={{

                p:2,

                borderRadius:4,

                height:"100%"

            }}

        >

            <Typography

                variant="h6"

                fontWeight="bold"

                mb={2}

            >

                🛒 Últimas Ventas

            </Typography>

            <TableContainer>

                <Table size="small">

                    <TableHead>

                        <TableRow>

                            <TableCell>

                                Cliente

                            </TableCell>

                            <TableCell>

                                Fecha

                            </TableCell>

                            <TableCell align="right">

                                Total

                            </TableCell>

                            <TableCell align="center">

                                Estado

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            ventas?.map((venta)=>(

                                <TableRow key={venta._id}>

                                    <TableCell>

                                        {

                                            venta.cliente?.nombre

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            new Date(

                                                venta.fecha

                                            ).toLocaleDateString()

                                        }

                                    </TableCell>

                                    <TableCell align="right">

                                        $

                                        {

                                            venta.total.toLocaleString()

                                        }

                                    </TableCell>

                                    <TableCell align="center">

                                        {

                                            venta.estado

                                            ?

                                            <Chip

                                                size="small"

                                                color="success"

                                                label="Activa"

                                            />

                                            :

                                            <Chip

                                                size="small"

                                                color="error"

                                                label="Anulada"

                                            />

                                        }

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );

}