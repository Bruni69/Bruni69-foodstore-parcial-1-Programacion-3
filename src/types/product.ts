import type { ICategory } from "./category";

export interface IProduct {
    readonly id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categorias: ICategory[];
    eliminado: boolean;
    readonly createdAt: string;
    stock: number;
    disponible: boolean;
};

export interface CartItem {
   readonly id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}
