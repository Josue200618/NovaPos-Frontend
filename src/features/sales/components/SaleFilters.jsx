import { Paper, TextField } from "@mui/material";

export default function SaleFilters({

    searchTerm,

    onSearch

}) {

    return (

        <Paper sx={{ p: 2, mb: 2 }}>

            <TextField

                fullWidth

                label="Buscar por cliente"

                value={searchTerm}

                onChange={(e) => onSearch(e.target.value)}

            />

        </Paper>

    );

}