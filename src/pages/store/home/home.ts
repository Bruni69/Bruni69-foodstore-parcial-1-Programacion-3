import { PRODUCTS, getCategories } from "../../../data/data";
import type { CartItem, IProduct } from "../../../types/product";

const cargarProductos = (lista: IProduct[] = PRODUCTS): void => {
    const contenedor = document.querySelector<HTMLElement>('#productos-destacados');
    if (!contenedor) return;

    lista.forEach(producto => {
        const article = document.createElement('article');
        article.innerHTML = `
            <img src="/assets/${producto.imagen}" alt="${producto.nombre}">
            <h3><strong>${producto.nombre}</strong></h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
          <button type="button" data-accion="agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-stock="${producto.stock}">Agregar al Carrito</button>
        `;
        contenedor.appendChild(article);
    });
};

const cargarCategorias = (): void => {
    const listaCategorias = document.querySelector<HTMLElement>('#lista-categorias');
    if (!listaCategorias) return;

    getCategories().forEach(categoria => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${categoria.nombre}</a>`;

        li.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            const productosFiltrados = PRODUCTS.filter(p =>
                p.categorias.some(c => c.nombre === categoria.nombre)
            );
            const contenedor = document.querySelector<HTMLElement>('#productos-destacados');
            if (contenedor) contenedor.innerHTML = '';
            cargarProductos(productosFiltrados);
        });

        listaCategorias.appendChild(li);
    });
};

const inputBuscar = document.querySelector<HTMLInputElement>('#Buscar');
if (inputBuscar) {
    inputBuscar.addEventListener('input', () => {
        const textoBusqueda = inputBuscar.value.toLowerCase();
        const productosFiltrados = PRODUCTS.filter(producto =>
            producto.nombre.toLowerCase().includes(textoBusqueda)
        );
        const contenedor = document.querySelector<HTMLElement>('#productos-destacados');
        if (productosFiltrados.length === 0) {
            if (contenedor) contenedor.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }
        if (contenedor) contenedor.innerHTML = '';
        cargarProductos(productosFiltrados);
    });
}

const btnTodos = document.querySelector<HTMLButtonElement>('#Todos');
if (btnTodos) {
    btnTodos.addEventListener('click', () => {
        const contenedor = document.querySelector<HTMLElement>('#productos-destacados');
        if (contenedor) contenedor.innerHTML = '';
        if (inputBuscar) inputBuscar.value = '';
        cargarProductos();
    });
}

const contenedorProductos = document.querySelector<HTMLElement>('#productos-destacados');
if (contenedorProductos) {
    contenedorProductos.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        
        if (target.dataset.accion === 'agregar') {
            const id = Number(target.dataset.id);
            const nombre = target.dataset.nombre ?? '';
            const precio = Number(target.dataset.precio);
            const stock = Number(target.dataset.stock);

            if (stock === 0) {
                target.style.backgroundColor = '#c0392b';
                target.textContent = '✗ Sin stock';
                setTimeout(() => {
                    target.style.backgroundColor = '';
                    target.textContent = 'Agregar al Carrito';
                }, 1000);
                return;
            }

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
                itemExistente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));

            target.style.backgroundColor = '#27ae60';
            target.textContent = '✓ Agregado';
            setTimeout(() => {
                target.style.backgroundColor = '';
                target.textContent = 'Agregar al Carrito';
            }, 1000);
        }
    });
}

cargarCategorias();
cargarProductos();