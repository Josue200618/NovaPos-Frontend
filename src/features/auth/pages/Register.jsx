import { Box, Container } from "@mui/material";
import RegisterCard from "../components/RegisterCard";

export default function Register() {

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)"
            }}
        >

            <Container maxWidth="sm">

                <RegisterCard />

            </Container>

        </Box>

    );

}