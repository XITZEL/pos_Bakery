import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Producto, ItemVenta, MetodoPago } from './types';
import { ListaProductos } from './components/ListaProductos';
import { getSession, logout } from './api/auth'; 
import { ZonaCobro } from './components/ZonaCobro';
import { guardarVenta } from './api/cobro';
import { supabase } from './lib/supabase';
import { PanelAdmin } from './components/PanelAdmin';

function App() {
  const [usuario, setUsuario] = useState<any>(null);
  const [carrito, setCarrito] = useState<ItemVenta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [vistaActual, setVistaActual] = useState<'ventas' | 'admin'>('ventas');  // --- LÓGICA DEL CARRITO ---
  
  
  const agregarAlCarrito = (producto: Producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const handleAgregarUno = (id: string) => {
    setCarrito(prev => prev.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const handleQuitarUno = (id: string) => {
    setCarrito(prev => prev
      .map(item => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item)
      .filter(item => item.cantidad > 0)
    );
  };

  // --- LÓGICA DE FINALIZAR VENTA ---
  const handleFinalizarVenta = async (metodo: MetodoPago) => {
    try {
      if (carrito.length === 0) return alert("El carrito está vacío");

      // Calculamos el total
      const totalVenta = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
      
      // Llamamos a la API de cobro
      await guardarVenta(carrito, metodo, totalVenta, usuario.id);
      
      alert("Venta Completada");
      setCarrito([]); 
      
      // stock actualizado
      window.location.reload(); 
        
    } catch (error) {
      console.error(error);
      alert("Error al guardar la venta");
    }
  };

  // --- LÓGICA DE SESIÓN ---
  const [rol, setRol] = useState<string | null>(null); // Nuevo estado para el rol

  useEffect(() => {
  const verificarSesion = async () => {
    const sesion = await getSession();
    
    if (sesion) {
      setUsuario(sesion.user);
      
      // buscamos el ROL que se encuentra en SESION
      const { data, error } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('id', sesion.user.id)
        .single();

      if (data) {
        setRol(data.rol); // 'admin' o 'cajero'
      }
    }
    setCargando(false);
  };
  verificarSesion();
}, []);

  // --- RENDIRIZADO ---
  if (cargando) {
    return (
      <div>
        <h2>Iniciando sistema de Panadería Palacios...</h2>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div>
        <Login onLogin={(user) => setUsuario(user)} />
      </div>
    );
  }

 // 
return (
  <div>
   <header >
        <h1 >Panadería Palacios - POS</h1>
        
        <nav >
          <button 
            onClick={() => setVistaActual('ventas')}
          >
            Caja
          </button>

          {/*Boton "Inventario" para 'admin'*/}
          {rol === 'admin' && (
            <button 
              onClick={() => setVistaActual('admin')}
            >
              Inventario
            </button>
          )}

          <button onClick={async () => { await logout(); setUsuario(null); }}>
            Salir
          </button>
        </nav>
      </header>

<main >
        
        {/* Tarjetas + Ticket*/}
        {vistaActual === 'ventas' && (
          <div>
            <section >
              <ListaProductos onAgregar={agregarAlCarrito} />
            </section>
            <aside>
              <ZonaCobro 
                carrito={carrito}
                onAgregarUno={handleAgregarUno}
                onQuitarUno={handleQuitarUno}
                onFinalizar={handleFinalizarVenta}
              />
            </aside>
          </div>
        )}

        {/*Vista admin*/}
        {vistaActual === 'admin' && rol === 'admin' && (
          <section>
            <PanelAdmin />
          </section>
        )}

      </main>
  </div>
);
}

export default App;