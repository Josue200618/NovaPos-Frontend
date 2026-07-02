import { useEffect, useMemo, useState } from "react";
import { saleService } from "../services/saleService";

export const useSales = () => {

    const [sales, setSales] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [total, setTotal] = useState(0);

    const fetchSales = async () => {

        setLoading(true);

        try {

            const data = await saleService.getAll(
                page + 1,
                rowsPerPage
            );

            setSales(data.ventas || []);

            setTotal(data.total || 0);


        } catch (error) {

            console.log(error);

            setError("Error al cargar ventas");

        } finally {

            setLoading(false);

        }

    };

    const createSale = async (sale) => {

        await saleService.create(sale);

        fetchSales();

    };

    const annulSale = async (id) => {

        await saleService.annul(id);

        fetchSales();

    };

    const filteredSales = useMemo(() => {

    if (!searchTerm.trim()) return sales;

    return sales.filter((venta) => {

        const nombre = `${venta.cliente?.nombre || ""} ${venta.cliente?.apellido || ""}`
            .toLowerCase();

        return nombre.includes(searchTerm.toLowerCase());

    });

}, [sales, searchTerm]);

    useEffect(() => {

        fetchSales();

    }, [page, rowsPerPage]);


    const handleChangePage = (event, newPage) => {

    setPage(newPage);

    };


    const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);

    };

    return {

        sales: filteredSales,

        loading,

        error,

        createSale,

        annulSale,

        searchTerm,

        setSearchTerm,

        page,

        rowsPerPage,

        total,

        handleChangePage,

        handleChangeRowsPerPage

    };

};