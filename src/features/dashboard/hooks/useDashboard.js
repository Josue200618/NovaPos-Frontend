import { useEffect, useState } from "react";

import { clienteService } from "../../users/services/clienteService";
import { productService } from "../../products/services/productService";
import { providerService } from "../../providers/services/providerService";
import { purchaseService } from "../../purchases/services/purchaseService";
import { saleService } from "../../sales/services/saleService";

export const useDashboard = () => {

    const [stats, setStats] = useState({

        clientes: 0,

        productos: 0,

        proveedores: 0,

        compras: 0,

        ventas: 0,

        comprasHoy: 0,

        ventasHoy: 0

    });

const [currentTime, setCurrentTime] = useState(new Date());

const usuario = JSON.parse(

    localStorage.getItem("usuario")

);

    const loadDashboard = async () => {

        try {

            const [

                clientes,

                productos,

                proveedores,

                compras,

                ventas

            ] = await Promise.all([
                clienteService.getAllDashboard(),

                productService.getAllDashboard(),

                providerService.getAllDashboard(),

                purchaseService.getAllDashboard(),

                saleService.getAllDashboard(),

            ]);

            const listaClientes = Array.isArray(clientes)
                ? clientes
                : clientes.clientes || [];

            const listaProductos = Array.isArray(productos)
                ? productos
                : productos.productos || [];

            const listaProveedores = Array.isArray(proveedores)
                ? proveedores
                : proveedores.proveedores || [];

            const listaCompras = Array.isArray(compras)
                ? compras
                : compras.compras || [];

            const listaVentas = Array.isArray(ventas)
                ? ventas
                : ventas.ventas || [];

            const hoy = new Date().toDateString();

            const comprasHoy = listaCompras
                .filter(c => new Date(c.fecha).toDateString() === hoy && c.estado)
                .reduce((acc, c) => acc + c.total, 0);

            const ventasHoy = listaVentas
                .filter(v => new Date(v.fecha).toDateString() === hoy && v.estado)
                .reduce((acc, v) => acc + v.total, 0);

            const ultimasVentas = [...listaVentas]
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .slice(0, 5);

            const ultimasCompras = [...listaCompras]
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .slice(0, 5);

            setStats({

                clientes: listaClientes.length,

                productos: listaProductos.length,

                proveedores: listaProveedores.length,

                compras: listaCompras.filter(c => c.estado).length,

                ventas: listaVentas.filter(v => v.estado).length,

                comprasHoy,

                ventasHoy,

                ultimasVentas,

                ultimasCompras

            });
        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    useEffect(() => {

    const timer = setInterval(() => {

        setCurrentTime(new Date());

    },1000);

    return ()=>clearInterval(timer);

},[]);

    return {

    ...stats,

    usuario,

    currentTime

};
    

};