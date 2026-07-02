import Grid from "@mui/material/Grid";
import {

    Container,

    Typography,

    Paper,

    Box,

    Avatar,

    Chip

} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useDashboard } from "../hooks/useDashboard";

import StatCard from "../components/StatCard";
import RecentSales from "../components/RecentSales";
import RecentPurchases from "../components/RecentPurchases";

export default function Dashboard() {

    const {

    usuario,

    currentTime,

    ultimasVentas,

    ultimasCompras,

    ...stats

} = useDashboard();

    return (

        <Container maxWidth="xl" sx={{ mt: 4 }}>

            <Paper

    elevation={3}

    sx={{

        p:4,

        mb:4,

        borderRadius:4

    }}

>

    <Grid container alignItems="center">

        <Grid size={{ xs:12, md:8 }}>

            <Typography

                variant="h4"

                fontWeight="bold"

            >

                👋 Hola, {usuario?.nombre || "Usuario"}

            </Typography>

            <Typography

                mt={1}

                color="text.secondary"

            >

                Bienvenido nuevamente a NovaPOS

            </Typography>

            <Typography

                mt={2}

                color="text.secondary"

            >

                {

                    currentTime.toLocaleDateString(

                        "es-CO",

                        {

                            weekday:"long",

                            day:"numeric",

                            month:"long",

                            year:"numeric"

                        }

                    )

                }

            </Typography>

            <Typography

                fontWeight="bold"

                color="primary"

            >

                {

                    currentTime.toLocaleTimeString(

                        "es-CO"

                    )

                }

            </Typography>

        </Grid>

        <Grid

            size={{ xs:12, md:4 }}

            sx={{

                display:"flex",

                justifyContent:{

                    xs:"flex-start",

                    md:"flex-end"

                },

                mt:{

                    xs:3,

                    md:0

                }

            }}

        >

            <Paper

                elevation={1}

                sx={{

                    p:2,

                    borderRadius:3,

                    minWidth:220

                }}

            >

                <Box

                    display="flex"

                    alignItems="center"

                    gap={2}

                >

                    <Avatar

                        sx={{

                            bgcolor:"#1976d2",

                            width:55,

                            height:55

                        }}

                    >

                        {

                            usuario?.nombre?.charAt(0)

                        }

                    </Avatar>

                    <Box>

                        <Typography

                            fontWeight="bold"

                        >

                            {usuario?.nombre}

                        </Typography>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            Administrador

                        </Typography>

                        <Chip

                            label="Sesión Activa"

                            color="success"

                            size="small"

                            sx={{ mt:1 }}

                        />

                    </Box>

                </Box>

            </Paper>

        </Grid>

    </Grid>

</Paper>

            <Grid container spacing={3}>

                <Grid size={{ xs:12, md:6, lg:4 }}>

                    <StatCard

                        title="Ventas Hoy"

                        value={`$${stats.ventasHoy.toLocaleString()}`}

                        color="#2e7d32"

                        icon={<PaidIcon fontSize="inherit" />}

                    />

                </Grid>

                <Grid size={{ xs:12, md:6, lg:4 }}>

                    <StatCard

                        title="Compras Hoy"

                        value={`$${stats.comprasHoy.toLocaleString()}`}

                        color="#ef6c00"

                        icon={<ShoppingCartIcon fontSize="inherit" />}

                    />

                </Grid>

                <Grid size={{ xs:12, md:6, lg:4 }}>

                    <StatCard

                        title="Clientes"

                        value={stats.clientes}

                        color="#1565c0"

                        icon={<PeopleIcon fontSize="inherit" />}

                    />

                </Grid>

                <Grid size={{ xs:12, md:6, lg:4 }}>

                    <StatCard

                        title="Productos"

                        value={stats.productos}

                        color="#6a1b9a"

                        icon={<InventoryIcon fontSize="inherit" />}

                    />

                </Grid>

                <Grid size={{ xs:12, md:6, lg:4 }}>

                    <StatCard

                        title="Proveedores"

                        value={stats.proveedores}

                        color="#c62828"

                        icon={<LocalShippingIcon fontSize="inherit" />}

                    />

                </Grid>

                <Grid size={{ xs:12, md:6, lg:4 }}>

                    <StatCard

                        title="Ventas Registradas"

                        value={stats.ventas}

                        color="#00838f"

                        icon={<PointOfSaleIcon fontSize="inherit" />}

                    />

                </Grid>

                <Grid size={{ xs:12, md:6, lg:4 }}>

                    <StatCard

                        title="Compras Registradas"

                        value={stats.compras}

                        color="#8e24aa"

                        icon={<ReceiptLongIcon fontSize="inherit" />}

                    />

                </Grid>

            </Grid>

                <Typography

                        variant="h5"

                        fontWeight="bold"

                        mt={6}

                        mb={3}

                    >

                        Actividad Reciente

                    </Typography>

                    <Grid container spacing={3}>

                        <Grid size={{ xs:12, lg:6 }}>

                            <RecentSales

                                ventas={ultimasVentas}

                            />

                        </Grid>

                        <Grid size={{ xs:12, lg:6 }}>

                            <RecentPurchases

                                compras={ultimasCompras}

                            />

                        </Grid>

                    </Grid>

        </Container>

    );

}