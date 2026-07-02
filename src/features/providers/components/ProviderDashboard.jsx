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

import { useProviders } from "../hooks/useProviders";

import ProviderFilters from "./ProviderFilters";
import ProviderTable from "./ProviderTable";
import ProviderForm from "./ProviderForm";


import ConfirmDialog from "../../../components/ui/ConfirmDialog";

export default function ProviderDashboard(){

    const{

        providers,
        totalCount,

        loading,
        error,

        page,
        rowsPerPage,

        searchTerm,

        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,

        createProvider,
        updateProvider,
        deleteProvider

    }=useProviders();

    const[formOpen,setFormOpen]=useState(false);

    const[selectedProvider,setSelectedProvider]=useState(null);

    const[deleteOpen,setDeleteOpen]=useState(false);

    const[providerDelete,setProviderDelete]=useState(null);

    const handleCreate=()=>{

        setSelectedProvider(null);

        setFormOpen(true);

    };

    const handleEdit=(provider)=>{

        setSelectedProvider(provider);

        setFormOpen(true);

    };

    const handleSubmit=(data)=>{

        if(selectedProvider){

            updateProvider(selectedProvider._id,data);

        }else{

            createProvider(data);

        }

    };

    const handleDelete=(provider)=>{

        setProviderDelete(provider);

        setDeleteOpen(true);

    };

    const confirmDelete=()=>{

        deleteProvider(providerDelete._id);

        setDeleteOpen(false);

    };

    return(

        <Container maxWidth="lg" sx={{mt:5}}>

            <Box mb={2}>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                >

                    Gestión de Proveedores

                </Typography>

            </Box>

            <Box
                display="flex"
                justifyContent="flex-start"
                sx={{mb:3}}
            >

                <Button

                    variant="contained"

                    startIcon={<AddIcon/>}

                    onClick={handleCreate}

                >

                    Agregar Proveedor

                </Button>

            </Box>

            <ProviderFilters

                value={searchTerm}

                onChange={handleSearchChange}

            />

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

                    <CircularProgress/>

                </Box>

                :

                <ProviderTable

                    providers={providers}

                    totalCount={totalCount}

                    page={page}

                    rowsPerPage={rowsPerPage}

                    onPageChange={handleChangePage}

                    onRowsPerPageChange={handleChangeRowsPerPage}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            }

            <ProviderForm

                open={formOpen}

                onClose={()=>setFormOpen(false)}

                onSubmit={handleSubmit}

                providerToEdit={selectedProvider}

            />

            <ConfirmDialog

                open={deleteOpen}

                title="Eliminar Proveedor"

                message={

                    providerDelete

                    ?

                    `¿Deseas eliminar a ${providerDelete.nombre} ${providerDelete.apellido}?`

                    :

                    ""

                }

                confirmText="Eliminar"

                cancelText="Cancelar"

                confirmColor="error"

                onConfirm={confirmDelete}

                onCancel={()=>setDeleteOpen(false)}

            />

        </Container>

    );

}