import { useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Typography,
    CircularProgress,
    InputAdornment,
    Avatar,
    Box
} from "@mui/material";

import {
    Person,
    Badge,
    Phone,
    Email
} from "@mui/icons-material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FormCard from "../../../components/ui/FormCard";
import LoadingButton from "../../../components/ui/LoadingButton";
import Grid from "@mui/material/Grid";
import SnackbarAlert from "../../../components/ui/SnackbarAlert";
import LocationOn from "@mui/icons-material/LocationOn";

export default function ProviderForm({
  open,
  onClose,
  onSubmit,
  providerToEdit
}) {

    const [formData, setFormData] = useState({

    nombre:"",
    apellido:"",
    correo:"",
    telefono:"",
    direccion:"",
    estado:true

    });

  const [success,setSuccess]=useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {

    if (providerToEdit) {

      setFormData({

        nombre: providerToEdit.nombre || "",
        apellido: providerToEdit.apellido || "",
        telefono: providerToEdit.telefono || "",
        correo: providerToEdit.correo || "",
        direccion: providerToEdit.direccion || "",
        estado: providerToEdit.estado


      });

    } else {

      setFormData({

        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        direccion:"",
        estado: true

      });

    }

  }, [providerToEdit, open]);

    const handleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({

        ...prev,

        [name]: type === "checkbox" ? checked : value

    }));

};

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setSaving(true);

        await onSubmit(formData);

        setSuccess(true);

        setTimeout(() => {

            onClose();

        }, 1200);

    } finally {

        setSaving(false);

    }

};


  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
        <SnackbarAlert

    open={success}

    severity="success"

    message={

        providerToEdit

            ? "Proveedor actualizado correctamente"

            : "Proveedor registrado correctamente"

    }

    onClose={() => setSuccess(false)}

    />

      <DialogTitle
    sx={{
        fontWeight: "bold",
        pb: 1
    }}
>



        </DialogTitle>


      <form onSubmit={handleSubmit}>

        <DialogContent sx={{ p: 0 }}>

    <FormCard

        title={

            providerToEdit

                ? "Editar Proveedor"

                : "Nuevo Proveedor"

        }

        subtitle="Complete la información"

        icon={<PersonRoundedIcon fontSize="large" />}

    >

        <Grid container spacing={2}>

        <Grid     size={{
        xs:12,
        md:6
    }}>

            <TextField

                fullWidth

                required

                label="Nombre"

                name="nombre"

                value={formData.nombre}

                onChange={handleChange}

                InputProps={{

                    startAdornment: (

                        <InputAdornment position="start">

                            <Person color="primary"/>

                        </InputAdornment>

                    )

                }}

            />

        </Grid>

        <Grid     size={{
        xs:12,
        md:6
    }}>

            <TextField

                fullWidth

                required

                label="Apellido"

                name="apellido"

                value={formData.apellido}

                onChange={handleChange}

                InputProps={{

                    startAdornment: (

                        <InputAdornment position="start">

                            <Badge color="primary"/>

                        </InputAdornment>

                    )

                }}

            />

        </Grid>

        <Grid     size={{
        xs:12,
        md:6
    }}>

            <TextField

                fullWidth

                required

                label="Teléfono"

                name="telefono"

                value={formData.telefono}

                onChange={handleChange}

                InputProps={{

                    startAdornment: (

                        <InputAdornment position="start">

                            <Phone color="primary"/>

                        </InputAdornment>

                    )

                }}

            />

        </Grid>

        <Grid     size={{
        xs:12,
        md:6
    }}>

            <TextField

                fullWidth

                required

                type="email"

                label="Correo"

                name="correo"

                value={formData.correo}

                onChange={handleChange}

                InputProps={{

                    startAdornment: (

                        <InputAdornment position="start">

                            <Email color="primary"/>

                        </InputAdornment>

                    )

                }}

            />

        </Grid>
        
        <Grid size={{ xs:12 }}>

                    <TextField

                    fullWidth

                    required

                    label="Dirección"

                    name="direccion"

                    value={formData.direccion}

                    onChange={handleChange}

                    InputProps={{

                        startAdornment:(

                <InputAdornment position="start">

                    <LocationOn color="error"/>

                </InputAdornment>

            )

        }}

    />

    </Grid>

    <Grid

    size={12}

>

            <FormControlLabel

                control={

                    <Switch

                        checked={formData.estado}

                        name="estado"

                        onChange={handleChange}

                        color="success"

                    />

                }

                label={

                    <Typography fontWeight="bold">

                        {formData.estado ? "Proveedor Activo" : "Proveedor Inactivo"}

                    </Typography>

                }

            />

        </Grid>

        </Grid>
    </FormCard>

    </DialogContent>

        
        <DialogActions sx={{ px:3, pb:3 }}>

    <Button

        variant="outlined"

        color="inherit"

        onClick={onClose}

    >

        Cancelar

    </Button>

   <LoadingButton

    type="submit"

    variant="contained"

    loading={saving}

    loadingText={

        providerToEdit

            ? "Actualizando..."

            : "Guardando..."

    }

    >

    {

        providerToEdit

            ? "Actualizar Proveedor"

            : "Guardar Proveedor"

    }

        </LoadingButton>

        </DialogActions>

      </form>
      

    </Dialog>
    
    
    

  );

};