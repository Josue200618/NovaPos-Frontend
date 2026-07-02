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

import { useProducts } from "../hooks/useProducts";

import ProductTable from "./ProductTable";
import ProductFilters from "./ProductFilters";
import ProductForm from "./ProductForm";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";

export default function ProductDashboard(){

    const{

        products,
        totalCount,
        loading,
        error,
        page,
        rowsPerPage,
        searchTerm,

        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,

        createProduct,
        updateProduct,
        deleteProduct

    }=useProducts();

    const[formOpen,setFormOpen]=useState(false);

    const[selectedProduct,setSelectedProduct]=useState(null);

    const[deleteOpen,setDeleteOpen]=useState(false);

    const[productDelete,setProductDelete]=useState(null);

    const handleCreate=()=>{

        setSelectedProduct(null);

        setFormOpen(true);

    };

    const handleEdit=(product)=>{

        setSelectedProduct(product);

        setFormOpen(true);

    };

    const handleSubmit=(data)=>{

        if(selectedProduct){

            updateProduct(selectedProduct._id,data);

        }else{

            createProduct(data);

        }

    };

    const handleDelete=(product)=>{

        setProductDelete(product);

        setDeleteOpen(true);

    };

    const confirmDelete=()=>{

        deleteProduct(productDelete._id);

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

                    Gestión de Productos

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
                        onClick={handleCreate}
                    >

                        Agregar Producto

                    </Button>

                </Box>

                <Box sx={{ mb:3 }}>

                    <ProductFilters
                        value={searchTerm}
                        onChange={handleSearchChange}
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

                    <CircularProgress/>

                </Box>

                :

                <ProductTable

                    products={products}

                    totalCount={totalCount}

                    page={page}

                    rowsPerPage={rowsPerPage}

                    onPageChange={handleChangePage}

                    onRowsPerPageChange={handleChangeRowsPerPage}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            }

            <ProductForm

                open={formOpen}

                onClose={()=>setFormOpen(false)}

                onSubmit={handleSubmit}

                productToEdit={selectedProduct}

            />

            <ConfirmDialog

                open={deleteOpen}

                title="Eliminar Producto"

                message={

                    productDelete

                    ?

                    `¿Deseas eliminar "${productDelete.nombre}"?`

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