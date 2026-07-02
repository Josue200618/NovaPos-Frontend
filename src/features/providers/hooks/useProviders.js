import { useState, useEffect, useMemo } from "react";
import { providerService } from "../services/providerService";

export const useProviders = () => {

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchTerm, setSearchTerm] = useState("");
    
    const [totalCount, setTotalCount] = useState(0);

    const fetchProviders = async () => {

        setLoading(true);

        try {

            const data = await providerService.getAll(page + 1, rowsPerPage);

            setProviders(data.proveedores || []);

            setTotalCount(data.total);

        } catch (err) {

            console.log(err);

            setError("Error al cargar los proveedores");

        } finally {

            setLoading(false);

        }

    };

    const filteredProviders = useMemo(() => {

        return providers.filter((proveedor) => {

            const nombre =
                proveedor.nombre?.toLowerCase().includes(searchTerm.toLowerCase());

            const correo =
                proveedor.correo?.toLowerCase().includes(searchTerm.toLowerCase());

            return nombre || correo;

        });

    }, [providers, searchTerm]);


    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

    };

    const handleSearchChange = (value) => {

        setSearchTerm(value);

        setPage(0);

    };

    const createProvider = async (provider) => {

        await providerService.create(provider);

        fetchProviders();

    };

    const updateProvider = async (id, provider) => {

        await providerService.update(id, provider);

        fetchProviders();

    };

    const deleteProvider = async (id) => {

        await providerService.delete(id);

        fetchProviders();

    };

    useEffect(() => {

        fetchProviders();

    }, [page, rowsPerPage]);

    return {

        providers: filteredProviders,
        totalCount,

        loading,
        error,

        page,
        rowsPerPage,

        searchTerm,

        handleChangePage,
        handleChangeRowsPerPage,
        handleSearchChange,

        createProvider,
        updateProvider,
        deleteProvider

    };

};