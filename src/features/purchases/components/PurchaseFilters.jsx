import {
    TextField,
    InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function PurchaseFilters({

    value,
    onChange

}) {

    return (

        <TextField

            fullWidth

            placeholder="Buscar por proveedor..."

            value={value}

            onChange={(e) => onChange(e.target.value)}

            InputProps={{

                startAdornment: (

                    <InputAdornment position="start">

                        <SearchIcon />

                    </InputAdornment>

                )

            }}

        />

    );

}