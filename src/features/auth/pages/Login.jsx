import { Box, Container } from "@mui/material";
import LoginCard from "../components/LoginCard";

export default function Login() {

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

                <LoginCard />

            </Container>

        </Box>

    );

}