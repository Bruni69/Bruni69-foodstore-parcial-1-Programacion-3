import { PRODUCTS, getCategories } from "../../../data/data";
import type { CartItem, IProduct } from "../../../types/product";

const cargarProductos = (lista: IProduct[] = PRODUCTS) => {
    const contenedor = document.getElementById('productos-destacados');
    if (!contenedor) return;

    lista.forEach(producto => {
        const article = document.createElement('article');
        article.innerHTML = `
           <img src="/assets/${producto.imagen}" alt="${producto.nombre}">
            <h3><strong>${producto.nombre}</strong></h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
            <button type="button" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, ${producto.stock}, this)">Agregar al Carrito</button>
        `;
        contenedor.appendChild(article);
    });
};

const cargarCategorias = () => {
    const listaCategorias = document.getElementById('lista-categorias');
    if (!listaCategorias) return;

    getCategories().forEach(categorias => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${categorias.nombre}</a>`;

        li.addEventListener('click', (e) => {
            e.preventDefault();
            const productosFiltrados = PRODUCTS.filter(p => 
    p.categorias.some(c => c.nombre === categorias.nombre)
);
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
        const productosFiltrados = PRODUCTS.filter(producto =>
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

(window as any).agregarAlCarrito = (id: number, nombre: string, precio: number, stock: number, btn: HTMLButtonElement) => {
    
    // 1. Verificar stock primero
    if (stock === 0) {
        btn.style.backgroundColor = '#c0392b';
        btn.textContent = '✗ Sin stock';
        setTimeout(() => {
            btn.style.backgroundColor = '';
            btn.textContent = 'Agregar al Carrito';
        }, 1000);
        return;
    }

    // 2. Leer carrito con manejo de errores
    const carritoGuardado = localStorage.getItem('carrito');
    let carrito: CartItem[] = [];
    try {
        carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
        console.error('Error al leer el carrito:', error);
        localStorage.removeItem('carrito');
    }

    // 3. Agregar o actualizar
    const itemExistente = carrito.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // 4. Feedback visual
    btn.style.backgroundColor = '#27ae60';
    btn.textContent = '✓ Agregado';
    setTimeout(() => {
        btn.style.backgroundColor = '';
        btn.textContent = 'Agregar al Carrito';
    }, 1000);
};;

cargarCategorias();
cargarProductos();