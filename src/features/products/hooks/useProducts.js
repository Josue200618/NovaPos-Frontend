import { useState, useEffect, useMemo } from "react";

import { productService } from "../services/productService";

export const useProducts = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchTerm, setSearchTerm] = useState("");
    
    const [totalCount, setTotalCount] = useState(0);

    const fetchProducts = async () => {

        setLoading(true);

        try {

            const data = await productService.getAll(page + 1, rowsPerPage);

           setProducts(data.productos || []);

           setTotalCount(data.total);

        } catch {

            setError("Error al cargar productos");

        } finally {

            setLoading(false);

        }

    };

    const filteredProducts = useMemo(() => {

        return products.filter((producto) => {

            return (

                producto.nombre

                    ?.toLowerCase()

                    .includes(searchTerm.toLowerCase()) ||

                producto.tipo

                    ?.toLowerCase()

                    .includes(searchTerm.toLowerCase())

            );

        });

    }, [products, searchTerm]);


    const handleSearchChange = (value) => {

        setSearchTerm(value);

        setPage(0);

    };

    const handleChangePage = (_, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (e) => {

        setRowsPerPage(parseInt(e.target.value));

        setPage(0);

    };

    const createProduct = async (producto) => {

        await productService.create(producto);

        fetchProducts();

    };

    const updateProduct = async (id, producto) => {

        await productService.update(id, producto);

        fetchProducts();

    };

    const deleteProduct = async (id) => {

        await productService.delete(id);

        fetchProducts();

    };

    useEffect(() => {

        fetchProducts();

    }, [page, rowsPerPage]);

    return {

        products: filteredProducts,

        totalCount,

        loading,

        error,

        page,

        rowsPerPage,

        searchTerm,

        handleSearchChange,

        handleChangePage,

        handleChangeRowsPerPage,

        createProduct,

        updateProduct,

        deleteProduct

    };

};