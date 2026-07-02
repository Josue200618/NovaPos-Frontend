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

export default function RecentPurchases({ compras }) {

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

                📦 Últimas Compras

            </Typography>

            <TableContainer>

                <Table size="small">

                    <TableHead>

                        <TableRow>

                            <TableCell>

                                Proveedor

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

                            compras?.map((compra)=>(

                                <TableRow key={compra._id}>

                                    <TableCell>

                                        {

                                            compra.proveedor?.nombre

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            new Date(

                                                compra.fecha

                                            ).toLocaleDateString()

                                        }

                                    </TableCell>

                                    <TableCell align="right">

                                        $

                                        {

                                            compra.total.toLocaleString()

                                        }

                                    </TableCell>

                                    <TableCell align="center">

                                        {

                                            compra.estado

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