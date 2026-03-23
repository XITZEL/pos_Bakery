import { useState, useEffect } from 'react';
import { getProductos, actualizarProducto } from '../api/productos';

export const PanelAdmin = () => {
  const [productos, setProductos] = useState<any[]>([]);

  const cargar = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  useEffect(() => { cargar(); }, []);

  // FUNCIÓN GENÉRICA PARA ACTUALIZAR
  const actualizarInfo = async (id: string, cambios: any, mensaje: string) => {
    try {
      await actualizarProducto(id, cambios);
      alert(mensaje);
      cargar(); // Recargamos la vitrina
    } catch (error) {
      console.error(error);
      alert("Error al conectar con la base de datos");
    }
  };

  return (
    <div>
      <h2>Panel de Administración - Inventario</h2>
      <p >Usa este panel para cambiar precios o surtir pan recién horneado.</p>
      
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              
              
              <td>
                {producto.stock} pz
              </td>
              
              <td>${producto.precio}</td>
              
              <td>
                
                {/* BOTÓN PARA PRECIO */}
                <button onClick={() => {
                  const res = prompt(`Nuevo precio para ${producto.nombre}:`, producto.precio);
                  if (res) {
                    const num = parseFloat(res);
                    if (!isNaN(num)) actualizarInfo(producto.id, { precio: num }, "Precio actualizado");
                  }
                }}>
                  Precio
                </button>

                {/* BOTÓN PARA SURTIR (NUEVO) */}
                <button 
                 
                  onClick={() => {
                    const res = prompt(`¿Cuántas piezas de ${producto.nombre} llegaron?`, "20");
                    if (res) {
                      const num = parseInt(res);
                      if (!isNaN(num)) {
                        // Aquí sumamos lo que llegó al stock que ya tienes (aunque sea negativo)
                        actualizarInfo(producto.id, { stock: producto.stock + num }, "Inventario surtido");
                      }
                    }
                  }}
                >
                  Surtir
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};