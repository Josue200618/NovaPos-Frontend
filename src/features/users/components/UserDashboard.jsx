import React, { useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useUsers } from '../hooks/useUsers';
import { UserTable } from './UserTable';
import { UserForm } from './UserForm';
import { UserFilters } from './UserFilters'; // Importamos el nuevo filtro
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

export const UserDashboard = () => {
  const {
  users,
  totalCount,
  loading,
  error,
  page,
  rowsPerPage,
  searchTerm,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSearchChange,
  createCliente,
  updateCliente,
  deleteCliente
} = useUsers();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [clienteEliminar, setClienteEliminar] = useState(null);

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
  if (selectedUser) {
    updateCliente(selectedUser._id, formData);
  } else {
    createCliente(formData);
  }
};

  const handleDeleteClick = (cliente) => {

    setClienteEliminar(cliente);

    setDeleteOpen(true);

};

  const confirmDelete = () => {

    deleteCliente(clienteEliminar._id);

    setDeleteOpen(false);

};

  return (
  <Container maxWidth="lg" sx={{ mt: 5 }}>
    
    {/* Contenedor del Título y el Botón alineados en los extremos */}
   {/* Fila del Título */}
<Box sx={{ mb: 2 }}>
  <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
    Gestión de Clientes
  </Typography>
</Box>

{/* Fila del Botón (Alineado a la izquierda de forma natural) */}
<Box sx={{ display:"flex", justifyContent:"flex-start",  mb: 3 }}>
  <Button 
    variant="contained" 
    color="primary" 
    startIcon={<AddIcon />} 
    onClick={handleOpenCreate}
  >
    Agregar Cliente
  </Button>
</Box>
    {/* Alertas de error si existen */}
    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

    {/* El componente de Filtros ahora respira tranquilamente abajo */}
    <Box sx={{ mb: 3 }}>
      <UserFilters value={searchTerm} onChange={handleSearchChange} />
    </Box>

    {/* Tabla de resultados */}
    {loading ? (
      <Box sx={{

      display:"flex",

      justifyContent:"center"}} my={5}><CircularProgress /></Box>
    ) : (
      <UserTable
        users={users}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteClick}
      />
    )}

    <UserForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleFormSubmit} userToEdit={selectedUser} />
     
      <ConfirmDialog

    open={deleteOpen}

    title="Eliminar Cliente"

    message={

        clienteEliminar

            ? `¿Deseas eliminar a ${clienteEliminar.nombre} ${clienteEliminar.apellido}? Esta acción no podrá deshacerse.`

            : ""

    }

    confirmText="Eliminar"

    cancelText="Cancelar"

    confirmColor="error"

    onConfirm={confirmDelete}

    onCancel={() => setDeleteOpen(false)}

  />

  </Container>
);
};
