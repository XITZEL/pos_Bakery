// src/App.tsx
import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function TarjetaPan({ nombre, precio }: { nombre: string, precio: number }) {
  return (
    <div style={{
      border: '2px solid #8b4513',
      borderRadius: '10px',
      padding: '15px',
      margin: '10px',
      width: '200px',
      backgroundColor: '#fffaf0',
      textAlign: 'center',
      display: 'inline-block'
    }}>
      <h3 style={{ margin: 0 }}>{nombre}</h3>
      <p style={{ color: '#d2691e', fontWeight: 'bold' }}>${precio} MXN</p>
      <button onClick={() => alert(`Vendido: ${nombre}`)}>Vender</button>
    </div>
  )
}
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🥐 Mostrador de Panadería Palacios</h1>
      
      {/* 2. ¡Aquí usas tus etiquetas propias! */}
      <TarjetaPan nombre="Concha de Vainilla" precio={15} />
      <TarjetaPan nombre="Bolillo Calientito" precio={5} />
      <TarjetaPan nombre="Oreja Crujiente" precio={18} />
      
    </div>
  )
}

export default App