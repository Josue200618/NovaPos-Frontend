import { useState } from "react";

import {
    Container,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { usePurchases } from "../hooks/usePurchases";

import PurchaseTable from "./PurchaseTable";
import PurchaseForm from "./PurchaseForm";
import PurchaseFilters from "./PurchaseFilters";
import TablePagination from "@mui/material/TablePagination";

export default function PurchaseDashboard() {

    const {

    purchases,
    loading,
    error,

    searchTerm,
    setSearchTerm,

    page,
    rowsPerPage,
    total,

    handleChangePage,
    handleChangeRowsPerPage,

    createPurchase,
    annulPurchase

    } = usePurchases();

    const [formOpen, setFormOpen] = useState(false);

    console.log("Purchases:", purchases);

    return (

        <Container maxWidth="lg" sx={{ mt: 5 }}>

            <Box mb={2}>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                >

                    Gestión de Compras

                </Typography>

            </Box>

            <Box
                display="flex"
                justifyContent="flex-start"
                sx={{ mb: 3 }}
            >

                <Button

                    variant="contained"

                    startIcon={<AddIcon />}

                    onClick={() => setFormOpen(true)}

                >

                    Registrar Compra

                </Button>

            </Box>

            <Box sx={{ mb: 3 }}>

                <PurchaseFilters
                    value={searchTerm}
                    onChange={setSearchTerm}
                />

            </Box>

            {

                error &&

                <Alert severity="error">

                    {error}

                </Alert>

            }

            {

                loading

                    ?

                    <Box

                        display="flex"

                        justifyContent="center"

                        my={5}

                    >

                        <CircularProgress />

                    </Box>

                    :

                    <PurchaseTable

                        purchases={purchases}

                        onAnnul={annulPurchase}

                    />
                    

                    

            }

            <TablePagination

            component="div"

            count={total}

            page={page}

            onPageChange={handleChangePage}

            rowsPerPage={rowsPerPage}

            onRowsPerPageChange={handleChangeRowsPerPage}

            rowsPerPageOptions={[5, 10, 15]}

            labelRowsPerPage="Filas por página"

            labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} de ${count}`
            }

        />

            <PurchaseForm

                open={formOpen}

                onClose={() => setFormOpen(false)}

                onSubmit={createPurchase}

            />

        </Container>

    );

}