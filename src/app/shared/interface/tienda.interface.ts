export interface Tienda{
    tiendaId: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    categoria: string;
    logo: string;
    imagenes: ImagenesTienda[];
    ubicacion: string;
    horario1: string;
    horario2: string;
    horario3: string;
    telefono: string;
    email: string;
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
}

export interface ImagenesTienda{
    src: string;
    tiendaId: number;
    alt: string;

}