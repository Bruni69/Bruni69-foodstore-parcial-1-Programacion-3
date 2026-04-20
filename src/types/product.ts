import type { ICategory } from "./category";

export interface IProduct {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categorias: ICategory[];
    eliminado: boolean;
    createdAt: string;
    stock: number;
    disponible: boolean;
};

export interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}
