import { productos, categorias } from "../../../data/data";
import type { CartItem, IProduct } from "../../../types/product";

const cargarProductos = (lista: IProduct[] = productos) => {
    const contenedor = document.getElementById('productos-destacados');
    if (!contenedor) return;

    lista.forEach(producto => {
        const article = document.createElement('article');
        article.innerHTML = `
            <img src="${producto.imagen}" width="150" alt="${producto.nombre}">
            <h3><strong>${producto.nombre}</strong></h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
            <button type="button">Ver Detalles</button>
            <button type="button" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
        `;
        contenedor.appendChild(article);
    });
};

const cargarCategorias = () => {
    const listaCategorias = document.getElementById('lista-categorias');
    if (!listaCategorias) return;

    categorias.forEach(categoria => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${categoria}</a>`;

        li.addEventListener('click', (e) => {
            e.preventDefault();
            const productosFiltrados = productos.filter(p => p.categoria === categoria);
            const contenedor = document.getElementById('productos-destacados');
            if (contenedor) contenedor.innerHTML = '';
            cargarProductos(productosFiltrados);
        });

        listaCategorias.appendChild(li);
    });
};

const inputBuscar = document.getElementById('Buscar') as HTMLInputElement;
if (inputBuscar) {
    inputBuscar.addEventListener('input', () => {
        const textoBusqueda = inputBuscar.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(textoBusqueda)
        );
        const contenedor = document.getElementById('productos-destacados');
        if (productosFiltrados.length === 0) {
            if (contenedor) contenedor.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }
        if (contenedor) contenedor.innerHTML = '';
        cargarProductos(productosFiltrados);
    });
}

const btnTodos = document.getElementById('Todos');
if (btnTodos) {
    btnTodos.addEventListener('click', () => {
        const contenedor = document.getElementById('productos-destacados');
        if (contenedor) contenedor.innerHTML = '';
        if (inputBuscar) inputBuscar.value = '';
        cargarProductos();
    });
}

(window as any).agregarAlCarrito = (id: number, nombre: string, precio: number) => {
    const carritoGuardado = localStorage.getItem('carrito');
    const carrito: CartItem[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`"${nombre}" agregado al carrito`);
};

cargarCategorias();
cargarProductos();