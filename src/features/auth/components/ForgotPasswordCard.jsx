import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";

import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordCard() {

    return (

        <Card
            elevation={10}
            sx={{
                borderRadius: 4,
                p: 2
            }}
        >

            <CardContent>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >

                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            bgcolor: "primary.main",
                            mb: 2
                        }}
                    >

                        <LockResetIcon fontSize="large" />

                    </Avatar>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >

                        NovaPOS

                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >

                        Recuperar contraseña

                    </Typography>

                </Box>

                <ForgotPasswordForm />

            </CardContent>

        </Card>

    );

}