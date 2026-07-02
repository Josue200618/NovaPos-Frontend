import {

    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,

} from "@mui/material";

import { useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPurchaseDialog from "./ConfirmPurchaseDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import PurchaseDetailDialog from "./PurchaseDetailDialog";
import { generatePurchasePdf } from "../utils/purchasePdf";

export default function PurchaseTable({

    purchases,

    onAnnul

}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [purchaseToAnnul, setPurchaseToAnnul] = useState(null);

    const [detailOpen, setDetailOpen] = useState(false);

    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const handleAnnulClick = (purchase) => {

    setPurchaseToAnnul(purchase);

    setConfirmOpen(true);

};

    const confirmAnnul = () => {

    if (!purchaseToAnnul) return;

    onAnnul(purchaseToAnnul._id);

    setConfirmOpen(false);

    setPurchaseToAnnul(null);

};

    const handleView = (purchase) => {

    setSelectedPurchase(purchase);

    setDetailOpen(true);

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

                                Proveedor

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

                            purchases.map((compra) => (

                                <TableRow key={compra._id}>

                                    <TableCell>

                                        {

                                            new Date(compra.fecha)

                                                .toLocaleDateString()

                                        }

                                    </TableCell>

                                   <TableCell>
                                        {compra.proveedor?.nombre || compra.proveedor_id}
                                    </TableCell>

                                    <TableCell>

                                        $

                                        {

                                            compra.total.toLocaleString()

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            compra.estado

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

    {compra.estado && (

        <>

            <Tooltip title="Ver detalle">

                <IconButton
                    color="primary"
                    onClick={() => handleView(compra)}
                >

                    <VisibilityIcon />

                </IconButton>

            </Tooltip>

            <Tooltip title="Descargar PDF">

                <IconButton
                    color="secondary"
                    onClick={() => generatePurchasePdf(compra)}
                >

                    <DownloadIcon />

                </IconButton>

            </Tooltip>

            <Tooltip title="Anular compra">

                <IconButton
                    color="error"
                    onClick={() => handleAnnulClick(compra)}
                >

                    <DeleteIcon />

                </IconButton>

            </Tooltip>

        </>

    )}

</TableCell>
                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

         <ConfirmPurchaseDialog

            open={confirmOpen}

            onClose={() => {

                setConfirmOpen(false);

                setPurchaseToAnnul(null);

            }}

            onConfirm={confirmAnnul}

        />

        <PurchaseDetailDialog

    open={detailOpen}

    onClose={() => setDetailOpen(false)}

    purchase={selectedPurchase}

/>

        </Paper>

    );

}