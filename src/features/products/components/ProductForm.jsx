import { useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    Switch,
    FormControlLabel,
    Typography,
    InputAdornment,
    Avatar,
    MenuItem,
    Box
} from "@mui/material";

import {
    Inventory2,
    Description,
    AttachMoney,
    Category,
    Warehouse,
    Inventory
} from "@mui/icons-material";

import InventoryRoundedIcon from "@mui/icons-material/Inventory2Rounded";

import FormCard from "../../../components/ui/FormCard";
import LoadingButton from "../../../components/ui/LoadingButton";
import SnackbarAlert from "../../../components/ui/SnackbarAlert";

export default function ProductForm({

    open,
    onClose,
    onSubmit,
    productToEdit

}) {

    const [formData, setFormData] = useState({

        nombre: "",
        descripcion: "",
        precio: "",
        tipo: "Producto",
        stock: "",
        estado: true

    });

    const [saving, setSaving] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {

        if (productToEdit) {

            setFormData({

                nombre: productToEdit.nombre || "",
                descripcion: productToEdit.descripcion || "",
                precio: productToEdit.precio || "",
                tipo: productToEdit.tipo || "Producto",
                stock: productToEdit.stock || "",
                estado: productToEdit.estado

            });

        } else {

            setFormData({

                nombre: "",
                descripcion: "",
                precio: "",
                tipo: "Producto",
                stock: "",
                estado: true

            });

        }

    }, [productToEdit, open]);

    const handleChange = (e) => {

        const { name, value, checked, type } = e.target;

        setFormData({

            ...formData,

            [name]: type === "checkbox"

                ? checked

                : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await onSubmit({

                ...formData,

                precio: Number(formData.precio),

                stock: Number(formData.stock)

            });

            setSuccess(true);

            setTimeout(() => {

                onClose();

            }, 1200);

        } finally {

            setSaving(false);

        }

    };

    return (

        <>

            <Dialog

                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="md"

            >


                
                <form onSubmit={handleSubmit}>

                    <DialogContent>

                        <FormCard

                            title={

                                productToEdit

                                    ? "Editar Producto"

                                    : "Registrar Producto"

                            }

                            subtitle="Información del producto"

                            icon={<InventoryRoundedIcon />}

                        >

                            <Grid container spacing={2}>

                                <Grid size={{ xs:12, md:6 }}>

                                    <TextField

                                        fullWidth

                                        required

                                        label="Nombre"

                                        name="nombre"

                                        value={formData.nombre}

                                        onChange={handleChange}

                                        InputProps={{

                                            startAdornment:(

                                                <InputAdornment position="start">

                                                    <Inventory color="primary"/>

                                                </InputAdornment>

                                            )

                                        }}

                                    />

                                </Grid>

                                <Grid size={{ xs:12, md:6 }}>

                                    <TextField

                                        fullWidth

                                        required

                                        label="Descripción"

                                        name="descripcion"

                                        value={formData.descripcion}

                                        onChange={handleChange}

                                        InputProps={{

                                            startAdornment:(

                                                <InputAdornment position="start">

                                                    <Description color="primary"/>

                                                </InputAdornment>

                                            )

                                        }}

                                    />

                                </Grid>

                                <Grid size={{ xs:12, md:4 }}>

                                    <TextField

                                        fullWidth

                                        required

                                        type="number"

                                        label="Precio"

                                        name="precio"

                                        value={formData.precio}

                                        onChange={handleChange}

                                        InputProps={{

                                            startAdornment:(

                                                <InputAdornment position="start">

                                                    <AttachMoney color="success"/>

                                                </InputAdornment>

                                            )

                                        }}

                                    />

                                </Grid>

                                <Grid size={{ xs:12, md:4 }}>

                                    <TextField

                                        select

                                        fullWidth

                                        label="Tipo"

                                        name="tipo"

                                        value={formData.tipo}

                                        onChange={handleChange}

                                    >

                                        <MenuItem value="Producto">

                                            Producto

                                        </MenuItem>

                                        <MenuItem value="Servicio">

                                            Servicio

                                        </MenuItem>

                                    </TextField>

                                </Grid>

                                <Grid size={{ xs:12, md:4 }}>

                                    <TextField

                                        fullWidth

                                        required

                                        type="number"

                                        label="Stock"

                                        name="stock"

                                        value={formData.stock}

                                        onChange={handleChange}

                                        InputProps={{

                                            startAdornment:(

                                                <InputAdornment position="start">

                                                    <Warehouse color="warning"/>

                                                </InputAdornment>

                                            )

                                        }}

                                    />

                                </Grid>

                                <Grid size={{ xs:12 }}>

                                    <FormControlLabel

                                        control={

                                            <Switch

                                                checked={formData.estado}

                                                name="estado"

                                                onChange={handleChange}

                                            />

                                        }

                                        label={

                                            <Typography fontWeight="bold">

                                                {

                                                    formData.estado

                                                        ? "Producto Activo"

                                                        : "Producto Inactivo"

                                                }

                                            </Typography>

                                        }

                                    />

                                </Grid>

                            </Grid>

                        </FormCard>

                    </DialogContent>

                    <DialogActions sx={{ px:3,pb:3 }}>

                        <Button

                            variant="outlined"

                            onClick={onClose}

                        >

                            Cancelar

                        </Button>

                        <LoadingButton

                            type="submit"

                            loading={saving}

                            loadingText="Guardando..."

                            variant="contained"

                        >

                            {

                                productToEdit

                                    ? "Actualizar"

                                    : "Guardar"

                            }

                        </LoadingButton>

                    </DialogActions>

                </form>

            </Dialog>

            <SnackbarAlert

                open={success}

                severity="success"

                message={

                    productToEdit

                        ? "Producto actualizado correctamente"

                        : "Producto registrado correctamente"

                }

                onClose={() => setSuccess(false)}

            />

        </>

    );

}