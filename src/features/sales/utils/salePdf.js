import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateSalePdf = (sale) => {

    const doc = new jsPDF();

    //=========================
    // ENCABEZADO
    //=========================

    doc.setFontSize(20);

    doc.setTextColor(33, 150, 243);

    doc.text("NovaPOS", 105, 18, { align: "center" });

    doc.setFontSize(11);

    doc.setTextColor(90);

    doc.text("Sistema Punto de Venta", 105, 25, { align: "center" });

    doc.setDrawColor(180);

    doc.line(15, 30, 195, 30);

    //=========================
    // TITULO
    //=========================

    doc.setFontSize(16);

    doc.setTextColor(0);

    doc.text("FACTURA / DETALLE DE VENTA", 15, 42);

    //=========================
    // INFORMACIÓN GENERAL
    //=========================

    const fecha = new Date(sale.fecha).toLocaleString("es-CO", {

        day: "2-digit",

        month: "2-digit",

        year: "numeric",

        hour: "2-digit",

        minute: "2-digit",

        hour12: true

    });

    doc.setFontSize(11);

    doc.text(`Venta: ${sale._id}`, 15, 55);

    doc.text(`Fecha: ${fecha}`, 15, 63);

    //=========================
    // CLIENTE
    //=========================

    doc.setFontSize(13);

    doc.text("Cliente", 15, 78);

    doc.setFontSize(11);

    doc.text(

        `${sale.cliente.nombre} ${sale.cliente.apellido}`,

        15,

        86

    );

    doc.text(

        `Teléfono: ${sale.cliente.telefono}`,

        15,

        94

    );

    doc.text(

        `Correo: ${sale.cliente.correo}`,

        15,

        102

    );

    //=========================
    // TABLA
    //=========================

    autoTable(doc, {

        startY: 112,

        head: [[

            "Producto",

            "Cantidad",

            "Precio",

            "Subtotal"

        ]],

        body: sale.detalles.map(item => [

            item.nombre,

            item.cantidad,

            `$${item.precioVenta.toLocaleString()}`,

            `$${item.subtotal.toLocaleString()}`

        ])

    });

    //=========================
    // TOTALES
    //=========================

    const finalY = doc.lastAutoTable.finalY + 12;

    doc.setFontSize(12);

    doc.text(

        `TOTAL PRODUCTOS: ${sale.detalles.length}`,

        15,

        finalY

    );

    doc.setFontSize(14);

    doc.setTextColor(33, 150, 243);

    doc.text(

        `TOTAL: $${sale.total.toLocaleString()}`,

        15,

        finalY + 10

    );

    //=========================
    // PIE
    //=========================

    doc.setTextColor(100);

    doc.setFontSize(10);

    doc.text(

        "Documento generado automáticamente",

        105,

        finalY + 30,

        {

            align: "center"

        }

    );

    doc.text(

        "Gracias por su compra.",

        105,

        finalY + 36,

        {

            align: "center"

        }

    );

    //=========================
    // DESCARGA
    //=========================

    const nombre = sale.cliente.nombre.replace(/\s+/g, "-");

    const apellido = sale.cliente.apellido.replace(/\s+/g, "-");

    doc.save(

        `Venta-${nombre}-${apellido}.pdf`

    );

};