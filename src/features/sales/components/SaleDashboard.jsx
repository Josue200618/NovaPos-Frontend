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

import { useSales } from "../hooks/useSales";

import SaleTable from "./SaleTable";
import SaleForm from "./SaleForm";
import SaleFilters from "./SaleFilters";
import TablePagination from "@mui/material/TablePagination";

export default function SaleDashboard() {

    const {

    sales,
    loading,
    error,

    searchTerm,
    setSearchTerm,

    page,
    rowsPerPage,
    total,

    handleChangePage,
    handleChangeRowsPerPage,

    createSale,
    annulSale

    } = useSales();

    const [formOpen, setFormOpen] = useState(false);


    

    return (

        <Container maxWidth="lg" sx={{ mt: 5 }}>

            <Box mb={2}>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                >

                    Gestión de Ventas

                </Typography>

            </Box>

            <SaleFilters

                searchTerm={searchTerm}

                onSearch={setSearchTerm}

            />

            <Box
                display="flex"
                justifyContent="flex-start"
                sx={{ mb: 3, mt: 2 }}
            >

                <Button

                    variant="contained"

                    startIcon={<AddIcon />}

                    onClick={() => setFormOpen(true)}

                >

                    Registrar Venta

                </Button>

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

                    <SaleTable

                        sales={sales}

                        onAnnul={annulSale}

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

            <SaleForm

                open={formOpen}

                onClose={() => setFormOpen(false)}

                onSubmit={createSale}

            />


        </Container>

    );

}