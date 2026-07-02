import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {

    return (

        <AppBar
            position="static"
            elevation={0}
            color="inherit"
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >

                    Dashboard

                </Typography>

            </Toolbar>

        </AppBar>

    );

}