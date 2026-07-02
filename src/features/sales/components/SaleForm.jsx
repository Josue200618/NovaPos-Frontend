import { useEffect, useState } from "react";

import { clienteService } from "../../users/services/clienteService";
import { productService } from "../../products/services/productService";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function SaleForm({

    open,
    onClose,
    onSubmit

}) {

    const [clients, setClients] = useState([]);

    const [products, setProducts] = useState([]);

    const [client, setClient] = useState("");

    const [details, setDetails] = useState([]);

    const [product, setProduct] = useState("");

    const [price, setPrice] = useState(0);

    const [quantity, setQuantity] = useState(1);

    const [stock, setStock] = useState(0);

    const [error, setError] = useState("");

    useEffect(() => {

        if (open) {

            loadClients();

            loadProducts();

            resetForm();

        }

    }, [open]);

    const resetForm = () => {

        setClient("");

        setDetails([]);

        setProduct("");

        setPrice(0);

        setQuantity(1);

        setStock(0);

        setError("");

    };

    const loadClients = async () => {
        console.log("Entró a loadClients");

        try {

            const data = await clienteService.getAll();
              console.log("Clientes:", data);

            setClients(

                Array.isArray(data)

                    ? data

                    : data.clientes || []

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

    const handleProductChange = (id) => {

        setProduct(id);

        const selected = products.find(

            p => p._id === id

        );

        if (!selected) return;

        setPrice(selected.precio);

        setStock(selected.stock);

    };

    const addProduct = () => {

        setError("");

        if (!product) {

            setError("Seleccione un producto.");

            return;

        }

        if (quantity <= 0) {

            setError("Cantidad inválida.");

            return;

        }

        if (quantity > stock) {

            setError("Stock insuficiente.");

            return;

        }

        const selected = products.find(

            p => p._id === product

        );

        if (!selected) return;

        const exists = details.find(

            d => d.producto === selected._id

        );

        if (exists) {

            setError("Este producto ya fue agregado.");

            return;

        }

        setDetails([

            ...details,

            {

                producto: selected._id,

                nombre: selected.nombre,

                precioVenta: price,

                cantidad: quantity,

                subtotal: quantity * price

            }

        ]);

        setProduct("");

        setPrice(0);

        setQuantity(1);

        setStock(0);

    };

    const removeProduct = (index) => {

        const copy = [...details];

        copy.splice(index, 1);

        setDetails(copy);

    };

    const total = details.reduce(

        (acc, item) => acc + item.subtotal,

        0

    );

    const handleSave = async () => {

        if (!client) {

            setError("Seleccione un cliente.");

            return;

        }

        if (details.length === 0) {

            setError("Debe agregar al menos un producto.");

            return;

        }

        await onSubmit({

            cliente: client,

            fecha: new Date(),

            total,

            detalles: details

        });

        onClose();

    };

        return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Registrar Venta

            </DialogTitle>

            <DialogContent>

                {

                    error &&

                    <Alert severity="error" sx={{ mb:2 }}>

                        {error}

                    </Alert>

                }

                <Grid container spacing={2} mt={1}>

                    <Grid size={{ xs:12 }}>

                        <TextField
                            select
                            fullWidth
                            label="Cliente"
                            value={client}
                            onChange={(e)=>setClient(e.target.value)}
                        >

                            {

                                clients.map(cliente=>(

                                    <MenuItem

                                        key={cliente._id}

                                        value={cliente._id}

                                    >

                                        {cliente.nombre} {cliente.apellido}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs:5 }}>

                        <TextField
                            select
                            fullWidth
                            label="Producto"
                            value={product}
                            onChange={(e)=>handleProductChange(e.target.value)}
                        >

                            {

                                products.map(producto=>(

                                    <MenuItem

                                        key={producto._id}

                                        value={producto._id}

                                    >

                                        {producto.nombre}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs:2 }}>

                        <TextField

                            fullWidth

                            label="Cantidad"

                            type="number"

                            value={quantity}

                            onChange={(e)=>setQuantity(Number(e.target.value))}

                        />

                    </Grid>

                    <Grid size={{ xs:3 }}>

                        <TextField

                            fullWidth

                            label="Precio Venta"

                            type="number"

                            value={price}

                            InputProps={{

                                readOnly:true

                            }}

                        />

                    </Grid>

                    <Grid size={{ xs:2 }}>

                        <Button

                            fullWidth

                            variant="contained"

                            sx={{height:"100%"}}

                            onClick={addProduct}

                        >

                            Agregar

                        </Button>

                    </Grid>

                    {

                        product &&

                        <Grid size={{ xs:12 }}>

                            <Typography

                                color={

                                    stock>0

                                    ?

                                    "success.main"

                                    :

                                    "error.main"

                                }

                            >

                                Stock disponible:

                                {" "}

                                <strong>

                                    {stock}

                                </strong>

                            </Typography>

                        </Grid>

                    }

                </Grid>

                <TableContainer

                    component={Paper}

                    sx={{mt:4}}

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

                                            {item.precioVenta.toLocaleString()}

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

                    variant="h6"

                    fontWeight="bold"

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

                    onClick={handleSave}

                >

                    Guardar Venta

                </Button>

            </DialogActions>

        </Dialog>

    );

}