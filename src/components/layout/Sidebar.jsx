import { Drawer, Toolbar, Typography, Box } from "@mui/material";

const drawerWidth = 250;

export default function Sidebar() {

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    boxSizing: "border-box",

                    background: "#1E293B",

                    color: "#fff"

                }

            }}
        >

            <Toolbar />

            <Box
                sx={{
                    p: 3
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >

                    NovaPOS

                </Typography>

                <Typography
                    variant="body2"
                    sx={{ mt: 1 }}
                >

                    Sistema POS

                </Typography>

            </Box>

        </Drawer>

    );

}