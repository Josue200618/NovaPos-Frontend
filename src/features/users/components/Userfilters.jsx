import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const UserFilters = ({ value, onChange }) => {
    return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
        fullWidth
        sx={{
        maxWidth: 500
        }}
        variant="outlined"
        placeholder="Buscar por nombre o correo electrónico..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
            input: {
             startAdornment: (
                <InputAdornment position="start">
                 <SearchIcon color="action" />
                </InputAdornment>

            ),

        },

    }}

    />

    </Box>

    );

};