import { useState, useEffect, useMemo } from 'react';

import { clienteService } from '../services/clienteService';


export const useUsers = () => {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


// Estados para Paginación

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [totalCount, setTotalCount] = useState(0);

// Estado para Filtros

const [searchTerm, setSearchTerm] = useState('');
const fetchUsers = async () => {
  setLoading(true);

  try {

    const data = await clienteService.getAll(page + 1, rowsPerPage);

    console.log("RESPUESTA API:");
    console.log(data);

    setUsers(data.clientes || []);
    setTotalCount(data.total);

  } catch (err) {

    console.log("ERROR:");
    console.log(err);

    setError('Error al cargar los clientes');

  } finally {

    setLoading(false);

  }
};

// LÓGICA DE FILTRADO (Se ejecuta eficientemente con useMemo)

const filteredUsers = useMemo(() => {

    return users.filter((cliente) => {

        const nombreMatch =
            cliente.nombre?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        const correoMatch =
            cliente.correo?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        return nombreMatch || correoMatch;

    });

}, [users, searchTerm]);





// Manejadores de cambio de página

const handleChangePage = (event, newPage) => {
setPage(newPage);

};

const handleChangeRowsPerPage = (event) => {
setRowsPerPage(parseInt(event.target.value, 10));
setPage(0); // Reiniciar a la primera página al cambiar el tamaño

};


const handleSearchChange = (value) => {
setSearchTerm(value);
setPage(0); // Reiniciar a la primera página al buscar

};


const createCliente = async (userData) => {
try {

await clienteService.create(userData);
await fetchUsers();
} catch (err) {

setError('Error al crear el cliente');
throw err;

}

};


const updateCliente = async (id, clienteData) => {

    try {

    await clienteService.update(id,  clienteData);
    await fetchUsers();

} catch (err) {

    setError('Error al actualizar el cliente');
    throw err;

}

};


const deleteCliente = async (id) => {

try {

await clienteService.delete(id);

await fetchUsers();

} catch (err) {

setError('Error al eliminar el cliente');

}};


useEffect(() => {

    fetchUsers();

}, [page, rowsPerPage]);


return {

users: filteredUsers, // Retornamos sólo los usuarios que corresponden a la página y filtro

totalCount, // Total de elementos que cumplen el filtro para la paginación

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

deleteCliente,

};

};