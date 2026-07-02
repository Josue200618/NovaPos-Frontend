import {

    Paper,
    Box,
    Typography,
    Avatar,
    Fade

} from "@mui/material";

export default function FormCard({

    title,

    subtitle,

    icon,

    children

}) {

    return (

        <Fade in timeout={500}>

            <Paper

                elevation={6}

                sx={{

                    borderRadius:4,

                    overflow:"hidden",

                    boxShadow:"0 12px 35px rgba(0,0,0,.12)"

                }}

            >

                <Box

                    sx={{

                        background:"linear-gradient(135deg,#1976d2,#42a5f5)",

                        color:"#fff",

                        py:4,

                        display:"flex",

                        flexDirection:"column",

                        alignItems:"center"

                    }}

                >

                    <Avatar

                        sx={{

                            width:85,

                            height:85,

                            bgcolor:"#fff",

                            color:"#1976d2",

                            mb:2,

                            boxShadow:4

                        }}

                    >

                        {icon}

                    </Avatar>

                    <Typography

                        variant="h5"

                        fontWeight="bold"

                    >

                        {title}

                    </Typography>

                    {

                        subtitle && (

                            <Typography

                                sx={{

                                    opacity:.85,

                                    mt:.5

                                }}

                            >

                                {subtitle}

                            </Typography>

                        )

                    }

                </Box>

                <Box

                    sx={{

                        p:4

                    }}

                >

                    {children}

                </Box>

            </Paper>

        </Fade>

    );

}