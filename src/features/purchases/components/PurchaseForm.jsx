import { useEffect, useState } from "react";
import { providerService } from "../../providers/services/providerService";
import { productService } from "../../products/services/productService";

import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton

} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PurchaseForm({

    open,
    onClose,
    onSubmit

}){

    const [providers,setProviders]=useState([]);

    const [products,setProducts]=useState([]);

    const [provider,setProvider]=useState("");

    const [details,setDetails]=useState([]);

    const [product,setProduct]=useState("");

    const [price,setPrice]=useState("");

    const [quantity,setQuantity]=useState(1);

    console.log({
    provider,
    providers
    });

    useEffect(() => {
    console.log("Provider cambió:", provider);
    }, [provider]);

const resetForm = () => {

    setProvider("");

    setDetails([]);

    setProduct("");

    setPrice("");

    setQuantity(1);

};

    useEffect(()=>{

        if(open){

            loadProviders();

            loadProducts();
            
            resetForm();

        }

    },[open]);

    const loadProviders = async () => {

    try {

        const data = await providerService.getAll();

        console.log("Providers completos:", data);

        console.log("Primer proveedor:", Array.isArray(data)
        ? data[0]
        : data.proveedores?.[0]);

        setProviders(

            Array.isArray(data)

                ? data

                : data.proveedores || []

        );

    } catch (error) {

        console.log(error);

    }

};

  const loadProducts = async () => {

    try {

        const data = await productService.getAll();

        setProducts(

            Array.isArray(data)

                ? data

                : data.productos || []

        );

    } catch (error) {

        console.log(error);

    }

};

const addProduct = () => {

    if (!product || quantity <= 0 || price <= 0) return;

    const selected = products.find(

        p => p._id === product

    );

    if (!selected) return;

    setDetails([

        ...details,

        {

            producto: selected._id,

            nombre: selected.nombre,

            cantidad: quantity,

            precioCompra: price,

            subtotal: quantity * price

        }

    ]);

    setProduct("");

    setPrice("");

    setQuantity(1);

};

    const removeProduct = (index) => {

        const newDetails = [...details];

        newDetails.splice(index, 1);

        setDetails(newDetails);

};

    const total=details.reduce(

        (acc,item)=>acc+item.subtotal,

        0

    );

    return(

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="md"

        >

            <DialogTitle>

                Registrar Compra

            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} mt={1}>

                     <Grid size={3}>

                        <TextField

                            select

                            fullWidth

                            label="Proveedor"

                            value={provider}

                            onChange={(e)=>{
                                console.log("Seleccioné:", e.target.value);
                                setProvider(e.target.value)}

                        }>

                            {

                                providers.map((p)=>(

                                    <MenuItem

                                        key={p._id}

                                        value={p._id}

                                    >

                                        {p.nombre} {p.apellido}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={3}>

                        <TextField

                            select

                            fullWidth

                            label="Producto"

                            value={product}

                            onChange={(e)=>setProduct(e.target.value)}

                        >

                            {

                                products.map((p)=>(

                                    <MenuItem

                                        key={p._id}

                                        value={p._id}

                                    >

                                        {p.nombre}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={2}>

                        <TextField

                            fullWidth

                            label="Cantidad"

                            type="number"

                            value={quantity}

                            onChange={(e)=>setQuantity(Number(e.target.value))}

                        />

                    </Grid>

                    <Grid size={2}>

                        <TextField

                            fullWidth

                            label="Precio Compra"

                            type="number"

                            value={price}

                            onChange={(e)=>setPrice(Number(e.target.value))}

                        />

                    </Grid>

                    <Grid size={2}>

                        <Button

                            fullWidth

                            variant="contained"

                            sx={{height:"100%"}}

                            onClick={addProduct}

                        >

                            Agregar

                        </Button>

                    </Grid>

                </Grid>

                <TableContainer
    component={Paper}
    sx={{ mt:4 }}
>

    <Table>

        <TableHead>

            <TableRow>

                <TableCell>

                    Producto

                </TableCell>

                <TableCell align="center">

                    Cantidad

                </TableCell>

                <TableCell align="right">

                    Precio

                </TableCell>

                <TableCell align="right">

                    Subtotal

                </TableCell>

                <TableCell align="center">

                    Acción

                </TableCell>

            </TableRow>

        </TableHead>

        <TableBody>

            {

                details.length===0

                ?

                <TableRow>

                    <TableCell

                        colSpan={5}

                        align="center"

                    >

                        No hay productos agregados.

                    </TableCell>

                </TableRow>

                :

                details.map((item,index)=>(

                    <TableRow key={index}>

                        <TableCell>

                            {item.nombre}

                        </TableCell>

                        <TableCell align="center">

                            {item.cantidad}

                        </TableCell>

                        <TableCell align="right">

                            $

                            {item.precioCompra.toLocaleString()}

                        </TableCell>

                        <TableCell align="right">

                            $

                            {item.subtotal.toLocaleString()}

                        </TableCell>

                        <TableCell align="center">

                            <IconButton

                                color="error"

                                onClick={()=>removeProduct(index)}

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

                <Typography

                    mt={4}

                    fontWeight="bold"

                    variant="h6"

                >

                    Total:

                    $

                    {total.toLocaleString()}

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button

                    onClick={onClose}

                >

                    Cancelar

                </Button>

                <Button

                variant="contained"

                onClick={async () => {

                    if (!provider || details.length === 0) return;

                    await onSubmit({

                        proveedor: provider,

                        fecha: new Date(),

                        total,

                        detalles: details

                    });

                    resetForm();

                    onClose();

                }}

            >

                Guardar Compra

            </Button>

            </DialogActions>

        </Dialog>

    );

}