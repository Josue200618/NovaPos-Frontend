import React from 'react';
import {
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
IconButton,
TablePagination,
Chip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const UserTable = ({
users,
onEdit,
onDelete,
totalCount,
page,
rowsPerPage,
onPageChange,
onRowsPerPageChange
}) => {

return (

<Paper
  sx={{
    width: '100%',
    mt: 3,
    boxShadow: 3,
    overflow: 'hidden'
  }}
>

  <TableContainer>

    <Table>

      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>

        <TableRow>

          <TableCell><strong>ID</strong></TableCell>

          <TableCell><strong>Nombre</strong></TableCell>

          <TableCell><strong>Apellido</strong></TableCell>

          <TableCell><strong>Teléfono</strong></TableCell>

          <TableCell><strong>Correo</strong></TableCell>

          <TableCell><strong>Estado</strong></TableCell>

          <TableCell align="center">
            <strong>Acciones</strong>
          </TableCell>

        </TableRow>

      </TableHead>

      <TableBody>

        {users.map((cliente) => (

          <TableRow key={cliente._id} hover>

            <TableCell>
              {cliente._id}
            </TableCell>

            <TableCell>
              {cliente.nombre}
            </TableCell>

            <TableCell>
              {cliente.apellido}
            </TableCell>

            <TableCell>
              {cliente.telefono}
            </TableCell>

            <TableCell>
              {cliente.correo}
            </TableCell>

            <TableCell>

              {cliente.estado ? (

                <Chip
                  label="Activo"
                  color="success"
                  size="small"
                />

              ) : (

                <Chip
                  label="Inactivo"
                  color="error"
                  size="small"
                />

              )}

            </TableCell>

            <TableCell align="center">

              <IconButton
                color="primary"
                onClick={() => onEdit(cliente)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => onDelete(cliente)}
              >
                <DeleteIcon />
              </IconButton>

            </TableCell>

          </TableRow>

        ))}

        {users.length === 0 && (

          <TableRow>

            <TableCell
              colSpan={7}
              align="center"
              sx={{ py: 3 }}
            >

              No se encontraron clientes.

            </TableCell>

          </TableRow>

        )}

      </TableBody>

    </Table>

  </TableContainer>

  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={totalCount}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    labelRowsPerPage="Filas por página"
  />

</Paper>


);

};
