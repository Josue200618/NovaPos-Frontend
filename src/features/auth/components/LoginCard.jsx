import {

Card,
CardContent,
Typography,
Avatar,
Box

} from "@mui/material";

import LoginForm from "./LoginForm";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginCard(){

    return(

        <Card
            elevation={10}
            sx={{

                borderRadius:4,
                p:2

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

                            width:70,
                            height:70,
                            bgcolor:"primary.main",
                            mb:2

                        }}

                    >

                        <LockOutlinedIcon fontSize="large"/>

                    </Avatar>

                    <Typography

                        variant="h4"
                        fontWeight="bold"

                    >

                        NovaPOS

                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{mb:4}}

                    >

                        Iniciar sesión

                    </Typography>

                </Box>

                <LoginForm/>

            </CardContent>

        </Card>

    )

}