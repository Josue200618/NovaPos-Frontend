import { useEffect, useState, useMemo } from "react";
import { purchaseService } from "../services/purchaseService";

export const usePurchases = () => {

    const [purchases, setPurchases] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [total, setTotal] = useState(0);

    const fetchPurchases = async () => {

        setLoading(true);

        try {

            const data = await purchaseService.getAll(
                page + 1,
                rowsPerPage
            );

            setPurchases(data.compras || []);

            setTotal(data.total || 0);

        } catch (err) {

            console.log(err);

            setError("Error al cargar compras");

        } finally {

            setLoading(false);

        }

    };

    const createPurchase = async (purchase) => {


    const respuesta = await purchaseService.create(purchase);


    fetchPurchases();

};

    const annulPurchase = async (id) => {

        await purchaseService.annul(id);

        fetchPurchases();

    };

    const filteredPurchases = useMemo(() => {

    if (!searchTerm.trim()) return purchases;

    return purchases.filter((compra) => {

        const proveedor =
            `${compra.proveedor?.nombre || ""} ${compra.proveedor?.apellido || ""}`
                .toLowerCase();

        return proveedor.includes(searchTerm.toLowerCase());

    });

}, [purchases, searchTerm]);


    useEffect(() => {

        fetchPurchases();

    }, [page, rowsPerPage]);

   
    const handleChangePage = (event, newPage) => {

    setPage(newPage);

};

    const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);

};

    return {

        purchases: filteredPurchases,

        loading,

        error,

        createPurchase,

        annulPurchase,

        searchTerm,

        setSearchTerm,

        page,

        rowsPerPage,

        total,

        handleChangePage,

        handleChangeRowsPerPage

    };

};