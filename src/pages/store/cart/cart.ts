import type { CartItem } from "../../../types/product";

const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    const carrito: CartItem[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const mensajeVacio = document.getElementById('carrito-vacio');
    const contenedor = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total-carrito');

    if (!contenedor || !totalElemento || !mensajeVacio) return;

    mensajeVacio.style.display = 'none';
    contenedor.innerHTML = '';
    totalElemento.innerHTML = '';

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
            <button type="button" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        contenedor.appendChild(article);
        total += Number(item.precio) * item.cantidad;
    });

    totalElemento.innerHTML = `Total: $${total.toFixed(2)}`;
};

(window as any).eliminarDelCarrito = (id: number) => {
    const carritoGuardado = localStorage.getItem('carrito');
    const carrito: CartItem[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        if (itemExistente.cantidad > 1) {
            itemExistente.cantidad--;
        } else {
            const carritoActualizado = carrito.filter(item => item.id !== id);
            localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
            cargarCarrito();
            return;
        }
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
};

cargarCarrito();