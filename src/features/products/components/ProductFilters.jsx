import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ProductFilters({ value, onChange }) {

    return (

        <Box sx={{ mb:3 }}>

            <TextField

                fullWidth

                placeholder="Buscar por nombre o tipo..."

                value={value}

                onChange={(e)=>onChange(e.target.value)}

                slotProps={{

                    input:{

                        startAdornment:(

                            <InputAdornment position="start">

                                <SearchIcon color="action"/>

                            </InputAdornment>

                        )

                    }

                }}

            />

        </Box>

    );

}