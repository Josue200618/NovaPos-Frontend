import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import RegisterForm from "./RegisterForm";

export default function RegisterCard() {

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

                        <PersonAddAlt1Icon fontSize="large" />

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

                        Crear cuenta

                    </Typography>

                </Box>

                <RegisterForm />

            </CardContent>

        </Card>

    );

}