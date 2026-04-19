import type {IProduct} from "../types/product";
export const productos: IProduct[]=[
    {
        id:1,
        nombre:"Hamburguesa Triple",
        descripcion:"Triple de carne, cheddar y bacon",
        precio: 25000,
        imagen: "./assets/hamburguesa.png",
        categoria: "Hamburguesas"
    },
    { 
         id:2,
        nombre:"Pizza muzzarela Clasica",
        descripcion:"Pizza de masas al molde con muzzarela y aceitunas",
        precio: 28000,
        imagen: "./assets/pizza.png",
        categoria: "Pizzas"

    },
    { 
         id:3,
        nombre:"Papas Fritas Especial",
        descripcion:"bastones de papas fritas con cheddar y bacon",
        precio: 15000,
        imagen: "./assets/papas_fritas.png",
        categoria: "Papas Fritas"

    },
    { 
         id:4,
        nombre:"Bebida lima limon",
        descripcion:"Gaseosa linea Pepsi",
        precio: 5000,
        imagen: "./assets/lima.png",
        categoria: "Bebidas"

    }
];

export const categorias: string[] = ["Hamburguesas", "Pizzas", "Papas Fritas", "Bebidas"];

