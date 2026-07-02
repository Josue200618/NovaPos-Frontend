import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Tooltip,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import {
    Menu,
    Dashboard,
    People,
    Inventory,
    LocalShipping,
    ShoppingCart,
    PointOfSale,
    Logout
} from "@mui/icons-material";

import SnackbarAlert from "../components/ui/SnackbarAlert";
import ConfirmDialog from "../components/ui/ConfirmDialog";

const drawerWidth = 250;

export default function DashboardLayout() {

    const location = useLocation();

    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const [logoutDialog, setLogoutDialog] = useState(false);

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: ""

    });

    const toggleDrawer = () => {

        setOpen(!open);

    };

    const logout = () => {

        localStorage.removeItem("token");

        setLogoutDialog(false);

        setSnackbar({

            open: true,

            severity: "success",

            message: "Sesión cerrada correctamente."

        });

        setTimeout(() => {

            navigate("/login");

        }, 1200);

    };

    const menu = [

        {
            text: "Dashboard",
            path: "/dashboard",
            icon: <Dashboard />
        },

        {
            text: "Clientes",
            path: "/dashboard/clientes",
            icon: <People />
        },

        {
            text: "Productos",
            path: "/dashboard/productos",
            icon: <Inventory />
        },

        {
            text: "Proveedores",
            path: "/dashboard/proveedores",
            icon: <LocalShipping />
        },

        {
            text: "Compras",
            path: "/dashboard/compras",
            icon: <ShoppingCart />
        },

        {
            text: "Ventas",
            path: "/dashboard/ventas",
            icon: <PointOfSale />
        }

    ];


    return (

    <Box sx={{ display: "flex" }}>

        <AppBar
            position="fixed"
            sx={{
                zIndex: 1300
            }}
        >

            <Toolbar>

                <IconButton

                    color="inherit"

                    onClick={toggleDrawer}

                >

                    <Menu />

                </IconButton>

                <Typography

                    variant="h6"

                    sx={{

                        flexGrow: 1,

                        ml: 2,

                        fontWeight: "bold"

                    }}

                >

                    NovaPOS

                </Typography>

                <Tooltip title="Administrador">

                    <Avatar>

                        A

                    </Avatar>

                </Tooltip>

            </Toolbar>

        </AppBar>

        <Drawer

            variant="permanent"

            sx={{

                width: open ? drawerWidth : 70,

                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: open ? drawerWidth : 70,

                    transition: ".3s",

                    overflowX: "hidden"

                }

            }}

        >

            <Box

                sx={{

                    display: "flex",

                    flexDirection: "column",

                    height: "100%"

                }}

            >

                <Toolbar />

                <Divider />

                <List sx={{ flexGrow: 1 }}>

                    {

                        menu.map((item) => (

                            <ListItemButton

                                key={item.text}

                                component={Link}

                                to={item.path}

                                selected={location.pathname === item.path}

                                sx={{

                                    borderRadius: 2,

                                    mx: 1,

                                    mb: 1,

                                    "&.Mui-selected": {

                                        backgroundColor: "#1976d2",

                                        color: "#fff"

                                    },

                                    "&.Mui-selected .MuiListItemIcon-root": {

                                        color: "#fff"

                                    }

                                }}

                            >

                                <ListItemIcon>

                                    {item.icon}

                                </ListItemIcon>

                                {

                                    open &&

                                    <ListItemText

                                        primary={item.text}

                                    />

                                }

                            </ListItemButton>

                        ))

                    }

                </List>

                <Divider />

                <Box sx={{ p: 1 }}>

                    <ListItemButton

                        onClick={() => setLogoutDialog(true)}

                        sx={{

                            borderRadius: 2

                        }}

                    >

                        <ListItemIcon>

                            <Logout color="error" />

                        </ListItemIcon>

                        {

                            open &&

                            <ListItemText

                                primary="Cerrar sesión"

                            />

                        }

                    </ListItemButton>

                </Box>

            </Box>

        </Drawer>

        <Box

            component="main"

            sx={{

                flexGrow: 1,

                p: 4,

                mt: 8,

                backgroundColor: "#f5f5f5",

                minHeight: "100vh"

            }}

        >

            <Outlet />

        </Box>

        <ConfirmDialog

            open={logoutDialog}

            title="Cerrar sesión"

            message="¿Deseas salir de NovaPOS?"

            confirmText="Cerrar sesión"

            cancelText="Cancelar"

            onConfirm={logout}

            onCancel={() => setLogoutDialog(false)}

        />

        <SnackbarAlert

            open={snackbar.open}

            severity={snackbar.severity}

            message={snackbar.message}

            onClose={() =>

                setSnackbar({

                    ...snackbar,

                    open: false

                })

            }

        />

    </Box>

);

}