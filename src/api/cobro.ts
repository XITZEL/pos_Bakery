import { supabase } from "../lib/supabase";
import { ItemVenta, MetodoPago } from "../types";

export const guardarVenta = async (carrito: ItemVenta[], metodo: MetodoPago, total: number, usuarioId: string) => {
  const { data: venta, error: errorVenta } = await supabase
    .from('ventas')
    .insert([{ 
      total, 
      metodo_pago: metodo, 
      usuario_id: usuarioId // id_usuario
    }])
    .select()
    .single();

  if (errorVenta) throw errorVenta;

  // Insertar los detalles de la venta
  const detalles = carrito.map(item => ({
    venta_id: venta.id,
    producto_id: item.id,
    cantidad: item.cantidad,
    precio_unit: item.precio
  }));

  const { error: errorDetalle } = await supabase.from('detalle_ventas').insert(detalles);
  if (errorDetalle) throw errorDetalle;

  return venta;
};