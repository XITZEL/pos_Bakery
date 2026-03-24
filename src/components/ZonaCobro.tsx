//src/components/ZonaCobro.tsx
import { ItemVenta, MetodoPago } from "../types";

interface InterfazCobro {
  carrito: ItemVenta[];
  onAgregarUno: (id: string) => void;
  onQuitarUno: (id: string) => void;
  onFinalizar: (metodo: MetodoPago) => void;
}

export const ZonaCobro = ({ carrito, onAgregarUno, onQuitarUno, onFinalizar }: InterfazCobro) => {
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div>
      <h3>Ticket</h3>
      <ul>
            {carrito.map((item) => (
                    <li key={item.id}>
                        {item.nombre} 
                        <button onClick={() => onQuitarUno(item.id)}>-</button>
                        {item.cantidad}
                        <button onClick={() => onAgregarUno(item.id)}>+</button>
                        <span>Subtotal: ${item.precio * item.cantidad}</span>
                    </li>
                ))}
        </ul>
        <p>Total: ${total}</p>
        <button onClick={() => onFinalizar('Efectivo')}>Efectivo</button>
        <button onClick={() => onFinalizar('Tarjeta')}>Tarjeta</button>
    </div>
  );
};