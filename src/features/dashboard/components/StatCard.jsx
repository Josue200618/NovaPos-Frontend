import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({

    title,
    value,
    icon,
    color = "#1976d2"

}) {

    return (

        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 4,
                height: "100%"
            }}
        >

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                        >

                            {title}

                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color }}
                        >

                            {value}

                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            color,
                            fontSize: 42
                        }}
                    >

                        {icon}

                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}