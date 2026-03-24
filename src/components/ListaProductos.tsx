import { useEffect, useState } from 'react';
import { getProductos } from '../api/productos';

export const ListaProductos = ({ onAgregar }: { onAgregar: (p: any) => void }) => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. ESTADO del buscador
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando la vitrina:", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
  const productosProcesados = productos
    // A) FILTRAR por lo que escribes en el buscador
    .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    // B) ORDENAR: El que tiene más stock va hasta arriba (b - a)
    .sort((a, b) => b.stock - a.stock);
    // c) Proximamente: En base al mas popular (Mas vendido)

  if (loading) return <p>Preparando los hornos... </p>;

  return (
    <div>
      <h3>Productos</h3>

      {/* 2. BUSCADOR */}
      <div>
        <input 
          type="text" 
          placeholder="Buscar pan (concha, bolillo...)" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          
        />
      </div>

      <div>
        {productosProcesados.map(p => {
          // 3. BLOQUEO de stock 
          const sinStock = p.stock <= 0;

          return (
            <div 
              key={p.id} 
              // Si no hay stock, el click no hace nada
              onClick={() => !sinStock && onAgregar(p)} 
            >

              <div>
                {p.imagen_url ? (
                  <img src={p.imagen_url} alt={p.nombre}  />
                ) : (
                  'Foto_PAN'
                )}
              </div>

              <div>
                <span>{p.categorias?.nombre || 'Sin categoria'}</span>
                <h4>{p.nombre}</h4>
                <div>
                  <span>${p.precio_actual}</span>
                </div>
                <p>
                  {sinStock ? 'No disponible' : `Disponible: ${p.stock} pz`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};