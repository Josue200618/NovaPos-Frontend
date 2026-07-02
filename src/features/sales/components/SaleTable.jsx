import {

    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    Tooltip,
    IconButton

} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

import SaleDetailDialog from "./SaleDetailDialog";
import ConfirmAnnulDialog from "./ConfirmAnnulDialog";

import { generateSalePdf } from "../utils/salePdf"

export default function SaleTable({

    

    sales,

    onAnnul

}) 

    {
        const [selectedSale, setSelectedSale] = useState(null);

        const [detailOpen, setDetailOpen] = useState(false);

        const [confirmOpen, setConfirmOpen] = useState(false);

        const [saleToAnnul, setSaleToAnnul] = useState(null);


        const openDetail = (sale) => {

        setSelectedSale(sale);

        setDetailOpen(true);

        };

            const openConfirm = (sale) => {

            setSaleToAnnul(sale);

            setConfirmOpen(true);

        };

        const confirmAnnul = () => {
            console.log("Venta a anular:", saleToAnnul);

            onAnnul(saleToAnnul._id);

            setConfirmOpen(false);

        };

    return (

        <Paper sx={{ mt: 3 }}>

            <TableContainer>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>

                                Fecha

                            </TableCell>

                            <TableCell>

                                Cliente

                            </TableCell>

                            <TableCell>

                                Productos

                            </TableCell>

                            <TableCell>

                                Total

                            </TableCell>

                            <TableCell>

                                Estado

                            </TableCell>

                            <TableCell>

                                Acción

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            sales.length === 0

                                ?

                                <TableRow>

                                    <TableCell

                                        colSpan={5}

                                        align="center"

                                    >

                                        No hay ventas registradas.

                                    </TableCell>

                                </TableRow>

                                :

                                sales.map((venta) => (

                                    <TableRow key={venta._id}>

                                        <TableCell>

                                            {
                                                new Date(venta.fecha).toLocaleString("es-CO", {

                                                        day: "2-digit",

                                                        month: "2-digit",

                                                        year: "numeric",

                                                        hour: "2-digit",

                                                        minute: "2-digit",

                                                        hour12: true

                                                    })

                                                
                                            }

                                        </TableCell>

                                        <TableCell>

                                              {[venta.cliente?.nombre, venta.cliente?.apellido]
                                                    .filter(Boolean)
                                                    .join(" ")}

                                        </TableCell>

                                        <TableCell>

                                            {venta.detalles.length} {

                                                venta.detalles.length === 1

                                                    ? "producto"

                                                    : "productos"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            $

                                            {

                                                venta.total.toLocaleString()

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                venta.estado

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

                                        </TableCell>

                                        <TableCell>

                                            <Tooltip title="Ver detalle">

                                                <IconButton

                                                    color="primary"

                                                    onClick={() => openDetail(venta)}

                                                >

                                                    <VisibilityIcon />

                                                </IconButton>

                                            </Tooltip>

                                            <Tooltip title="Descargar PDF">

                                                <IconButton

                                                    color="success"

                                                    onClick={() => generateSalePdf(venta)}

                                                >

                                                    <DownloadIcon />

                                                </IconButton>

                                            </Tooltip>

                                            {

                                                venta.estado &&

                                                <Tooltip title="Anular venta">

                                                    <IconButton

                                                        color="error"

                                                        onClick={() => openConfirm(venta)}

                                                    >

                                                        <DeleteIcon />

                                                    </IconButton>

                                                </Tooltip>

                                            }

                                        </TableCell>


                                    </TableRow>

                                ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

            <SaleDetailDialog

                open={detailOpen}

                onClose={() => setDetailOpen(false)}

                sale={selectedSale}

            />

            <ConfirmAnnulDialog

                open={confirmOpen}

                onClose={() => setConfirmOpen(false)}

                onConfirm={confirmAnnul}

            />

        </Paper>

    );

}