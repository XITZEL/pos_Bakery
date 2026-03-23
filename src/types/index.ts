// Tipos de apoyo 

export type EstadoPedido = 'Pediente'|'En Preparación'|'Listo'|'Entregado';
export type MetodoPago ='Efectivo'|'Tarjeta';
export type EstadoVenta ='Confirmada'|'Cancelada';


// Interfaces de tablas
export interface Usuario
{
    id:string;
    nombre_completo:string;
    usuario:string
    rol:string
    created_at?:string;
}

export interface Categoria 
{
    id:string;
    nombre:string;
    created_at:string;
}

export interface Producto 
{
    id:string;
    nombre:string;
    precio:number;
    stock:number;
    imagen_url?:string|null;
    categoria_id:string;
    costo_interno:number;
    stock_minimo:number;
    activo:boolean;
    proveedor_id?:string;
    fecha_ingreso_mostrador?:string;
    categorias?:{nombre:string};
}

export interface Venta
{
    id:string;
    total:number;
    usuario_id:string;
    created_at:string;
    metodo_pago:MetodoPago;
    estado: EstadoVenta;
    numero_ticket: number;
    turno_id?:string;
}

export interface DetalleVenta 
{
    id:string;
    venta_id:string;
    producto_id:string;
    cantidad:number;
    precio_unit:number;
}
// Lo que vivie en el carrito mientras cobras
export interface ItemVenta extends Producto 
{
    cantidad:number;
}
