import { supabase } from '../lib/supabase';

export const getProductos = async () => {
  console.log("--- INICIANDO BÚSQUEDA DE PANES ---");

  // LOGICA para mostrar PRODUCTOS
  const { data, error } = await supabase
    .from('productos')
    .select('*, categorias (nombre)');

  if (error) {
    console.error("ERROR DE SUPABASE:", error.message);
    console.error("Código de error:", error.code);
    throw error;
  }

  if (!data || data.length === 0) {
    console.warn("SUPABASE RESPONDIÓ VACÍO []. Revisa si tienes filas en la tabla 'productos'.");
  } else {
    console.log("¡ÉXITO! Se encontraron estos productos:", data);
  }

  // Regla de los $50 pesos (simplificada para que no rompa nada por ahora) -- Lalo 
  return data?.map(p => ({
    ...p,
    precio_actual: p.precio // Precio normal
    //FALTA LOGICA sobre el descuento de precios para la CATEGORIA 'Reposteria'
  })) || [];
};

// Función para actualizar cualquier dato de un pan (precio, stock, etc.)
export const actualizarProducto = async (id: string, cambios: any) => {
  const { data, error } = await supabase
    .from('productos')
    .update(cambios)
    .eq('id', id);

  if (error) throw error;
  return data;
};