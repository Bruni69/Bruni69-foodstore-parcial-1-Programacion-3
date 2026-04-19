import type { CartItem } from "../../../types/product";

const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    const carrito: CartItem[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const mensajeVacio = document.getElementById('carrito-vacio');
    const contenedor = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total-carrito');

    if (!contenedor || !totalElemento || !mensajeVacio) return;

    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block';
        return;
    }

    let total = 0;

    carrito.forEach(item => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>Precio: $${Number(item.precio).toFixed(2)}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: $${(Number(item.precio) * item.cantidad).toFixed(2)}</p>
        `;
        contenedor.appendChild(article);
        total += Number(item.precio) * item.cantidad;
    });

    totalElemento.innerHTML = `Total: $${total.toFixed(2)}`;
};

cargarCarrito();