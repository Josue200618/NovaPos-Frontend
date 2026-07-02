import { Box, Container } from "@mui/material";
import ResetPasswordCard from "../components/ResetPasswordCard";

export default function ResetPassword() {

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

                <ResetPasswordCard />

            </Container>

        </Box>

    );

}