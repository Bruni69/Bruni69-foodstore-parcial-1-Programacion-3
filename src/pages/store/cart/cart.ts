import type { CartItem } from "../../../types/product";
const btnVaciar = document.getElementById('btn-vaciar');
if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        cargarCarrito();
    });
}
const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    let carrito: CartItem[] = [];
try {
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
} catch (error) {
    console.error('Error al leer el carrito:', error);
    localStorage.removeItem('carrito');
}

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
            <div style="display:flex; align-items:center; gap:10px;">
            <button type="button" class="btn-cantidad" aria-label="Quitar uno" onclick="eliminarDelCarrito(${item.id})">−</button>
            <span aria-label="Cantidad">${item.cantidad}</span>
            <button type="button" class="btn-cantidad" aria-label="Agregar uno" onclick="agregarUno(${item.id})">+</button>
            </div>
            <p>Subtotal: $${(Number(item.precio) * item.cantidad).toFixed(2)}</p>
        `;
        contenedor.appendChild(article);
        total += Number(item.precio) * item.cantidad;
    });

    totalElemento.innerHTML = `Total: $${total.toFixed(2)}`;
};

(window as any).eliminarDelCarrito = (id: number) => {
    const carritoGuardado = localStorage.getItem('carrito');
    let carrito: CartItem[] = [];
try {
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
} catch (error) {
    console.error('Error al leer el carrito:', error);
    localStorage.removeItem('carrito');
}
    
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

(window as any).agregarUno = (id: number) => {
    const carritoGuardado = localStorage.getItem('carrito');
    let carrito: CartItem[] = [];
try {
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
} catch (error) {
    console.error('Error al leer el carrito:', error);
    localStorage.removeItem('carrito');
}
    
    const item = carrito.find(item => item.id === id);
    if (item) item.cantidad++;
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
};

cargarCarrito();