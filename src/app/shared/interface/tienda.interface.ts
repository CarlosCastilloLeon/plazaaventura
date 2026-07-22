export interface Tienda{
    tiendaId?: number;
    nombre?: string;
    descripcion?: string;
    tag?: string;
    imagen?: string;
    categoria?: string;
    logo?: string;
    imagenes?: ImagenesTienda[];
    promociones?: Promociones[];
    ubicacion?: string;
    horario1?: string;
    horario2?: string;
    horario3?: string;
    telefono?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    link?: string;
}

export interface ImagenesTienda{
    src: string;
    thumbSrc: string;
    tiendaId: number;
    alt: string;

}

export interface Promociones{
    promocionId?: number;
    titulo?: string;
    descripcion?: string;
    fechaInicio?: string;
    fechaFin?: string;
    tiendaId?: number;
    src: string;
    thumbSrc: string;
}