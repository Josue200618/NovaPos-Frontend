import { Box, Container } from "@mui/material";
import ForgotPasswordCard from "../components/ForgotPasswordCard";

export default function ForgotPassword() {

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

                <ForgotPasswordCard />

            </Container>

        </Box>

    );

}